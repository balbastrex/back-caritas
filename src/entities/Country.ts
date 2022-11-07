import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'country',  synchronize: false })
export class Country extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 2 })
  iso: string;

  @Column({ length: 80 })
  name: string;

}
