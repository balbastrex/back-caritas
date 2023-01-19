import { Beneficiary } from '../../../entities/Beneficiary';

export class BeneficiaryIdNameResource {
  id: number;
  license: number;
  name: string;
  familyUnit: number;
  budget: number;
  lastDateOrder: Date;
  expires: Date;
  notes: Array<string>;

  constructor(beneficiary: Beneficiary, lastDateOrder) {
    this.id = beneficiary.id;
    this.license = beneficiary.license;
    this.name = beneficiary.firstname + ' ' + beneficiary.lastname1 + ' ' + beneficiary.lastname2;
    this.familyUnit = beneficiary.family_unit;
    this.budget = beneficiary.parish?.market?.budget_base + ((beneficiary.adults - 1) * beneficiary.parish?.market?.budget_adult) + (beneficiary.minors * beneficiary.parish?.market?.budget_child);
    this.lastDateOrder = lastDateOrder;
    this.expires = beneficiary.expires;
    this.notes = beneficiary.notes.map(note => note.description);
  }
}
