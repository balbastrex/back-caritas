import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity, JoinColumn, ManyToOne, OneToMany,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Order } from './Order';
import { Receipt } from './Receipt';
import { Role } from './Role';

@Entity('usuario', {synchronize: false})
export class User extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nombre', length: 45, default: '' })
  name: string;

  @Column({ name: 'apellidos', length: 128, default: '' })
  lastName: string;

  @Column({ name: 'user', unique: true, length: 45, default: '' })
  userName: string;

  @Column({ name: 'pass', length: 70 })
  password: string;

  @Column({ name: 'activo' })
  isActive: boolean;

  @Column({ name: 'telefono', length: 32 })
  phone: string;

  @Column({ unique: true, length: 70 })
  email: string;

  @Column({ name: 'id_perfil' })
  profileId: number;

  @Column({ name: 'id_economato' })
  marketId: number;

  @Column({ name: 'id_church' })
  parishId: number;

  @OneToMany(() => Order, order => order.user,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  orders: Order[];

  @OneToMany(() => Receipt, receipt => receipt.user,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  receipts: Receipt[];

  @ManyToOne(() => Role, role => role.users)
  @JoinColumn({ name: 'id_perfil' })
  role: Role;

  @CreateDateColumn({ name: 'created' })
  created_at
  @UpdateDateColumn({ name: 'updated' })
  updated_at

  @BeforeInsert()
  async beforeInsert() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  @BeforeUpdate()
  async beforeUpdate() {
    if (this.password !== undefined && this.password !== null && this.password !== '') {
      this.password = bcrypt.hashSync(this.password, 8);
    }
  }

  static findByUserName(userName: string) {
    return this.createQueryBuilder("user")
      .where("user.userName = :userName", { userName })
      .getMany();
  }

  static findByEmail(email: string) {
    return this.createQueryBuilder("user")
      .where("user.email = :email", { email })
      .getOne();
  }
}

