import { Receipt } from '../../../entities/Receipt';
import { ReceiptLineResource } from './ReceiptLineResource';

export class ReceiptResource {
  id: number;
  providerName
  providerId: number;
  albaran: string;
  amount: number;
  userName: string;
  marketId: number;
  marketName: string;
  receiptLines: ReceiptLineResource[];
  createdAt: number;

  constructor(receipt: Receipt) {
    this.id = receipt.id;
    this.providerName = receipt.provider.name;
    this.providerId = receipt.providerId;
    this.albaran = receipt.albaran;
    this.amount = receipt.amount;
    this.marketId = receipt.marketId;
    this.marketName = receipt.market.name;
    this.userName = receipt.user.name;
    this.createdAt = new Date(receipt.created).getTime();
    this.receiptLines = receipt.receiptLines.map(receiptLine => new ReceiptLineResource(receiptLine));
  }
}
