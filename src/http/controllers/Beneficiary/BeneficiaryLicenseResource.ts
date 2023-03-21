import { Beneficiary } from '../../../entities/Beneficiary';

export class BeneficiaryLicenseResource {
  id: number;
  marketName: string;
  license: number;
  name: string;

  NIF: string;
  expires: Date;
  familyUnit: number;
  parishName: string;
  budget: number;

  constructor(beneficiary: Beneficiary) {
    this.id = beneficiary.id;
    this.marketName = beneficiary.parish?.market?.name;
    this.license = beneficiary.license;
    this.name = beneficiary.firstname + ' ' + beneficiary.lastname1 + ' ' + beneficiary.lastname2;
    this.NIF = beneficiary.cif;
    this.expires = beneficiary.expires;
    this.familyUnit = beneficiary.family_unit;
    this.parishName = beneficiary.parish?.name;
    this.budget = beneficiary.parish?.market?.budget_base + ((beneficiary.adults - 1) * beneficiary.parish?.market?.budget_adult) + (beneficiary.minors * beneficiary.parish?.market?.budget_child);
  }
}
