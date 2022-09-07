import { Market } from '../../../entities/Market';

export class MarketResource {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  expenses: number;
  productPercentage: number;
  budgetBase: number;
  budgetAdult: number;
  budgetChild: number;
  distributionType: string;

  constructor(market: Market) {
    this.id = market.id;
    this.name = market.name;
    this.address = market.address;
    this.email = market.email;
    this.phone = market.phone;
    this.expenses = market.expenses;
    this.productPercentage = market.product_percentage;
    this.budgetBase = market.budget_base;
    this.budgetAdult = market.budget_adult;
    this.budgetChild = market.budget_child;
    this.distributionType = market.distribution_type;
  }
}
