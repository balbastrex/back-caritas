import { Request, Response } from 'express';
import { Parish } from '../../../entities/Parish';
import { ParishResource } from './ParishResource';

export const ParishIndex = async (request: Request, response: Response) => {
  let parishes: Parish[];

  parishes = await Parish.find(response.locals.findQuery);

  const parishesResources = parishes.map(parish => new ParishResource(parish));

  return response.status(200).json(parishesResources);
};
