import { Beneficiary } from '../../../entities/Beneficiary';

export class BeneficiaryParishResource {
  id: number;
  name: string;
  city: string;
  address: string;
  email: string;
  phone: number;

  constructor(beneficiary: Beneficiary) {
    this.id = beneficiary.id;
    this.name = `${beneficiary.firstname} ${beneficiary.lastname1} ${beneficiary.lastname2}`;
    this.city = beneficiary.city;
    this.address = beneficiary.address;
    this.email = beneficiary.email;
    this.phone = beneficiary.phone;
  }
}
