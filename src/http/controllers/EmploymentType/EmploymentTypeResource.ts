import { EmploymentType } from '../../../entities/EmploymentType';

export class EmploymentTypeResource {
  id: number;
  name: string;

  constructor(employmentType: EmploymentType) {
    this.id = employmentType.id;
    this.name = employmentType.name;
  }
}
