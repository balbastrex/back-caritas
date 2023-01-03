import { Request, Response } from 'express';
import { createQueryBuilder } from 'typeorm';
import { Beneficiary } from '../../../entities/Beneficiary';
import { Turn } from '../../../entities/Turn';
import { BeneficiaryIdNameResource } from './BeneficiaryIdNameResource';
import { BeneficiaryResource } from './BeneficiaryResource';
import { BeneficiaryTurnResource } from './BeneficiaryTurnResource';

export const BeneficiaryIndex = async (request: Request, response: Response) => {
  const beneficiaries = await Beneficiary.find({
    ...response.locals.findQuery,
    order: { license: 'ASC'},
    relations: ['parish', 'parish.market']
  });

  const BeneficiariesResources = beneficiaries.map(beneficiary => new BeneficiaryResource(beneficiary));

/*  const duplicated = await Beneficiary.createQueryBuilder('beneficiary')
    .select('beneficiary.license', 'License')
    .addSelect('COUNT(beneficiary.license)', 'repeated')
    .groupBy('beneficiary.license')
    .having('COUNT(beneficiary.license) > 1')
    .getRawMany();

  console.log(duplicated);*/

  return response.status(200).json(BeneficiariesResources);
};

export const BeneficiaryIndexIdName = async (request: Request, response: Response) => {
  const beneficiaries = await Beneficiary.find({
    ...response.locals.findQuery,
    relations: ['orders', 'parish', 'parish.market']
  });

  const beneficiariesResources = beneficiaries.map(beneficiary => {
    const lastDateOrder = beneficiary.orders.length > 0 ? beneficiary.orders[beneficiary.orders.length - 1].created : new Date();
    return new BeneficiaryIdNameResource(beneficiary, lastDateOrder);
  });

  return response.status(200).json(beneficiariesResources);
}

export const BeneficiaryShow = async (request: Request, response: Response) => {
  const beneficiary: Beneficiary = await Beneficiary.findOne(response.locals.findQuery);

  if (!beneficiary) {
    return response.status(404).json({ message: 'Beneficiary not found.' });
  }

  const beneficiaryResource = new BeneficiaryResource(beneficiary);

  return response.status(200).json(beneficiaryResource);
};

export const BeneficiaryStore = async (request: Request, response: Response) => {
  const beneficiary: Beneficiary = await new Beneficiary();

  if (await isIdentifyDuplicated(request.body.cif)) {
    return response.status(404).json({ message: 'Este NIF/NIE ya existe.' });
  }

  /*if (!response.locals.parishId) {
    return response.status(404).json({ message: 'Parish not found.' });
  }*/

  beneficiary.firstname = request.body.name;
  beneficiary.lastname1 = request.body.lastname1;
  beneficiary.lastname2 = request.body.lastname2;
  beneficiary.license = request.body.license === 0 ? await licenseGenerator(response.locals.marketId) : request.body.license;
  beneficiary.cif = request.body.cif;
  beneficiary.adults = request.body.adults;
  beneficiary.minors = request.body.minors;
  beneficiary.family_unit = request.body.adults + request.body.minors;
  beneficiary.phone = request.body.phone;
  beneficiary.email = request.body.email;
  beneficiary.address = request.body.address;
  beneficiary.city = request.body.city;
  beneficiary.state = request.body.state;
  beneficiary.zip = request.body.zip;
  beneficiary.free = request.body.free;
  beneficiary.nationalityId = request.body.nationalityId === "" ? null : request.body.nationalityId;
  beneficiary.birth_date = new Date(request.body.birthDate);
  beneficiary.sice = request.body.sice;
  beneficiary.gender = request.body.gender;
  beneficiary.gratuitous = request.body.gratuitous;
  beneficiary.expires = new Date(request.body.expires);
  beneficiary.homeless = request.body.homeless;
  beneficiary.children_under_18 = request.body.childrenUnder18;
  beneficiary.children_over_18 = request.body.childrenOver18;

  beneficiary.parishId = request.body.parishId;
  beneficiary.turnId = request.body.turnId;
  beneficiary.familyTypeId = request.body.familyTypeId === "" ? null : request.body.familyTypeId;
  beneficiary.citizenTypeId = request.body.citizenTypeId === "" ? null : request.body.citizenTypeId;
  beneficiary.civilStateTypeId = request.body.civilStateTypeId === "" ? null : request.body.civilStateTypeId;
  beneficiary.employmentTypeId = request.body.employmentTypeId === "" ? null : request.body.employmentTypeId;
  beneficiary.guardianshipTypeId = request.body.guardianshipTypeId === "" ? null : request.body.guardianshipTypeId;
  beneficiary.educationTypeId = request.body.educationTypeId === "" ? null : request.body.educationTypeId;
  beneficiary.authorizationTypeId = request.body.authorizationTypeId === "" ? null : request.body.authorizationTypeId;
  await beneficiary.save();

  return response.status(200).json({ id: beneficiary.id });
}

