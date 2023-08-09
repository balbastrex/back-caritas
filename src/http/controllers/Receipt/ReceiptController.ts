import { Request, Response } from 'express';
import { Brackets } from 'typeorm';
import { Order } from '../../../entities/Order';
import { Product } from '../../../entities/Product';
import { Receipt } from '../../../entities/Receipt';
import { ReceiptLine } from '../../../entities/ReceiptLine';
import { ParishOrdersReportResource } from '../Order/ParishOrdersReportResource';
import { ReceiptResource } from './ReceiptResource';

export const ReceiptIndex = async (request: Request, response: Response) => {
  const receipts = await Receipt.find({
    where: {...response.locals.findQuery},
    order: { created: 'DESC', id: 'DESC' },
    relations: ['market', 'user', 'provider', 'receiptLines'],
  });

  const receiptsResponse: ReceiptResource[] = receipts.map(order => new ReceiptResource(order));

  return response.status(200).json(receiptsResponse);
}

export const ReceiptShow = async (request: Request, response: Response) => {
  const receipt = await Receipt.findOne(request.params.id, {
    relations: ['market', 'user', 'provider', 'receiptLines'],
  });

  if (!receipt) {
    return response.status(404).json({
      message: 'Receipt not found.'
    });
  }

  return response.status(200).json(new ReceiptResource(receipt));
}

export const ReceiptStore = async (request: Request, response: Response) => {
  const amount = request.body.receiptLines.reduce((total: number, receiptLine: any) => {
    return total + receiptLine.cost * receiptLine.units;
  }, 0);

  const receipt = new Receipt();

  receipt.providerId = request.body.providerId;
  receipt.userId = response.locals.userId;
  receipt.marketId = response.locals.marketId;

  receipt.amount = amount;
  receipt.albaran = request.body.albaran;

  receipt.created = new Date();
  receipt.updated = new Date();

  await receipt.save();

  for (const line of request.body.receiptLines) {
    const receiptLine = new ReceiptLine();
    receiptLine.receiptId = receipt.id;
    receiptLine.productId = line.productId;
    receiptLine.description = line.description;
    receiptLine.units = line.units;
    receiptLine.cost = line.cost;
    receiptLine.totalCost = line.cost * line.units;

    await receiptLine.save();

    const product = await Product.findOne(line.productId);
    product.cost_price = calculateWeightedAverageCost(product, receiptLine);
    product.stock = product.stock + line.units;
    await product.save();
  }

  return response.status(201).json({ message: 'Receipt created successfully.' });
}

export const ReceiptUpdate = async (request: Request, response: Response) => {
  const amount = request.body.receiptLines.reduce((total: number, receiptLine: any) => {
    return total + receiptLine.cost * receiptLine.units;
  }, 0);

  const receipt = await Receipt.findOne(request.params.id);

  receipt.providerId = request.body.providerId;
  receipt.userId = response.locals.userId;
  receipt.marketId = response.locals.marketId;

  receipt.amount = amount;
  receipt.albaran = request.body.albaran;

  receipt.created = new Date();
  receipt.updated = new Date();

  await receipt.save();

  const oldReceiptLines = await ReceiptLine.find({ receiptId: receipt.id });
  for (const oldReceiptLine of oldReceiptLines) {
    const product = await Product.findOne(oldReceiptLine.productId);
    product.stock = product.stock - oldReceiptLine.units;
    await product.save();
  }
  await ReceiptLine.remove(oldReceiptLines);

  for (const line of request.body.receiptLines) {
    const receiptLine = new ReceiptLine();
    receiptLine.receiptId = receipt.id;
    receiptLine.productId = line.productId;
    receiptLine.description = line.description;
    receiptLine.units = line.units;
    receiptLine.cost = line.cost;
    receiptLine.totalCost = line.cost * line.units;

    await receiptLine.save();

    const product = await Product.findOne(line.productId);
    product.stock = product.stock + line.units;
    await product.save();
  }

  return response.status(201).json({ message: 'Receipt updated successfully.' });
}

export const ParishOrdersReport = async (request: Request, response: Response) => {
  const query = Order.createQueryBuilder('orders')
    .leftJoinAndSelect('orders.beneficiary', 'beneficiary')
    .leftJoinAndSelect('beneficiary.parish', 'parish')
    .leftJoinAndSelect('orders.market', 'market')
    .where({ ...response.locals.findQuery })

  const type = request.body.type;
  switch (type) {
    case 'withDiscount':
      query.andWhere('orders.gratuitous > 0');
      break;
    case 'withoutDiscount':
      query.andWhere(new Brackets(sqb => {
        sqb.where("orders.gratuitous < 1");
        sqb.orWhere("orders.gratuitous IS NULL");
      }));
      break;
  }

  const startDate =  request.body.startDate;
  if (startDate) {
    query.andWhere('orders.created >= :start', { start: startDate })
  }

  const endDate = request.body.endDate;
  if (endDate) {
    query.andWhere('orders.created <= :end', { end: endDate });
  }

  const orders: Array<any> = await query.orderBy({
    'orders.id': 'ASC'
  })
    .getMany();

  const mySet = new Set();
  const distinct = orders.filter((order) => {
    const duplicate = mySet.has(order.beneficiary.parish.id);
    mySet.add(order.beneficiary.parish.id);
    return !duplicate;
  })

  const result = distinct.map((dis) => {
    const ordersByParish = orders.filter((order) => order.beneficiary.parish.id === dis.beneficiary.parish.id);
    const summaryParishAmount = ordersByParish.reduce((parishAmount, order) => {
      return parishAmount + getParishAmount(order.gratuitous, order.amount);
    }, 0);
    const summaryBeneficiaryAmount = ordersByParish.reduce((beneficiaryAmount, order) => {
      return beneficiaryAmount + getBeneficiaryAmount(order.gratuitous, order.amount);
    }, 0);

    return {
      parishId: dis.beneficiary.parish.id,
      parishName: dis.beneficiary.parish.name,
      totalParishAmount: summaryParishAmount,
      totalBeneficiaryAmount: summaryBeneficiaryAmount,
      orders: dis.orders = ordersByParish.map(order => new ParishOrdersReportResource(order))
    }
  });

  return response.status(200).json(result);
}

export const getParishAmount = (gratuitous: number, amount: number) => {
  return ((gratuitous / 100) * amount);
}
export const getBeneficiaryAmount = (gratuitous: number, amount: number) => {
  return amount - getParishAmount(gratuitous, amount)
}

const calculateWeightedAverageCost = (product: Product, receiptLine: ReceiptLine) => {
   return (product.cost_price * product.stock + receiptLine.cost * receiptLine.units) / (product.stock + receiptLine.units);
}
