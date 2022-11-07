import {
  BaseEntity,
  Column, CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  created
  @UpdateDateColumn()
  updated
}
