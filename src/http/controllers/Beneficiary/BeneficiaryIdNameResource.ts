import { Beneficiary } from '../../../entities/Beneficiary';

export class BeneficiaryIdNameResource {
  id: number;
  name: string;

  constructor(beneficiary: Beneficiary) {
    this.id = beneficiary.id;
    this.name = beneficiary.firstname + ' ' + beneficiary.lastname1 + ' ' + beneficiary.lastname2;
  }
}
