import { Request, Response } from 'express';
import { Order } from '../../../entities/Order';
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
