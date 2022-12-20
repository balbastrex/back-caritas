import { Request, Response } from 'express';
import { Beneficiary } from '../../../entities/Beneficiary';
import { Product } from '../../../entities/Product';
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

  return response.status(200).json(BeneficiariesResources);
};

export const BeneficiaryIndexIdName = async (request: Request, response: Response) => {
  const beneficiaries = await Beneficiary.find({ ...response.locals.findQuery, select: ['id', 'firstname', 'lastname1', 'lastname2']});

  const BeneficiariesResources = beneficiaries.map(beneficiary => new BeneficiaryIdNameResource(beneficiary));

  return response.status(200).json(BeneficiariesResources);
}

export const BeneficiaryShow = async (request: Request, response: Response) => {
  const beneficiary: Beneficiary = await Beneficiary.findOne(response.locals.findQuery);

  if (!beneficiary) {
    return response.status(404).json({ message: 'Beneficiary not found.' });
  }

  const beneficiaryResource = new BeneficiaryResource(beneficiary);

  return response.status(200).json({beneficiaryResource});
};

export const BeneficiaryStore = async (request: Request, response: Response) => {
  const beneficiary: Beneficiary = await new Beneficiary();

  /*if (!response.locals.parishId) {
    return response.status(404).json({ message: 'Parish not found.' });
  }*/

  beneficiary.firstname = request.body.name;
  beneficiary.lastname1 = request.body.lastname1;
  beneficiary.lastname2 = request.body.lastname2;
  beneficiary.license = request.body.license;
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
  beneficiary.nationalityId = request.body.nationalityId;

  beneficiary.parishId = request.body.parishId;
  beneficiary.turnId = request.body.turnId;
  beneficiary.familyTypeId = request.body.familyTypeId;
  beneficiary.citizenTypeId = request.body.citizenTypeId;
  beneficiary.civilStateTypeId = request.body.civilStateTypeId;
  beneficiary.employmentTypeId = request.body.employmentTypeId;
  beneficiary.guardianshipTypeId = request.body.guardianshipTypeId;
  beneficiary.educationTypeId = request.body.educationTypeId;
  beneficiary.authorizationTypeId = request.body.authorizationTypeId;
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
  beneficiary.license = request.body.license;
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
  beneficiary.nationalityId = request.body.nationalityId;

  beneficiary.parishId = request.body.parishId;
  beneficiary.turnId = request.body.turnId;
  beneficiary.familyTypeId = request.body.familyTypeId;
  beneficiary.citizenTypeId = request.body.citizenTypeId;
  beneficiary.civilStateTypeId = request.body.civilStateTypeId;
  beneficiary.employmentTypeId = request.body.employmentTypeId;
  beneficiary.guardianshipTypeId = request.body.guardianshipTypeId;
  beneficiary.educationTypeId = request.body.educationTypeId;
  beneficiary.authorizationTypeId = request.body.authorizationTypeId;
  await beneficiary.save();

  return response.status(200).json({ id: beneficiary.id });
}

export const BeneficiaryByTurn = async (request: Request, response: Response) => {
  const turn = await Turn.createQueryBuilder('turn')
    .where('turn.id = :id', { id: response.locals.findQuery.id })
    .andWhere('turn.marketId = :marketId', { marketId: response.locals.findQuery.marketId })
    .leftJoinAndSelect('turn.beneficiaries', 'beneficiary')
    .getOne();

  if (!turn) {
    return response.status(404).json({ message: 'Turn not found.' });
  }

  const BeneficiariesResources = turn.beneficiaries.map(beneficiary => new BeneficiaryTurnResource(beneficiary));

  return response.status(200).json(BeneficiariesResources);
}
