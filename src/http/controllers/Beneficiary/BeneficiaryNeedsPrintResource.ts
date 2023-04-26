import { Beneficiary } from '../../../entities/Beneficiary';

export class BeneficiaryNeedsPrintResource {
  id: number;
  license: number;
  name: string;


  constructor(beneficiary: Beneficiary) {
    this.id = beneficiary.id;
    this.license = beneficiary.license;
    this.name = beneficiary.firstname + ' ' + beneficiary.lastname1 + ' ' + beneficiary.lastname2;
  }
}
