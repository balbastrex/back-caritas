import { Request, Response } from 'express';
import { Beneficiary } from '../../../entities/Beneficiary';
import { Parish } from '../../../entities/Parish';
import { BeneficiaryParishResource } from './BeneficiaryParishResource';
import { ParishResource } from './ParishResource';

export const ParishIndex = async (request: Request, response: Response) => {
  const parishes = await Parish.find(response.locals.findQuery);

  const parishesResources = parishes.map(parish => new ParishResource(parish));

  return response.status(200).json(parishesResources);
};

export const ParishShow = async (request: Request, response: Response) => {
  const parish: Parish = await Parish.findOne(response.locals.findQuery);

  if (!parish) {
    return response.status(404).json({ message: 'Parish not found.' });
  }

  const parishResource = new ParishResource(parish);

  return response.status(200).json(parishResource);
}

export const BeneficiariesParishIndex = async (request: Request, response: Response) => {
  const parishId = request.params.id;
  const parish: Parish = await Parish.findOne(parishId);

  if (!parish) {
    return response.status(404).json({ message: 'Parish not found.' });
  }

  const beneficiaries = await Beneficiary.createQueryBuilder('beneficiary')
    .where('beneficiary.id_church = :parishId', { parishId })
    .orderBy({
      'beneficiary.id': 'ASC'
    })
    .getMany();

  const parishesResponse: BeneficiaryParishResource[] = beneficiaries.map(beneficiary => new BeneficiaryParishResource(beneficiary));

  return response.status(200).json(parishesResponse);
}

export const ParishStore = async (request: Request, response: Response) => {

  const parish: Parish = await new Parish();

  if (!response.locals.marketId) {
    return response.status(404).json({ message: 'Market not found.' });
  }

  parish.marketId = response.locals.marketId;
  parish.name = request.body.name;
  parish.city = request.body.city;
  parish.address = request.body.address;
  parish.email = request.body.email;
  parish.phone = request.body.phone;
  parish.contact = request.body.contact;
  parish.created = new Date();
  await parish.save();

  return response.status(200).json({ id: parish.id });
}

export const ParishUpdate = async (request: Request, response: Response) => {

  const parish: Parish = await Parish.findOne(response.locals.findQuery);

  if (!parish) {
    return response.status(404).json({ message: 'Parish not found.' });
  }

  parish.name = request.body.name;
  parish.city = request.body.city;
  parish.address = request.body.address;
  parish.email = request.body.email;
  parish.phone = request.body.phone;
  parish.contact = request.body.contact;
  await parish.save();

  return response.status(200).json({ id: parish.id });
}
