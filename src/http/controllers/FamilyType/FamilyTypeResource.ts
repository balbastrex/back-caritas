import { FamilyType } from '../../../entities/FamilyType';

export class FamilyTypeResource {
  id: number;
  name: string;

  constructor(familyType: FamilyType) {
    this.id = familyType.id;
    this.name = familyType.name;
  }
}
