import { Request, Response } from 'express';
import { Turn } from '../../../entities/Turn';
import { TurnMarketResource } from './TurnMarketResource';
import { TurnResource } from './TurnResource';

export const TurnIndex = async (request: Request, response: Response) => {
  const turns = await Turn.find();
  const turnsResource = turns.map(turn => new TurnResource(turn));

  return response.status(200).json(turnsResource);
};

export const TurnByMarketId = async (request: Request, response: Response) => {
  const marketId = response.locals.marketId;
  const turnsQuery = Turn.createQueryBuilder('turn');

  turnsQuery.leftJoinAndSelect('turn.market', 'market')
  turnsQuery.leftJoinAndSelect('turn.beneficiaries', 'beneficiaries')

  if (marketId) {
    turnsQuery.where('turn.marketId = :marketId', { marketId });
  }

  const turns = await turnsQuery.orderBy({
    'turn.id': 'ASC'
  })
    .getMany();

  const turnsResource = turns.map(turn => new TurnMarketResource(turn));

  return response.status(200).json(turnsResource);
};

export const TurnShow = async (request: Request, response: Response) => {
  const turn = await Turn.findOne(response.locals.findQuery);

  if (!turn) {
    return response.status(404).json({ message: 'Turn not found.' });
  }

  const turnsResource = new TurnResource(turn);

  return response.status(200).json(turnsResource);
};

export const TurnUpdate = async (request: Request, response: Response) => {
  const turn = await Turn.findOne(response.locals.findQuery);

  if (!turn) {
    return response.status(404).json({ message: 'Turn not found.' });
  }

  await fillAndSaveTurn(turn, request);

  return response.status(200).json({ id: turn.id });
};

export const TurnStore = async (request: Request, response: Response) => {
  const marketId = response.locals.marketId;
  console.log('==> marketId ', marketId)

  if (!marketId) {
    return response.status(404).json({ message: 'No tienes autorización para crear un turno.' });
  }

  const turn = new Turn();
  turn.marketId = marketId;

  await fillAndSaveTurn(turn, request);

  return response.status(200).json({ id: turn.id });
};

async function fillAndSaveTurn(turn: Turn, request: Request) {
  turn.name = request.body.name;
  turn.description = request.body.description;
  await turn.save();
}
