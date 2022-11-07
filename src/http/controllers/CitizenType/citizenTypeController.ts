import { Request, Response } from 'express';
import { CitizenType } from '../../../entities/CitizenType';
import { CitizenTypeResource } from './CitizenTypeResource';

export const CitizenTypeIndex = async (request: Request, response: Response) => {
  const citizenType = await CitizenType.find();

  const citizenTypeResources = citizenType.map(citizenType => new CitizenTypeResource(citizenType));

  return response.status(200).json(citizenTypeResources);
};