export const BeneficiaryUpdate = async (request: Request, response: Response) => {
  const beneficiary: Beneficiary = await Beneficiary.findOne(response.locals.findQuery);

  if (!beneficiary) {
    return response.status(404).json({ message: 'Beneficiary not found.' });
  }

  beneficiary.firstname = request.body.name;
  beneficiary.lastname1 = request.body.lastname1;
  beneficiary.lastname2 = request.body.lastname2;
  beneficiary.license = request.body.license === 0 ? await licenseGenerator(response.locals.marketId) : request.body.license;
  beneficiary.cif = request.body.cif;
  beneficiary.adults = request.body.adults;
  beneficiary.minors = request.body.minors;
  beneficiary.family_unit = request.body.family_unit;
  beneficiary.phone = request.body.phone;
  beneficiary.email = request.body.email;
  beneficiary.address = request.body.address;
  beneficiary.city = request.body.city;
  beneficiary.state = request.body.state;
  beneficiary.zip = request.body.zip;
  beneficiary.free = request.body.free;
  beneficiary.nationalityId = request.body.nationalityId === "" ? null : request.body.nationalityId;
  beneficiary.birth_date = new Date(request.body.birthDate);
  beneficiary.sice = request.body.sice;
  beneficiary.gender = request.body.gender;
  beneficiary.gratuitous = request.body.gratuitous;
  beneficiary.expires = new Date(request.body.expires);
  beneficiary.homeless = request.body.homeless;
  beneficiary.children_under_18 = request.body.childrenUnder18;
  beneficiary.children_over_18 = request.body.childrenOver18;

  beneficiary.parishId = request.body.parishId;
  beneficiary.turnId = request.body.turnId;
  beneficiary.familyTypeId = request.body.familyTypeId === "" ? null : request.body.familyTypeId;
  beneficiary.citizenTypeId = request.body.citizenTypeId === "" ? null : request.body.citizenTypeId;
  beneficiary.civilStateTypeId = request.body.civilStateTypeId === "" ? null : request.body.civilStateTypeId;
  beneficiary.employmentTypeId = request.body.employmentTypeId === "" ? null : request.body.employmentTypeId;
  beneficiary.guardianshipTypeId = request.body.guardianshipTypeId === "" ? null : request.body.guardianshipTypeId;
  beneficiary.educationTypeId = request.body.educationTypeId === "" ? null : request.body.educationTypeId;
  beneficiary.authorizationTypeId = request.body.authorizationTypeId === "" ? null : request.body.authorizationTypeId;
  await beneficiary.save();

  return response.status(200).json({ id: beneficiary.id });
}

export const BeneficiaryByTurn = async (request: Request, response: Response) => {
  const turn = await Turn.createQueryBuilder('turn')
    .where('turn.id = :id', { id: response.locals.findQuery.id })
    .andWhere('turn.marketId = :marketId', { marketId: response.locals.findQuery.marketId })
    .leftJoinAndSelect('turn.beneficiaries', 'beneficiary')
    .leftJoinAndSelect('beneficiary.parish', 'parish')
    .leftJoinAndSelect('beneficiary.orders', 'orders')
    .orderBy('beneficiary.license', 'ASC')
    .getOne();

  if (!turn) {
    return response.status(404).json({ message: 'Turn not found.' });
  }

  const BeneficiariesResources = turn.beneficiaries.filter(beneficiary => beneficiary.expires > new Date()).map(beneficiary => {
    const lastDateOrder = beneficiary.orders.length > 0 ? beneficiary.orders[beneficiary.orders.length - 1].created : new Date();
    return new BeneficiaryTurnResource(beneficiary, lastDateOrder);
  });

  return response.status(200).json(BeneficiariesResources);
}

const isIdentifyDuplicated = (cif) => {
  return Beneficiary.findOne({ where: { cif: cif } });
}

const licenseGenerator = async (marketId) => {

  const lastBeneficiary = await Beneficiary.createQueryBuilder('beneficiary')
    .leftJoin('beneficiary.parish', 'parish')
    .where('parish.marketId = :marketId', { marketId: marketId })
    .orderBy('beneficiary.license', 'DESC')
    .getOne();

  if (lastBeneficiary) {
    console.log('license', lastBeneficiary.license);
    return lastBeneficiary.license + 1;
  }
  console.log('license', 1);
  return 1;
}
