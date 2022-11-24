import { OrderLine } from '../../../entities/OrderLine';

export class OrderLineResource {
  id: number;
  description: string;
  units: number;
  cost: number;
  price: number;
  total: number;
  totalCost: number;
  free: boolean;
  productId: number;

  constructor(orderLine: OrderLine) {
    this.id = orderLine.id;
    this.description = orderLine.description;
    this.units = orderLine.units;
    this.cost = orderLine.cost;
    this.price = orderLine.price;
    this.total = orderLine.total;
    this.totalCost = orderLine.totalCost;
    this.free = orderLine.free;
    this.productId = orderLine.productId;
  }
}
