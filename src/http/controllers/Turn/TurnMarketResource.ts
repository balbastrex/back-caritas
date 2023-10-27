import { Turn } from '../../../entities/Turn';

export class TurnMarketResource {
  id: number;
  name: string;
  marketId: number;
  description: string;
  marketName: string;
  beneficiariesNumber: number;

  constructor(turn: Turn) {
    this.id = turn.id;
    this.name = turn.name;
    this.marketId = turn.marketId;
    this.description = turn.description;
    this.marketName = turn.market.name;
    this.beneficiariesNumber = turn.beneficiaries.filter(beneficiary => beneficiary.expires >= new Date()).length;
  }
}
