import { Request, Response } from 'express';
import { CivilStateType } from '../../../entities/CivilStateType';
import { CivilStateTypeResource } from './CivilStateTypeResource';

export const CivilStateTypeIndex = async (request: Request, response: Response) => {
  const civilStateType = await CivilStateType.find();

  const civilStateTypeResources = civilStateType.map(civilStateType => new CivilStateTypeResource(civilStateType));

  return response.status(200).json(civilStateTypeResources);
};
