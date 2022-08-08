import { User } from '../../../entities/User';

export class UserResource {
  id: Number;
  name: String;
  email: String;
  isActive: boolean;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.isActive = user.isActive;
  }

}
