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
import { Market } from './Market';
import { Turn } from './Turn';

@Entity({ name: 'service',  synchronize: false })
export class Service extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'id_turn' })
  turnId: number;

  @Column({ name: 'id_economato'})
  marketId: number;

  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => Market, market => market.services)
  @JoinColumn({ name: 'id_economato' })
  market: Market;

  @ManyToOne(() => Turn, turn => turn.services)
  @JoinColumn({ name: 'id_turn' })
  turn: Turn;

  @CreateDateColumn()
  created
  @UpdateDateColumn()
  updated
}
