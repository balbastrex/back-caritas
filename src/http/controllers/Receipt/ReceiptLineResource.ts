import { ReceiptLine } from '../../../entities/ReceiptLine';

export class ReceiptLineResource {
  id: number;
  description: string;
  units: number;
  cost: number;
  totalCost: number;
  productId: number;

  constructor(receiptLine: ReceiptLine) {
    this.id = receiptLine.id;
    this.description = receiptLine.description;
    this.units = receiptLine.units;
    this.cost = receiptLine.cost;
    this.totalCost = receiptLine.totalCost;
    this.productId = receiptLine.productId;
  }
}
