import { Order } from '../../../entities/Order';

export class OrderCloseCartReportResource {
  id: number;
  amount: number;
  parishAmount: string;
  beneficiaryAmount: string;
  gratuitous: number;
  beneficiaryLicense: number;
  beneficiaryName: string;
  budget: number;

  getParishAmount({ gratuitous, amount }: { gratuitous: number, amount: number }) {
    return ((gratuitous / 100) * amount).toFixed(2);
  }
  getBeneficiaryAmount({ gratuitous, amount }: { gratuitous: number, amount: number }) {
    return amount - parseFloat(this.getParishAmount({ gratuitous, amount }));
  }

  constructor(order: Order) {
    this.id = order.id;
    this.beneficiaryName = order.beneficiary?.firstname + ' ' + order.beneficiary?.lastname1 + ' ' + order.beneficiary?.lastname2;
    this.beneficiaryLicense = order.beneficiary?.license;
    this.budget = order.market?.budget_base + ((order.beneficiary?.adults - 1) * order.market?.budget_adult) + (order.beneficiary?.minors * order?.market?.budget_child);
    this.beneficiaryAmount = this.getBeneficiaryAmount({ gratuitous: order.gratuitous, amount: order.amount }).toFixed(2);
    this.parishAmount = this.getParishAmount({ gratuitous: order.gratuitous, amount: order.amount });
    this.amount = order.amount;
  }
}
