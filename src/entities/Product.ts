import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ColumnNumericTransformer } from '../utils/decimal.transformer';

@Entity({ name: 'product',  synchronize: false })
export class Product extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  id_economato: number;

  @Column({ length: 128 })
  name: string;

  @Column()
  q1: number;

  @Column()
  q2: number;

  @Column()
  q3: number;

  @Column()
  q4: number;

  @Column()
  q5: number;

  @Column()
  q6: number;

  @Column()
  stock: number;

  @Column()
  free: boolean;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0.0, transformer: new ColumnNumericTransformer() })
  cost_price: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0.0, transformer: new ColumnNumericTransformer() })
  sales_price: number;

  @Column({ default: true })
  available: boolean;

  @CreateDateColumn()
  created
  @UpdateDateColumn()
  updated
}
