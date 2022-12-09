import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Market } from './Market';
import { Receipt } from './Receipt';
import { ReceiptLine } from './ReceiptLine';

@Entity({ synchronize: false })
export class Provider extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 60 })
  name: string;

  @Column({ name: 'id_economato'})
  marketId: number;

  @ManyToOne(() => Market, market => market.providers)
  @JoinColumn({ name: 'id_economato' })
  market: Market;

  @OneToMany(() => Receipt, receipt => receipt.provider,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  receipts: Receipt[];

  @CreateDateColumn({ type: 'date', default: () => 'NOW' })
  created

  @UpdateDateColumn({ type: 'date', default: () => 'NOW' })
  updated
}
