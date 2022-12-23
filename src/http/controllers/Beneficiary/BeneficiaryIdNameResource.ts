import { Beneficiary } from '../../../entities/Beneficiary';

export class BeneficiaryIdNameResource {
  id: number;
  name: string;
  familyUnit: number;
  budget: number;
  lastDateOrder: Date;
  expires: Date;

  constructor(beneficiary: Beneficiary, lastDateOrder) {
    this.id = beneficiary.id;
    this.name = beneficiary.firstname + ' ' + beneficiary.lastname1 + ' ' + beneficiary.lastname2;
    this.familyUnit = beneficiary.family_unit;
    this.budget = beneficiary.parish?.market?.budget_base + ((beneficiary.adults - 1) * beneficiary.parish?.market?.budget_adult) + (beneficiary.minors * beneficiary.parish?.market?.budget_child);
    this.lastDateOrder = lastDateOrder;
    this.expires = beneficiary.expires;
  }
}
