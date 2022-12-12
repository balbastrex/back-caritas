import { Parish } from '../../../entities/Parish';

export class ParishMarketSelectorResource {
  id: number;
  name: string;

  constructor(parish: Parish) {
    this.id = parish.id;
    this.name = parish.name;
  }
}
