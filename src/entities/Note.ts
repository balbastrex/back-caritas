import {
  BaseEntity,
  Column, CreateDateColumn,
  Entity, JoinColumn, ManyToOne, OneToMany,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { Beneficiary } from './Beneficiary';
import { Market } from './Market';
import { Service } from './Service';

@Entity({ name: 'notes',  synchronize: false })
export class Note extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 256 })
  description: string;

  @Column({ name: 'id_beneficiary'})
  beneficiaryId: number;

  @ManyToOne(() => Beneficiary, beneficiary => beneficiary.notes)
  @JoinColumn({ name: 'id_beneficiary' })
  beneficiary: Beneficiary;

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
