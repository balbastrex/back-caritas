import { Beneficiary } from '../../../entities/Beneficiary';

export class BeneficiaryTurnResource {
  license: number;
  name: string;

  constructor(beneficiary: Beneficiary) {
    this.license = beneficiary.license;
    this.name = `${beneficiary.firstname} ${beneficiary.lastname1} ${beneficiary.lastname2}`;
  }
}
