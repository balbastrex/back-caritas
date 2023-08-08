import { Request, Response } from 'express';
import {Order} from "../../../entities/Order";

export const memoryPeriod = async (request: Request, response: Response) => {
  const startDate = request.body.startDate;
  const endDate = request.body.endDate;
  const marketId = response.locals.marketId;

  const amountOrders = await getAmountOrders({startDate, endDate, marketId});
  const numberOfLicense = await getNumberOfLicense({startDate, endDate, marketId })
  const totalBeneficiaries = await getNumberOfBeneficiaries({startDate, endDate, marketId })
  const firstTimeLicense = await getNumberOfFirstBeneficiaries({startDate, endDate, marketId});
  const numberOfNationals = await getSpanishFamilies({startDate, endDate, marketId });
  const numberOfActiveLicense = 'x';
  const amountBeneficiaries = amountOrders.totalBeneficiary;
  const amountParish = amountOrders.totalParish;

  return response.status(200).send({
    numberOfLicense,
    totalBeneficiaries: totalBeneficiaries.numberOfFamilyUnit,
    numberOfMinors: totalBeneficiaries.numberOfMinors,
    firstTimeLicense,
    numberOfForeigners: numberOfLicense - numberOfNationals,
    numberOfNationals,
    numberOfActiveLicense,
    amountBeneficiaries,
    amountParish
  });
}

const getNumberOfLicense = async ({startDate, endDate, marketId}) => {
  const numberOfLicense = await Order.createQueryBuilder('orders')
    .select('COUNT(DISTINCT orders.beneficiaryId)', 'numberOfLicense')
    .where('orders.id_economato = :economato', { economato: marketId })
    .andWhere('orders.created >= :start', { start: startDate })
    .andWhere('orders.created <= :end', { end: endDate })
    .getRawOne();

  return parseInt(numberOfLicense.numberOfLicense);
}

const getNumberOfBeneficiaries = async ({startDate, endDate, marketId}) => {
  const numberOfFamilyUnit = await Order.createQueryBuilder('orders')
    .distinctOn(['orders.beneficiaryId'])
    .where('orders.id_economato = :economato', { economato: marketId })
    .andWhere('orders.created >= :start', { start: startDate })
    .andWhere('orders.created <= :end', { end: endDate })
    .innerJoin('orders.beneficiary', 'beneficiary')
    .select('SUM (beneficiary.family_unit)', 'familyUnit')
    .addSelect('SUM (beneficiary.minors)', 'minors')
    .getRawOne();

  return {
    numberOfFamilyUnit: parseInt(numberOfFamilyUnit.familyUnit),
    numberOfMinors: parseInt(numberOfFamilyUnit.minors)
  }
}

const getSpanishFamilies = async ({startDate, endDate, marketId}) => {
  const numberOfSpanishFamilies = await Order.createQueryBuilder('orders')
    .distinctOn(['orders.beneficiaryId'])
    .where('orders.id_economato = :economato', { economato: marketId })
    .andWhere('orders.created >= :start', { start: startDate })
    .andWhere('orders.created <= :end', { end: endDate })
    .leftJoin('orders.beneficiary', 'beneficiary')
    .andWhere('beneficiary.id_citizen_type = :citizenType', { citizenType: 1 })
    .select('COUNT (beneficiary.id)', 'citizenType')
    .getRawOne();

  return parseInt(numberOfSpanishFamilies.citizenType)
}

const getAmountOrders = async ({startDate, endDate, marketId}) => {
  const orders = await Order.createQueryBuilder('orders')
    .where('orders.id_economato = :economato', { economato: marketId })
    .andWhere('orders.created >= :start', { start: startDate })
    .andWhere('orders.created <= :end', { end: endDate })
    .getMany();

  let totalParish = 0;
  let totalBeneficiary = 0;
  orders.forEach(order => {
    totalParish += ((order.gratuitous || 0) / 100) * order.amount;
    totalBeneficiary += order.amount - (((order.gratuitous || 0) / 100) * order.amount);
  })

  return {
    totalParish: totalParish.toFixed(2),
    totalBeneficiary: totalBeneficiary.toFixed(2),
  };
}

const getNumberOfFirstBeneficiaries = async ({startDate, endDate, marketId}) => {
  const priorOrders = await Order.createQueryBuilder('orders')
    .distinctOn(['orders.beneficiaryId'])
    .where('orders.id_economato = :economato', { economato: marketId })
    .andWhere('orders.created < :start', { start: startDate })
    //.andWhere('orders.created <= :end', { end: endDate })
    .select('orders.beneficiaryId', 'priorPeriodOrders')
    .getRawMany();

  const latestOrders = priorOrders.map(beneficiary => beneficiary.priorPeriodOrders)

  const numberOfFirstFamilies = await Order.createQueryBuilder('orders')
    .distinctOn(['orders.beneficiaryId'])
    .where('orders.id_economato = :economato', { economato: marketId })
    .andWhere('orders.created >= :start', { start: startDate })
    .andWhere('orders.created <= :end', { end: endDate })
    .andWhere('orders.beneficiaryId NOT IN (:priorPeriodOrders)', { priorPeriodOrders: latestOrders })
    .select('COUNT (orders.beneficiaryId)', 'firstFamilyOrders')
    .getRawOne();

  return parseInt(numberOfFirstFamilies.firstFamilyOrders)
}
