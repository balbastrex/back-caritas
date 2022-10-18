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
  nationality: number;
  birthDate: Date;
  parishId: number;
  childrenUnder18: number;
  childrenOver18: number;
  homeless: boolean;
  gender: string;
  expires: Date;
  gratuitous: number;
  sice: number;
  needsPrint: boolean;

  familyType: number;
  citizenType: number;
  civilStateType: number;
  employmentType: number;
  guardianshipType: number;
  educationType: number;
  authorizationType: number;

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
    this.nationality = beneficiary.nationality;
    this.birthDate = beneficiary.birth_date
    this.childrenUnder18 = isNull(beneficiary.children_under_18) ? 0 : beneficiary.children_under_18;
    this.childrenOver18 = isNull(beneficiary.children_over_18) ? 0 : beneficiary.children_over_18;
    this.homeless = beneficiary.homeless;
    this.gender = beneficiary.gender;
    this.expires = beneficiary.expires;
    this.gratuitous = beneficiary.gratuitous;
    this.sice = beneficiary.sice;
    this.needsPrint = beneficiary.needs_print;

    this.familyType = isNull(beneficiary.id_family_type) ? 0 : beneficiary.id_family_type;
    this.citizenType = isNull(beneficiary.id_citizen_type) ? 0 : beneficiary.id_citizen_type;
    this.civilStateType = isNull(beneficiary.id_civil_state_type) ? 0 : beneficiary.id_civil_state_type;
    this.employmentType = isNull(beneficiary.id_employment_type) ? 0 : beneficiary.id_employment_type;
    this.guardianshipType = isNull(beneficiary.id_guardianship_type) ? 0 : beneficiary.id_guardianship_type;
    this.educationType = isNull(beneficiary.id_education_type) ? 0 : beneficiary.id_education_type;
    this.authorizationType = isNull(beneficiary.id_authorization_type) ? 0 : beneficiary.id_authorization_type;
  }
}
