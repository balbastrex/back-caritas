import { Request, Response } from 'express';
import { FamilyType } from '../../../entities/FamilyType';
import { FamilyTypeResource } from './FamilyTypeResource';

export const FamilyTypeIndex = async (request: Request, response: Response) => {
  const familyType = await FamilyType.find();

  const familyTypeResources = familyType.map(familyType => new FamilyTypeResource(familyType));

  return response.status(200).json(familyTypeResources);
};
