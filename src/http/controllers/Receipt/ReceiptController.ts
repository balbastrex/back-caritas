import { Request, Response } from 'express';
import { Product } from '../../../entities/Product';
import { Receipt } from '../../../entities/Receipt';
import { ReceiptLine } from '../../../entities/ReceiptLine';
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

const calculateWeightedAverageCost = (product: Product, receiptLine: ReceiptLine) => {
   return (product.cost_price * product.stock + receiptLine.cost * receiptLine.units) / (product.stock + receiptLine.units);
}
