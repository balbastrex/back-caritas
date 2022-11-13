import { Service } from '../../../entities/Service';
import { MarketColors } from '../../../utils/constants';

export class ServiceResource {
  id: number;
  marketId: number;
  turnId: number;
  date: Date;
  start: Date;
  end: Date;
  title: string;
  description: string;
  marketName: string;
  allDay: boolean;
  color: string;

  constructor(service: Service) {
    this.id = service.id;
    this.marketId = service.marketId;
    this.turnId = service.turnId;
    this.date = service.date;
    this.start = service.date;
    // this.end = service.date;
    this.title = service.turn?.name;
    this.description = service.turn?.description;
    this.marketId = service.marketId;
    this.marketName = service.market.name;
    this.allDay = true;
    this.color = MarketColors[service.marketId];
  }
}
