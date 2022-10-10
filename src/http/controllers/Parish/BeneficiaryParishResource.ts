import { Beneficiary } from '../../../entities/Beneficiary';

export class BeneficiaryParishResource {
  id: number;
  name: string;
  city: string;
  address: string;
  email: string;
  phone: number;
  license: number;
  cif: string;
  adults: number;
  minors: number;
  family_unit: number;
  state: string;
  zip: string;
  free: boolean;
  nationality: number;
  birth_date: number;

  constructor(beneficiary: Beneficiary) {
    this.id = beneficiary.id;
    this.license = beneficiary.license;
    this.name = `${beneficiary.firstname} ${beneficiary.lastname1} ${beneficiary.lastname2}`;
    this.cif = beneficiary.cif;
    this.adults = beneficiary.adults;
    this.minors = beneficiary.minors;
    this.family_unit = beneficiary.family_unit;
    this.phone = beneficiary.phone;
    this.email = beneficiary.email;
    this.address = beneficiary.address;
    this.city = beneficiary.city;
    this.state = beneficiary.state;
    this.zip = beneficiary.zip;
    this.free = beneficiary.free;
  }
}
