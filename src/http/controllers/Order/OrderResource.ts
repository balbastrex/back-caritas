import { Order } from '../../../entities/Order';
import { orderLineCompare } from '../../../utils/sorting';
import { OrderLineResource } from './OrderLineResource';

export class OrderResource {
  id: number;
  amount: number;
  parishAmount: string;
  beneficiaryAmount: string;
  getParishAmount() {
    return ((this.gratuitous / 100) * this.amount).toFixed(2);
  }
  getBeneficiaryAmount() {
    return this.amount - parseFloat(this.getParishAmount());
  }
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
  budget: number;
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
    this.userName = order.user?.name ? order.user?.name : 'no name';
    this.createdAt = new Date(order.created).getTime();
    this.orderLines = order.orderLines.sort(orderLineCompare).map(orderLine => new OrderLineResource(orderLine));
    this.budget = order.market?.budget_base + ((order.beneficiary?.adults - 1) * order.market?.budget_adult) + (order.beneficiary?.minors * order?.market?.budget_child);
    this.parishAmount = this.getParishAmount();
    this.beneficiaryAmount = this.getBeneficiaryAmount().toFixed(2);
  }
}
