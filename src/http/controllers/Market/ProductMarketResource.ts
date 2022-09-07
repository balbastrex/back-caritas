import { Product } from '../../../entities/Product';

export class ProductMarketResource {
  id: number;
  name: string;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  q5: number;
  q6: number;
  stock: number;
  free: boolean;
  costPrice: number;
  salesPrice: number;
  available: boolean;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.q1 = product.q1;
    this.q2 = product.q2;
    this.q3 = product.q3;
    this.q4 = product.q4;
    this.q5 = product.q5;
    this.q6 = product.q6;
    this.stock = product.stock;
    this.free = product.free;
    this.costPrice = product.cost_price;
    this.salesPrice = product.sales_price;
    this.available = product.available;
  }
}
