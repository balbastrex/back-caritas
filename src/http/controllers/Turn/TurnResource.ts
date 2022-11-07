import { Turn } from '../../../entities/Turn';

export class TurnResource {
  id: number;
  name: string;
  marketId: number;
  description: string;

  constructor(turn: Turn) {
    this.id = turn.id;
    this.name = turn.name;
    this.marketId = turn.marketId;
    this.description = turn.description;
  }
}
