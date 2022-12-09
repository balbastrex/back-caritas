import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, JoinColumn, ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatuses } from '../utils/constants';
import { ColumnNumericTransformer } from '../utils/decimal.transformer';
import { Beneficiary } from './Beneficiary';
import { Market } from './Market';
import { OrderLine } from './OrderLine';
import { Provider } from './Provider';
import { ReceiptLine } from './ReceiptLine';
import { User } from './User';

@Entity({ name: 'receipt',  synchronize: false })
export class Receipt extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 30 })
  albaran: string;

  @Column({ type: 'decimal', precision: 6, scale: 2, default: 0.0, transformer: new ColumnNumericTransformer() })
  amount: number;

  @Column({ name: 'id_user' })
  userId: number;

  @Column({ name: 'id_economato' })
  marketId: number;

  @Column({ name: 'id_provider' })
  providerId: number;

  @ManyToOne(() => Market, market => market.receipts)
  @JoinColumn({ name: 'id_economato' })
  market: Market;

  @ManyToOne(() => Provider, provider => provider.receipts)
  @JoinColumn({ name: 'id_provider' })
  provider: Provider;

  @ManyToOne(() => User, user => user.receipts)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @OneToMany(() => ReceiptLine, receiptLine => receiptLine.receipt,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  receiptLines: ReceiptLine[];

  @CreateDateColumn({ type: 'date', default: () => 'CURRENT_DATE' })
  created
  @UpdateDateColumn({ type: 'date', default: () => 'CURRENT_DATE' })
  updated
}
