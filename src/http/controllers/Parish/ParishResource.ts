import { Parish } from '../../../entities/Parish';

export class ParishResource {
  id: number;
  name: string;
  city: string;
  address: string;
  email: string;
  phone: string;
  contact: string;
  marketId: number;

  constructor(parish: Parish) {
    this.id = parish.id;
    this.name = parish.name;
    this.city = parish.city;
    this.address = parish.address;
    this.email = parish.email;
    this.phone = parish.phone;
    this.contact = parish.contact;
    this.marketId = parish.marketId
  }
}
