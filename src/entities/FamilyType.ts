import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'family_type',  synchronize: false })
export class FamilyType extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 32 })
  name: string;

}
