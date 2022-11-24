import { Request, Response } from 'express';
import { Beneficiary } from '../../../entities/Beneficiary';
import { Order } from '../../../entities/Order';
import { OrderLine } from '../../../entities/OrderLine';
import { Parish } from '../../../entities/Parish';
import { OrderStatuses } from '../../../utils/constants';
import { OrderResource } from './OrderResource';

export const OrderIndex = async (request: Request, response: Response) => {
  const orders = await Order.find({
    ...response.locals.findQuery,
    order: { created: 'DESC' },
    relations: ['beneficiary', 'market', 'user', 'orderLines'],
    take: 50
  });

  const ordersResponse: OrderResource[] = orders.map(order => new OrderResource(order));

  return response.status(200).json(ordersResponse);
}

export const OrderShow = async (request: Request, response: Response) => {
  const order = await Order.findOne(request.params.id, {
    relations: ['beneficiary', 'market', 'user', 'orderLines'],
  });

  if (!order) {
    return response.status(404).json({
      message: 'Order not found.'
    });
  }

  return response.status(200).json(new OrderResource(order));
}

export const OrderStore = async (request: Request, response: Response) => {
  const beneficiary = await Beneficiary.findOne(request.body.beneficiaryId);

  if (!beneficiary) {
    return response.status(404).json({ message: 'Beneficiary not found.' });
  }

  const parish = await Parish.findOne(beneficiary.parishId);

  if (!parish) {
    return response.status(404).json({ message: 'Parish not found.' });
  }

  if (parish.marketId !== response.locals.marketId) {
    return response.status(403).json({ message: 'Forbidden.' });
  }

  const amount = request.body.orderLines.reduce((total: number, orderLine: any) => {
    return total + orderLine.price * orderLine.units;
  }, 0);

  const order = new Order();

  order.beneficiaryId = request.body.beneficiaryId;
  order.userId = response.locals.userId;
  order.marketId = response.locals.marketId;
  order.parishId = parish.id;

  order.amount = amount;
  order.gratuitous = 0;
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
  })

  return response.status(201).json({ message: 'Order created successfully.' });
}

export const OrderUpdate = async (request: Request, response: Response) => {
  const beneficiary = await Beneficiary.findOne(request.body.beneficiaryId);

  if (!beneficiary) {
    return response.status(404).json({ message: 'Beneficiary not found.' });
  }

  const parish = await Parish.findOne(beneficiary.parishId);

  if (!parish) {
    return response.status(404).json({ message: 'Parish not found.' });
  }

  if (parish.marketId !== response.locals.marketId) {
    return response.status(403).json({ message: 'Forbidden.' });
  }

  const amount = request.body.orderLines.reduce((total: number, orderLine: any) => {
    return total + orderLine.price * orderLine.units;
  }, 0);

  const order = await Order.findOne(request.params.id);

  order.beneficiaryId = request.body.beneficiaryId;
  order.userId = response.locals.userId;
  order.marketId = response.locals.marketId;
  order.parishId = parish.id;

  order.amount = amount;
  order.gratuitous = 0;
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
  })

  return response.status(201).json({ message: 'Order created successfully.' });
}

export const OrderUpdateStatus = async (request: Request, response: Response) => {
  const order = await Order.findOne(request.params.orderId);

  if (!order) {
    return response.status(404).json({ message: 'Order not found.' });
  }

  const status = request.params.status;
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
