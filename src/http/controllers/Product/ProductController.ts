import { Request, Response } from 'express';
import { Product } from '../../../entities/Product';
import { ProductMarketResource } from '../Market/ProductMarketResource';

export const ProductIndex = async (request: Request, response: Response) => {
  const marketId = response.locals.marketId
  const productsQuery = Product.createQueryBuilder('product');

  if (marketId) {
    productsQuery.where('product.marketId = :marketId', { marketId });
  }

  const products = await productsQuery.orderBy({
    'product.id': 'ASC'
  })
    .getMany();

  const productsResponse: ProductMarketResource[] = products.map(product => new ProductMarketResource(product));

  return response.status(200).json(productsResponse);
}

export const ProductOrderIndex = async (request: Request, response: Response) => {
  const marketId = response.locals.marketId
  const productsQuery = Product.createQueryBuilder('product');

  if (marketId) {
    productsQuery.where('product.marketId = :marketId', { marketId });
  }

  productsQuery.where('product.available = :available', { available: true });

  const products = await productsQuery.orderBy({
    'product.id': 'ASC'
  })
    .getMany();

  const productsResponse: ProductMarketResource[] = products.map(product => new ProductMarketResource(product));

  return response.status(200).json(productsResponse);
}

export const ProductShow = async (request: Request, response: Response) => {
  const marketId = response.locals.marketId
  const productId = request.params.id
  const productQuery = await Product.createQueryBuilder('product')
    .where('product.id = :productId', { productId })

  if (marketId) {
    productQuery.andWhere('product.marketId = :marketId', { marketId });
  }

  const product = await productQuery.orderBy({
    'product.id': 'ASC'
  })
    .getOne();

  if (!product) {
    return response.status(404).json({ message: 'Product not found.' });
  }

  const productsResponse: ProductMarketResource = new ProductMarketResource(product);

  return response.status(200).json(productsResponse);
}

export const ProductUpdate = async (request: Request, response: Response) => {
  const marketId = response.locals.marketId
  const productId = request.params.id
  const productQuery = await Product.createQueryBuilder('product')
    .where('product.id = :productId', { productId })

  if (marketId) {
    productQuery.andWhere('product.marketId = :marketId', { marketId });
  }

  const product = await productQuery.orderBy({
    'product.id': 'ASC'
  })
    .getOne();

  if (!product) {
    return response.status(404).json({ message: 'Product not found.' });
  }

  await fillAndSaveProduct(product, request);

  return response.status(200).json({ id: product.id });
}

export const ProductCreate = async (request: Request, response: Response) => {
  const marketId = response.locals.marketId;

  if (!marketId) {
    return response.status(404).json({ message: 'No tienes autorización para crear un producto.' });
  }

  const product = new Product();
  product.marketId = marketId;

  await fillAndSaveProduct(product, request);

  return response.status(201).json({
    entityId: product.id,
  });
}

async function fillAndSaveProduct(product: Product, request: Request) {
  product.name = request.body.name;
  product.cost_price = request.body.costPrice;
  product.sales_price = request.body.salesPrice;
  product.free = request.body.free;
  product.available = request.body.available;
  product.stock = request.body.stock;
  product.q1 = request.body.q1;
  product.q2 = request.body.q2;
  product.q3 = request.body.q3;
  product.q4 = request.body.q4;
  product.q5 = request.body.q5;
  product.q6 = request.body.q6;
  product.created = new Date();
  await product.save();
}
