import {
  BaseEntity,
  Column, CreateDateColumn,
  Entity,
  OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { DistributionTypes } from '../utils/constants';
import { ColumnNumericTransformer } from '../utils/decimal.transformer';
import { Parish } from './Parish';

@Entity({ name: 'beneficiary',  synchronize: false })
export class Beneficiary extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  license: number;

  @Column()
  id_church: number;

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

  @Column()
  nationality: number;

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
  id_family_type: number;

  @Column()
  id_citizen_type: number;

  @Column()
  id_civil_state_type: number;

  @Column()
  id_employment_type: number;

  @Column()
  id_guardianship_type: number;

  @Column()
  id_education_type: number;

  @Column()
  id_authorization_type: number;

  @Column()
  id_turn: number;

  @Column()
  gratuitous: number;

  @Column()
  expires: Date;

  @Column()
  sice: number;

  @Column({ default: true })
  needs_print: boolean;

  @CreateDateColumn()
  created
  @UpdateDateColumn()
  updated

}
