import { isNull } from 'util';
import { Beneficiary } from '../../../entities/Beneficiary';

export class BeneficiaryResource {
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
  nationalityId: number;
  birthDate: Date;
  childrenUnder18: number;
  childrenOver18: number;
  homeless: boolean;
  gender: string;
  expires: Date;
  gratuitous: number;
  sice: number;
  needsPrint: boolean;
  familyTypeId: number;

  citizenTypeId: number;
  civilStateTypeId: number;
  employmentTypeId: number;
  guardianshipTypeId: number;
  educationTypeId: number;
  authorizationTypeId: number;
  parishId: number;
  turnId: number;
  budget: number;
  parishName: string;

  constructor(beneficiary: Beneficiary) {
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
    this.nationalityId = beneficiary.nationalityId;
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

    this.familyTypeId = beneficiary.familyTypeId;
    this.citizenTypeId = beneficiary.citizenTypeId;
    this.civilStateTypeId = beneficiary.civilStateTypeId;
    this.employmentTypeId = beneficiary.employmentTypeId;
    this.guardianshipTypeId = beneficiary.guardianshipTypeId;
    this.educationTypeId = beneficiary.educationTypeId;
    this.authorizationTypeId = beneficiary.authorizationTypeId;
    this.parishId = beneficiary.parishId;
    this.parishName = beneficiary.parish?.name;
    this.turnId = isNull(beneficiary.turnId) ? 0 : beneficiary.turnId;
  }
}
