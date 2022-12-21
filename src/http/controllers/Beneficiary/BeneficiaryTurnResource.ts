import { Beneficiary } from '../../../entities/Beneficiary';

export class BeneficiaryTurnResource {
  license: number;
  name: string;
  parishName: string;
  lastDateOrder: Date;

  constructor(beneficiary: Beneficiary, lastDateOrder) {
    this.license = beneficiary.license;
    this.name = `${beneficiary.firstname} ${beneficiary.lastname1} ${beneficiary.lastname2}`;
    this.parishName = beneficiary.parish.name;
    this.lastDateOrder = lastDateOrder;
  }
}
