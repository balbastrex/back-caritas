import { Request, Response } from 'express';
import { Parish } from '../../../entities/Parish';
import { ParishResource } from './ParishResource';

export const ParishIndex = async (request: Request, response: Response) => {
  let parishes: Parish[];
  const profileId = response.locals.profileId;

  if (profileId === 5) {
    const parishId = response.locals.parishId;

    parishes = await Parish.find({ id: parishId });
  } else {
    parishes = await Parish.find();
  }

  const parishesResources = parishes.map(parish => new ParishResource(parish));

  return response.status(200).json(parishesResources);
};
