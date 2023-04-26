import { Order } from '../../../entities/Order';

export class OrderIndexResource {
  id: number;
  amount: number;
  status: string;
  beneficiaryLicense: number;
  beneficiaryName: string;
  userName: string;
  createdAt: number;

  constructor(order: Order) {
    this.id = order.id;
    this.amount = order.amount;
    this.status = order.status;
    this.beneficiaryLicense = order.beneficiary?.license;
    this.beneficiaryName = order.beneficiary?.firstname + ' ' + order.beneficiary?.lastname1 + ' ' + order.beneficiary?.lastname2;
    this.userName = order.user?.name ? order.user?.name : 'no name';
    this.createdAt = new Date(order.created).getTime();
  }
}
