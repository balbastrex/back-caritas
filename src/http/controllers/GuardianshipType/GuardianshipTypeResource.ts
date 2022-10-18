import { GuardianshipType } from '../../../entities/GuardianshipType';

export class GuardianshipTypeResource {
  id: number;
  name: string;

  constructor(guardianshipType: GuardianshipType) {
    this.id = guardianshipType.id;
    this.name = guardianshipType.name;
  }
}
