import { Request, Response } from 'express';
import { Parish } from '../../../entities/Parish';
import { Turn } from '../../../entities/Turn';
import { TurnResource } from './TurnResource';

export const TurnShow = async (request: Request, response: Response) => {
  const parish = await Parish.findOne(response.locals.parishId);
  const marketId = parish.marketId;

  const turns = await Turn.find({ marketId });

  const turnsResource = turns.map(turn => new TurnResource(turn));

  return response.status(200).json(turnsResource);
};
