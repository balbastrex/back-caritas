import { CitizenType } from '../../../entities/CitizenType';

export class CitizenTypeResource {
  id: number;
  name: string;

  constructor(citizenType: CitizenType) {
    this.id = citizenType.id;
    this.name = citizenType.name;
  }
}
