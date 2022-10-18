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
import { Beneficiary } from './Beneficiary';
import { Market } from './Market';

@Entity({ name: 'church',  synchronize: false })
export class Parish extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ length: 32 })
  city: string;

  @Column({ length: 128, nullable: true })
  address: string;

  @Column({ length: 64, nullable: true })
  email: string;

  @Column({ length: 32, nullable: true })
  phone: string;

  @Column({ length: 128, nullable: true })
  contact: string;

  @Column()
  id_economato: number;

  @ManyToOne(() => Market, market => market.parishes)
  @JoinColumn({ name: 'id_economato' })
  market: Market;

  @OneToMany(() => Beneficiary, beneficiary => beneficiary.parish,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  beneficiaries: Beneficiary[];

  @CreateDateColumn()
  created
  @UpdateDateColumn()
  updated

}
