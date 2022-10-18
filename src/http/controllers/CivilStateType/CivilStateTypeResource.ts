import { CivilStateType } from '../../../entities/CivilStateType';

export class CivilStateTypeResource {
  id: number;
  name: string;

  constructor(civilStateType: CivilStateType) {
    this.id = civilStateType.id;
    this.name = civilStateType.name;
  }
}
