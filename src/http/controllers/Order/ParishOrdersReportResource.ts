import { Order } from '../../../entities/Order';

export class ParishOrdersReportResource {
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
  beneficiaryLicense: number;
  beneficiaryName: string;
  beneficiaryFamilyUnit: number;
  budget: number;
  createdAt: number;

  constructor(order: Order) {
    this.id = order.id;
    this.amount = order.amount;
    this.gratuitous = !order.gratuitous ? 0 : order.gratuitous
    this.beneficiaryLicense = order.beneficiary?.license;
    this.beneficiaryName = order.beneficiary?.firstname + ' ' + order.beneficiary?.lastname1 + ' ' + order.beneficiary?.lastname2;
    this.beneficiaryFamilyUnit = order.beneficiary?.family_unit;
    this.createdAt = new Date(order.created).getTime();
    this.budget = order.market?.budget_base + ((order.beneficiary?.adults - 1) * order.market?.budget_adult) + (order.beneficiary?.minors * order?.market?.budget_child);
    this.parishAmount = this.getParishAmount();
    this.beneficiaryAmount = this.getBeneficiaryAmount().toFixed(2);
  }
}
