import {
  BaseEntity,
  Column, CreateDateColumn,
  Entity, JoinColumn, ManyToOne, OneToMany,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { Beneficiary } from './Beneficiary';
import { Market } from './Market';
import { Service } from './Service';
import { User } from './User';

@Entity({ name: 'perfil',  synchronize: false })
export class Role extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nombre', length: 64 })
  name: string;

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

  @OneToMany(() => User, user => user.role,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  users: User[];
}
