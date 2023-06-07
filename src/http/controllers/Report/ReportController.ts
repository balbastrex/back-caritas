import { Request, Response } from 'express';
import {Order} from "../../../entities/Order";

export const memoryPeriod = async (request: Request, response: Response) => {
  const startDate = request.body.startDate;
  const endDate = request.body.endDate;

  const numberOfLicense = getNumberOfLicense({startDate, endDate})
  const totalBeneficiaries = 587;
  const numberOfMinors = 114;
  const firstTimeLicense = 10;
  const numberOfForeigners = 57;
  const numberOfNationals = 57;
  const numberOfActiveLicense = 498;
  const amountBeneficiaries = 8957.50;
  const amountParish = 2478.54;

  return response.status(200).send({
    numberOfLicense,
    totalBeneficiaries,
    numberOfMinors,
    firstTimeLicense,
    numberOfForeigners,
    numberOfNationals,
    numberOfActiveLicense,
    amountBeneficiaries,
    amountParish
  });
}

const getNumberOfLicense = async ({startDate, endDate}) => {
  const numberOfLicense = await Order.createQueryBuilder('orders')
      //.select('COUNT(DISTINCT orders.beneficiaryId)', 'numberOfLicense')
      .where('orders.created >= :start', { start: startDate })
      .andWhere('orders.created <= :end', { end: endDate })
      .distinct(true)
      .getRawOne();
  console.log('-> numberOfLicense', numberOfLicense)

  return numberOfLicense;
}
