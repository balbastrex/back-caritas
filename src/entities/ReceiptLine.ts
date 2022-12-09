import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ColumnNumericTransformer } from '../utils/decimal.transformer';
import { Product } from './Product';
import { Receipt } from './Receipt';

@Entity({ name: 'receipt_line',  synchronize: false })
export class ReceiptLine extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 64 })
  description: string;

  @Column()
  units: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, default: 0.0, transformer: new ColumnNumericTransformer() })
  cost: number;

  @Column({ name: 'total_cost', type: 'decimal', precision: 6, scale: 2, default: 0.0, transformer: new ColumnNumericTransformer() })
  totalCost: number;

  @Column({ name: 'id_receipt' })
  receiptId: number;

  @Column({ name: 'id_product' })
  productId: number;

  @ManyToOne(() => Receipt, receipt => receipt.receiptLines)
  @JoinColumn({ name: 'id_receipt' })
  receipt: Receipt;

  @ManyToOne(() => Product, product => product.receiptLines)
  @JoinColumn({ name: 'id_product' })
  product: Product;
}
