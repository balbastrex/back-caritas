import { Request, Response } from 'express';
import { Market } from '../../../entities/Market';
import { Parish } from '../../../entities/Parish';
import { Product } from '../../../entities/Product';
import { MarketResource } from './MarketResource';
import { ParishMarketResource } from './ParishMarketResource';
import { ProductMarketResource } from './ProductMarketResource';

export const MarketIndex = async (request: Request, response: Response) => {
  const markets: Market[] = await Market.find();
  const marketResources = markets.map(market => new MarketResource(market));

  return response.status(200).json(marketResources);
};

export const MarketShow = async (request: Request, response: Response) => {

  const marketId = request.params.id;
  const market: Market = await Market.findOne(marketId);

  if (!market) {
    return response.status(404).json({ message: 'Market not found.' });
  }

  const marketResource = new MarketResource(market);

  return response.status(200).json(marketResource);
}

export const ParishesMarketIndex = async (request: Request, response: Response) => {

  const marketId = request.params.id;
  const market: Market = await Market.findOne(marketId);

  if (!market) {
    return response.status(404).json({ message: 'Market not found.' });
  }

  const parishes = await Parish.createQueryBuilder('church')
    .where('church.id_economato = :marketId', { marketId })
    .orderBy({
      'church.id': 'ASC'
    })
    .getMany();

  const parishesResponse: ParishMarketResource[] = parishes.map(parish => new ParishMarketResource(parish));

  return response.status(200).json(parishesResponse);
}

export const ProductsMarketIndex = async (request: Request, response: Response) => {

  const marketId = request.params.id;
  const market: Market = await Market.findOne(marketId);

  if (!market) {
    return response.status(404).json({ message: 'Market not found.' });
  }

  const products = await Product.createQueryBuilder('product')
    .where('product.id_economato = :marketId', { marketId })
    .orderBy({
      'product.id': 'ASC'
    })
    .getMany();

  const productsResponse: ProductMarketResource[] = products.map(product => new ProductMarketResource(product));

  return response.status(200).json(productsResponse);
}

export const MarketUpdate = async (request: Request, response: Response) => {

  const marketId = request.params.id;
  const market: Market = await Market.findOne(marketId);

  if (!market) {
    return response.status(404).json({ message: 'Market not found.' });
  }

  market.name = request.body.name;
  market.address = request.body.address;
  market.email = request.body.email;
  market.phone = request.body.phone;
  market.expenses = request.body.expenses;
  market.product_percentage = request.body.productPercentage;
  market.budget_base = request.body.budgetBase;
  market.budget_adult = request.body.budgetAdult;
  market.budget_child = request.body.budgetChild;
  market.distribution_type = request.body.distributionType;
  await market.save();

  const markets: Market[] = await Market.find();
  const marketResources = markets.map(market => new MarketResource(market));

  return response.status(200).json(marketResources);
}
