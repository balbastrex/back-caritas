import { Service } from '../../../entities/Service';
import { MarketColors } from '../../../utils/constants';

export class ServiceResource {
  id: number;
  marketId: number;
  turnId: number;
  date: Date;
  start: Date;
  title: string;
  description: string;
  marketName: string;
  color: string;

  constructor(service: Service) {
    this.id = service.id;
    this.marketId = service.marketId;
    this.turnId = service.turnId;
    this.start = service.date;
    this.title = service.turn?.name;
    this.description = service.turn?.description;
    this.marketName = service.market.name;
    this.color = MarketColors[service.marketId];
  }
}
