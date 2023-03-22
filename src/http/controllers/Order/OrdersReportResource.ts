import { Order } from '../../../entities/Order';

export class OrdersReportResource {
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
  beneficiaryName: string;
  createdAt: number;

  constructor(order: Order) {
    this.id = order.id;
    this.amount = order.amount;
    this.gratuitous = order.gratuitous;
    this.beneficiaryName = order.beneficiary?.firstname + ' ' + order.beneficiary?.lastname1 + ' ' + order.beneficiary?.lastname2;
    this.createdAt = new Date(order.created).getTime();
    this.parishAmount = this.getParishAmount();
    this.beneficiaryAmount = this.getBeneficiaryAmount().toFixed(2);
  }
}
