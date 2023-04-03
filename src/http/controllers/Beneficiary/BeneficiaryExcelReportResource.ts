import { isNull } from 'util';
import { Beneficiary } from '../../../entities/Beneficiary';

export class BeneficiaryExcelReportResource {
  id: number;
  name: string;
  lastname1: string;
  lastname2: string;
  city: string;
  address: string;
  email: string;
  phone: number;
  license: number;
  cif: string;
  adults: number;
  minors: number;
  familyUnit: number;
  state: string;
  zip: string;
  free: boolean;
  nationality: string;
  birthDate: Date;
  childrenUnder18: number;
  childrenOver18: number;
  homeless: boolean;
  gender: string;
  expires: Date;
  gratuitous: number;
  sice: number;
  needsPrint: boolean;
  familyType: string;

  citizenType: string;
  civilStateType: string;
  employmentType: string;
  guardianshipType: string;
  educationType: string;
  authorizationType: string;
  turn: number;
  budget: number;
  parishName: string;
  marketName: string;

  constructor(beneficiary: Beneficiary, extraData: any) {
    this.id = beneficiary.id;
    this.license = beneficiary.license;
    this.name = beneficiary.firstname
    this.lastname1 = beneficiary.lastname1
    this.lastname2 = beneficiary.lastname2
    this.cif = beneficiary.cif;
    this.adults = isNull(beneficiary.adults) ? 0 : beneficiary.adults;
    this.minors = isNull(beneficiary.minors) ? 0 : beneficiary.minors;
    this.familyUnit = beneficiary.family_unit;
    this.phone = beneficiary.phone;
    this.email = beneficiary.email;
    this.address = beneficiary.address;
    this.city = beneficiary.city;
    this.state = beneficiary.state;
    this.zip = beneficiary.zip;
    this.free = beneficiary.free;
    this.nationality = extraData.nationality
    this.birthDate = beneficiary.birth_date
    this.childrenUnder18 = isNull(beneficiary.children_under_18) ? 0 : beneficiary.children_under_18;
    this.childrenOver18 = isNull(beneficiary.children_over_18) ? 0 : beneficiary.children_over_18;
    this.homeless = beneficiary.homeless;
    this.gender = beneficiary.gender;
    this.expires = beneficiary.expires;
    this.gratuitous = beneficiary.gratuitous;
    this.sice = beneficiary.sice;
    this.needsPrint = beneficiary.needs_print;

    this.budget = beneficiary.parish?.market?.budget_base + ((beneficiary.adults - 1) * beneficiary.parish?.market?.budget_adult) + (beneficiary.minors * beneficiary.parish?.market?.budget_child);

    this.familyType = extraData.family;
    this.citizenType = extraData.citizen;
    this.civilStateType = extraData.civilState;
    this.employmentType = extraData.employment;
    this.guardianshipType = extraData.guardianShip;
    this.educationType = extraData.education;
    this.authorizationType = extraData.authorization;
    this.parishName = beneficiary.parish?.name;
    this.marketName = beneficiary.parish?.market?.name;
    this.turn = extraData.turn;
  }
}
