import {
  BaseEntity,
  Column, CreateDateColumn,
  Entity, JoinColumn, ManyToOne, OneToMany,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { Beneficiary } from './Beneficiary';
import { Market } from './Market';
import { Service } from './Service';

@Entity({ name: 'turn',  synchronize: false })
export class Turn extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 16 })
  name: string;

  @Column({ name: 'id_economato'})
  marketId: number;

  @Column({ length: 256 })
  description: string;

  @ManyToOne(() => Market, market => market.turns)
  @JoinColumn({ name: 'id_economato' })
  market: Market;

  @OneToMany(() => Beneficiary, beneficiary => beneficiary.turn,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  beneficiaries: Beneficiary[];

  @OneToMany(() => Service, service => service.turn,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  services: Service[];

  @CreateDateColumn()
  created
  @UpdateDateColumn()
  updated
}
