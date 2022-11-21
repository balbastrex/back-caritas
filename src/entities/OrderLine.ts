import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ColumnNumericTransformer } from '../utils/decimal.transformer';
import { Order } from './Order';
import { Product } from './Product';

@Entity({ name: 'order_line',  synchronize: false })
export class OrderLine extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 64 })
  description: string;

  @Column()
  units: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, default: 0.0, transformer: new ColumnNumericTransformer() })
  cost: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, default: 0.0, transformer: new ColumnNumericTransformer() })
  price: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, default: 0.0, transformer: new ColumnNumericTransformer() })
  total: number;

  @Column({ name: 'total_cost', type: 'decimal', precision: 6, scale: 2, default: 0.0, transformer: new ColumnNumericTransformer() })
  totalCost: number;

  @Column()
  free: boolean;

  @Column({ name: 'id_order' })
  orderId: number;

  @Column({ name: 'id_product' })
  productId: number;

  @ManyToOne(() => Order, order => order.orderLines)
  @JoinColumn({ name: 'id_order' })
  order: Order;

  @ManyToOne(() => Product, product => product.orderLines)
  @JoinColumn({ name: 'id_product' })
  product: Product;

  /*@CreateDateColumn({ type: 'date' })
  created
  @UpdateDateColumn()
  updated*/
}
