import { User } from '../../../entities/User';

export class UserResource {
  id: Number;
  name: String;
  lastName: String;
  phone: String;
  email: String;
  isActive: boolean;
  profileId: number;
  marketId: number;
  parishId: number;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.lastName = user.lastName;
    this.phone = user.phone;
    this.email = user.email;
    this.profileId = user.profileId;
    this.isActive = user.isActive;
    this.marketId = user.marketId;
    this.parishId = user.parishId;
  }

}
