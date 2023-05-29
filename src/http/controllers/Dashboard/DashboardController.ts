import { Request, Response } from 'express';

export const productQuery = async (request: Request, response: Response) => {



  return response.status(200).send({
    totalQuantity: 259,
    bestSeller: 'Café',
    totalCost: 55000,
    totalSales: 100000,
  });
}
