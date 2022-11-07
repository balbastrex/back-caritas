import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'education_type',  synchronize: false })
export class EducationType extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 48 })
  name: string;

}
