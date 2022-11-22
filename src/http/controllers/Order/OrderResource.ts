import { Order } from '../../../entities/Order';
import { OrderLineResource } from './OrderLineResource';

export class OrderResource {
  id: number;
  amount: number;
  gratuitous: number;
  status: string;
  marketId: number;
  marketName: string;
  beneficiaryName: string;
  userName: string;
  orderLines: OrderLineResource[];
  createdAt: number;

  constructor(order: Order) {
    this.id = order.id;
    this.amount = order.amount;
    this.gratuitous = order.gratuitous;
    this.status = order.status;
    this.marketId = order.marketId;
    this.marketName = order.market.name;
    this.beneficiaryName = order.beneficiary?.firstname + ' ' + order.beneficiary?.lastname1 + ' ' + order.beneficiary?.lastname2;
    this.userName = order.user.name;
    this.createdAt = new Date(order.created).getTime();
    this.orderLines = order.orderLines.map(orderLine => new OrderLineResource(orderLine));
  }
}
