import { Request, Response } from 'express';
import {Order} from "../../../entities/Order";
import {Beneficiary} from "../../../entities/Beneficiary";
import moment from 'moment';
import {OrderLine} from "../../../entities/OrderLine";
import {Product} from "../../../entities/Product";
import {Brackets} from "typeorm";
import {ParishOrdersReportResource} from "../Order/ParishOrdersReportResource";
import {getBeneficiaryAmount, getParishAmount} from "../Receipt/ReceiptController";

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
  let total = 0;
  orders.forEach(order => {
    total += order.amount;
    totalParish += ((order.gratuitous || 0) / 100) * order.amount;
    totalBeneficiary += order.amount - (((order.gratuitous || 0) / 100) * order.amount);
  })

  return {
    total: total.toFixed(2),
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

export const BeneficiariesByAge = async (request: Request, response: Response) => {
  const marketId = response.locals.marketId;

  const beneficiaries = await Beneficiary.createQueryBuilder('beneficiaries')
    .leftJoin('beneficiaries.parish', 'parish')
    .where('parish.marketId = :marketId', { marketId: marketId })
    .andWhere('beneficiaries.needs_print = false')
    .select('SUM (beneficiaries.minors)', 'minors')
    .addSelect('SUM (beneficiaries.adults)', 'adults')
    .getRawOne();

  return response.status(200).json(beneficiaries);
}

export const WeekReport = async (request: Request, response: Response) => {
  const marketId = response.locals.marketId;
  const startDate = moment().startOf('isoWeek').format('YYYY-MM-DD');
  const endDate = moment().endOf('isoWeek').format('YYYY-MM-DD');

  const most = await OrderLine.createQueryBuilder('orderLine')
    .leftJoin('orderLine.order', 'order')
    .where('order.id_economato = :economato', { economato: marketId })
    .andWhere('order.created >= :start', { start: startDate })
    .andWhere('order.created <= :end', { end: endDate })
    .select('orderLine.productId', 'productId')
    .addSelect('SUM (orderLine.units)', 'units')
    .groupBy('orderLine.productId')
    .orderBy('units', 'DESC')
    .getRawOne();

  if (!most) {
    return response.status(200).json({
      numberOfOrders: 0,
      totalAmountOrders: 0,
      mostSold: {
        product: 'No hay ventas',
        units: 0,
      },
      amountBeneficiariesUF: 0,
    });
  }

  const productName = await Product.findOne(most.productId)

  const mostSold = {
    product: productName.name,
    units: most.units,
  }

  const amountBeneficiariesUF = await getNumberOfBeneficiaries({startDate, endDate, marketId});
  const amountOrders = await getAmountOrders({startDate, endDate, marketId});
  const totalBeneficiaries = await getNumberOfLicense({startDate, endDate, marketId});

  return response.status(200).json({
    numberOfOrders: totalBeneficiaries,
    totalAmountOrders: amountOrders.total,
    mostSold,
    amountBeneficiariesUF: amountBeneficiariesUF.numberOfFamilyUnit
  });
}

export const ParishWeekReport = async (request: Request, response: Response) => {
  const marketId = response.locals.marketId;
  const startDate = moment().startOf('isoWeek').format('YYYY-MM-DD');
  const endDate = moment().endOf('isoWeek').format('YYYY-MM-DD');

  const query = Order.createQueryBuilder('orders')
    .leftJoinAndSelect('orders.beneficiary', 'beneficiary')
    .leftJoinAndSelect('beneficiary.parish', 'parish')
    .leftJoinAndSelect('orders.market', 'market')
    .where('orders.id_economato = :economato', { economato: marketId })

    query.andWhere('orders.created >= :start', { start: startDate })
    query.andWhere('orders.created <= :end', { end: endDate });

  const orders: Array<any> = await query.orderBy({
    'orders.id': 'ASC'
  })
    .getMany();

  const mySet = new Set();
  const distinct = orders.filter((order) => {
    const duplicate = mySet.has(order.beneficiary.parish.id);
    mySet.add(order.beneficiary.parish.id);
    return !duplicate;
  })

  const result = distinct.map((dis) => {
    const ordersByParish = orders.filter((order) => order.beneficiary.parish.id === dis.beneficiary.parish.id);

    return {
      parishName: dis.beneficiary.parish.name,
      numOrders: ordersByParish.length,
    }
  });

  return response.status(200).json(result);
}
