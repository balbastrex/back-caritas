import {
  BaseEntity,
  Column,
  Entity,
  OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { DistributionTypes } from '../utils/constants';
import { ColumnNumericTransformer } from '../utils/decimal.transformer';
import { Order } from './Order';
import { Parish } from './Parish';
import { Provider } from './Provider';
import { Receipt } from './Receipt';
import { Service } from './Service';
import { Turn } from './Turn';

@Entity({ name: 'economato',  synchronize: false })
export class Market extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 64 })
  name: string;

  @Column({ length: 128 })
  address: string;

  @Column({ length: 64 })
  email: string;

  @Column({ length: 32 })
  phone: string;

  @Column()
  expenses: number;

  @Column()
  product_percentage: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new ColumnNumericTransformer() })
  budget_base: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new ColumnNumericTransformer() })
  budget_adult: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0, transformer: new ColumnNumericTransformer() })
  budget_child: number;

  @Column({ type: 'enum', enum: DistributionTypes })
  distribution_type: DistributionTypes;

  @OneToMany(() => Parish, parish => parish.market,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  parishes: Parish[];

  @OneToMany(() => Turn, turn => turn.market,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  turns: Turn[];

  @OneToMany(() => Order, order => order.market,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  orders: Order[];

  @OneToMany(() => Receipt, receipt => receipt.market,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  receipts: Receipt[];

  @OneToMany(() => Service, service => service.market,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  services: Service[];

  @OneToMany(() => Provider, provider => provider.market,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  providers: Provider[];
}
