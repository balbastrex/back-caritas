import { Country } from '../../../entities/Country';

export class CountryResource {
  id: number;
  iso: string;
  name: string;

  constructor(country: Country) {
    this.id = country.id;
    this.iso = country.iso;
    this.name = country.name;
  }
}
