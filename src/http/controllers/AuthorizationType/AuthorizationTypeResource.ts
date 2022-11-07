import { AuthorizationType } from '../../../entities/AuthorizationType';

export class AuthorizationTypeResource {
  id: number;
  name: string;

  constructor(authorizationType: AuthorizationType) {
    this.id = authorizationType.id;
    this.name = authorizationType.name;
  }
}
