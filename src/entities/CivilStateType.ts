import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'civil_state_type',  synchronize: false })
export class CivilStateType extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 32 })
  name: string;

}
