import { Request, Response } from 'express';
import { Beneficiary } from '../../../entities/Beneficiary';
import { Order } from '../../../entities/Order';
import { OrderLine } from '../../../entities/OrderLine';
import { Product } from '../../../entities/Product';
import { OrderStatuses } from '../../../utils/constants';
import { OrderResource } from './OrderResource';

export const OrderIndex = async (request: Request, response: Response) => {
  const orders = await Order.find({
    where: {...response.locals.findQuery},
    order: { created: 'DESC', id: 'DESC' },
    relations: ['beneficiary', 'beneficiary.parish', 'market', 'user', 'orderLines'],

  });

  const ordersResponse: OrderResource[] = orders.map(order => new OrderResource(order));

  return response.status(200).json(ordersResponse);
}

export const OrderHistoryIndex = async (request: Request, response: Response) => {
  const orders = await Order.find({
    where: {...response.locals.findQuery},
    order: { created: 'DESC', id: 'DESC' },
    relations: ['beneficiary', 'beneficiary.parish', 'market', 'user', 'orderLines'],
    //  TODO: Add pagination
    take: 1000,
  });

  const ordersResponse: OrderResource[] = orders.map(order => new OrderResource(order));

  return response.status(200).json(ordersResponse);
}

export const BeneficiaryOrderHistoryIndex = async (request: Request, response: Response) => {
  const beneficiaryId = request.params.beneficiaryId;

  const orders = await Order.find({
    where: {
      ...response.locals.findQuery,
      beneficiaryId
    },
    order: { created: 'DESC', id: 'DESC' },
    relations: ['beneficiary', 'beneficiary.parish', 'market', 'user', 'orderLines'],
  });

  const ordersResponse: OrderResource[] = orders.map(order => new OrderResource(order));

  return response.status(200).json(ordersResponse);
}

export const OrderShow = async (request: Request, response: Response) => {
  const order = await Order.findOne(request.params.id, {
    relations: ['beneficiary', 'beneficiary.parish', 'market', 'user', 'orderLines'],
  });

  if (!order) {
    return response.status(404).json({
      message: 'Order not found.'
    });
  }

  return response.status(200).json(new OrderResource(order));
}

export const OrderStore = async (request: Request, response: Response) => {
  const amount = request.body.orderLines.reduce((total: number, orderLine: any) => {
    return total + orderLine.price * orderLine.units;
  }, 0);

  const beneficiary = await Beneficiary.findOne(request.body.beneficiaryId);

  const order = new Order();

  order.beneficiaryId = request.body.beneficiaryId;
  order.userId = response.locals.userId;
  order.marketId = response.locals.marketId;
  order.parishId = response.locals.parishId;

  order.amount = amount;
  order.gratuitous = beneficiary.gratuitous;
  order.status = OrderStatuses.ABIERTO;

  order.created = new Date();
  order.updated = new Date();

  await order.save();

  request.body.orderLines.forEach((line: any) => {
    const orderLine = new OrderLine();
    orderLine.orderId = order.id;
    orderLine.productId = line.productId;
    orderLine.description = line.description;
    orderLine.units = line.units;
    orderLine.price = line.price;
    orderLine.cost = line.cost;
    orderLine.totalCost = line.cost * line.units;
    orderLine.total = line.price * line.units;
    orderLine.free = line.free;

    orderLine.save();
  });

  for (const line of request.body.orderLines) {
    const product = await Product.findOne(line.productId);

    if (!product) {
      continue;
    }

    product.stock = product.stock - line.units;
    await product.save();
  }

  return response.status(201).json({ message: 'Order created successfully.' });
}

export const OrderUpdate = async (request: Request, response: Response) => {
  const amount = request.body.orderLines.reduce((total: number, orderLine: any) => {
    return total + orderLine.price * orderLine.units;
  }, 0);

  const beneficiary = await Beneficiary.findOne(request.body.beneficiaryId);

  const order = await Order.findOne(request.params.id);

  order.beneficiaryId = request.body.beneficiaryId;
  order.userId = response.locals.userId;
  order.marketId = response.locals.marketId;
  order.parishId = response.locals.parishId;

  order.amount = amount;
  order.gratuitous = beneficiary.gratuitous;
  order.status = OrderStatuses.ABIERTO;

  order.created = new Date();
  order.updated = new Date();

  await order.save();

  const oldOrderLines = await OrderLine.find({ orderId: order.id });
  await OrderLine.remove(oldOrderLines);

  request.body.orderLines.forEach((line: any) => {
    const orderLine = new OrderLine();
    orderLine.orderId = order.id;
    orderLine.productId = line.productId;
    orderLine.description = line.description;
    orderLine.units = line.units;
    orderLine.price = line.price;
    orderLine.cost = line.cost;
    orderLine.totalCost = line.cost * line.units;
    orderLine.total = line.price * line.units;
    orderLine.free = line.free;

    orderLine.save();
  });

  for (const line of request.body.orderLines) {
    const product = await Product.findOne(line.productId);

    if (!product) {
      continue;
    }

    product.stock = product.stock - line.units;
    await product.save();
  }

  return response.status(201).json({ message: 'Order created successfully.' });
}

export const OrderUpdateStatus = async (request: Request, response: Response) => {
  const status = request.params.status;
  const order = response.locals.order;

  switch (status) {
    case OrderStatuses.ABIERTO: order.status = OrderStatuses.ABIERTO; break;
    case OrderStatuses.CANCELADO: order.status = OrderStatuses.CANCELADO; break;
    case OrderStatuses.PAGADO: order.status = OrderStatuses.PAGADO; break;
    case OrderStatuses.CERRADO: order.status = OrderStatuses.CERRADO; break;
    default: order.status = OrderStatuses.ABIERTO;
  }
  order.updated = new Date();

  await order.save();

  return response.status(200).json({ message: 'Order status updated successfully.' });
}
