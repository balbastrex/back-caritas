import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity, OneToMany,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Order } from './Order';

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
  profileId: string;

  @Column({ name: 'id_economato' })
  marketId: string;

  @Column({ name: 'id_church' })
  parishId: string;

  @OneToMany(() => Order, order => order.user,
    {
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    })
  orders: Order[];

  @CreateDateColumn({ name: 'created' })
  created_at
  @UpdateDateColumn({ name: 'updated' })
  updated_at

  @BeforeInsert()
  @BeforeUpdate()
  async beforeInsert() {
    this.password = await bcrypt.hash(this.password, process.env.BCRYPT_HASH_ROUND);
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

