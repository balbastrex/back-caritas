import { Request, Response } from 'express';
import { GuardianshipType } from '../../../entities/GuardianshipType';
import { GuardianshipTypeResource } from './GuardianshipTypeResource';

export const GuardianshipTypeIndex = async (request: Request, response: Response) => {
  const guardianshipType = await GuardianshipType.find();

  const guardianshipTypeResources = guardianshipType.map(guardianshipType => new GuardianshipTypeResource(guardianshipType));

  return response.status(200).json(guardianshipTypeResources);
};
