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
import { User } from './User';

@Entity({ name: 'order',  synchronize: false })
export class Order extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, default: 0.0, transformer: new ColumnNumericTransformer() })
  amount: number;

  @Column()
  gratuitous: number;

  @Column({ type: 'enum', enum: OrderStatuses, default:OrderStatuses.ABIERTO })
  status: OrderStatuses;

  @Column({ name: 'id_beneficiary' })
  beneficiaryId: number;

  @Column({ name: 'id_user' })
  userId: number;

  @Column({ name: 'id_economato' })
  marketId: number;

  @Column({ name: 'id_church' })
  parishId: number;

  @ManyToOne(() => Market, market => market.orders)
  @JoinColumn({ name: 'id_economato' })
  market: Market;

  @ManyToOne(() => Beneficiary, beneficiary => beneficiary.orders)
  @JoinColumn({ name: 'id_beneficiary' })
  beneficiary: Beneficiary;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @OneToMany(() => OrderLine, orderLine => orderLine.order,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  orderLines: OrderLine[];

  @CreateDateColumn({ type: 'date' })
  created
  @UpdateDateColumn()
  updated
}
