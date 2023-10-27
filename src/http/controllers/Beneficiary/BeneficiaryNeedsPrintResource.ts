import { Beneficiary } from '../../../entities/Beneficiary';

export class BeneficiaryNeedsPrintResource {
  id: number;
  license: number;
  name: string;
  expires: Date;
  budget: number;
  parishName: string;
  marketName: string;

  constructor(beneficiary: Beneficiary) {
    this.id = beneficiary.id;
    this.license = beneficiary.license;
    this.name = beneficiary.firstname + ' ' + beneficiary.lastname1 + ' ' + beneficiary.lastname2;
    this.expires = beneficiary.expires;
    this.budget = beneficiary.parish?.market?.budget_base + ((beneficiary.adults - 1) * beneficiary.parish?.market?.budget_adult) + (beneficiary.minors * beneficiary.parish?.market?.budget_child);
    this.parishName = beneficiary.parish?.name;
    this.marketName = beneficiary.parish?.market?.name;
  }
}
