import { Request, Response } from 'express';
import { Turn } from '../../../entities/Turn';
import { TurnResource } from './TurnResource';

export const TurnShow = async (request: Request, response: Response) => {
  const turns = await Turn.find();
  const turnsResource = turns.map(turn => new TurnResource(turn));

  return response.status(200).json(turnsResource);
};
