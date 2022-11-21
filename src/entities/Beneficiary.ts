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
import { Order } from './Order';
import { OrderLine } from './OrderLine';
import { Parish } from './Parish';
import { Turn } from './Turn';

@Entity({ name: 'beneficiary',  synchronize: true })
export class Beneficiary extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  license: number;

  @Column({ length: 16 })
  cif: string;

  @Column({ length: 32 })
  firstname: string;

  @Column({ length: 32 })
  lastname1: string;

  @Column({ length: 32 })
  lastname2: string;

  @Column()
  adults: number;

  @Column()
  minors: number;

  @Column()
  family_unit: number;

  @Column()
  phone: number;

  @Column({ length: 64 })
  email: string;

  @Column({ length: 64 })
  address: string;

  @Column({ length: 64 })
  city: string;

  @Column({ length: 64 })
  state: string;

  @Column({ length: 6 })
  zip: string;

  @Column()
  free: boolean;

  @Column({ name: 'nationality' })
  nationalityId: number;

  @Column()
  birth_date: Date;

  @Column()
  children_under_18: number;

  @Column()
  children_over_18: number;

  @Column()
  homeless: boolean;

  @Column({ length: 6 })
  gender: string;

  @Column()
  gratuitous: number;

  @Column()
  expires: Date;

  @Column()
  sice: number;

  @Column({ default: true })
  needs_print: boolean;

  @Column({ name: 'id_family_type' })
  familyTypeId: number;

  @Column({ name: 'id_citizen_type' })
  citizenTypeId: number;

  @Column({ name: 'id_civil_state_type' })
  civilStateTypeId: number;

  @Column({ name: 'id_employment_type' })
  employmentTypeId: number;

  @Column({ name: 'id_guardianship_type' })
  guardianshipTypeId: number;

  @Column({ name: 'id_education_type' })
  educationTypeId: number;

  @Column({ name: 'id_authorization_type' })
  authorizationTypeId: number;

  @Column({ name: 'id_turn' })
  turnId: number;

  @Column({ name: 'id_church' })
  parishId: number;

  @ManyToOne(() => Parish, parish => parish.beneficiaries)
  @JoinColumn({ name: 'id_church' })
  parish: Parish;

  @ManyToOne(() => Turn, turn => turn.beneficiaries)
  @JoinColumn({ name: 'id_turn' })
  turn: Turn;

  @OneToMany(() => Order, order => order.beneficiary,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  orders: Order[];

  @CreateDateColumn()
  created
  @UpdateDateColumn()
  updated

}
