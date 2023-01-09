import { Order } from '../../../entities/Order';
import { orderLineCompare } from '../../../utils/sorting';
import { OrderLineResource } from './OrderLineResource';

export class OrderResource {
  id: number;
  amount: number;
  gratuitous: number;
  status: string;
  marketId: number;
  marketName: string;
  beneficiaryId: number;
  beneficiaryLicense: number;
  beneficiaryName: string;
  parishName: string;
  beneficiaryFamilyUnit: number;
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
    this.beneficiaryId = order.beneficiaryId
    this.beneficiaryLicense = order.beneficiary?.license;
    this.beneficiaryName = order.beneficiary?.firstname + ' ' + order.beneficiary?.lastname1 + ' ' + order.beneficiary?.lastname2;
    this.parishName = order.beneficiary?.parish.name;
    this.beneficiaryFamilyUnit = order.beneficiary?.family_unit;
    this.userName = order.user.name;
    this.createdAt = new Date(order.created).getTime();
    this.orderLines = order.orderLines.sort(orderLineCompare).map(orderLine => new OrderLineResource(orderLine));
  }
}
