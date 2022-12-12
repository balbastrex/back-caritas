import { Role } from '../../../entities/Role';

export class RoleResource {
  id: Number;
  name: String;
  constructor(role: Role) {
    this.id = role.id;
    this.name = role.name;
  }

}
