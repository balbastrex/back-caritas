import { EducationType } from '../../../entities/EducationType';

export class EducationTypeResource {
  id: number;
  name: string;

  constructor(educationType: EducationType) {
    this.id = educationType.id;
    this.name = educationType.name;
  }
}
