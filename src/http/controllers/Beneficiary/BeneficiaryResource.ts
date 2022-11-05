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
    this.parishId = beneficiary.parishId;
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

    this.familyTypeId = isNull(beneficiary.familyTypeId) ? 0 : beneficiary.familyTypeId;
    this.citizenTypeId = isNull(beneficiary.citizenTypeId) ? 0 : beneficiary.citizenTypeId;
    this.civilStateTypeId = isNull(beneficiary.civilStateTypeId) ? 0 : beneficiary.civilStateTypeId;
    this.employmentTypeId = isNull(beneficiary.employmentTypeId) ? 0 : beneficiary.employmentTypeId;
    this.guardianshipTypeId = isNull(beneficiary.guardianshipTypeId) ? 0 : beneficiary.guardianshipTypeId;
    this.educationTypeId = isNull(beneficiary.educationTypeId) ? 0 : beneficiary.educationTypeId;
    this.authorizationTypeId = isNull(beneficiary.authorizationTypeId) ? 0 : beneficiary.authorizationTypeId;
    this.turnId = isNull(beneficiary.turnId) ? 0 : beneficiary.turnId;
  }
}
