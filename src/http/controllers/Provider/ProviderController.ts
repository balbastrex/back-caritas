import { Request, Response } from 'express';
import { Provider } from '../../../entities/Provider';
import { Turn } from '../../../entities/Turn';
import { ProviderResource } from './ProviderResource';

export const ProviderIndex = async (request: Request, response: Response) => {
  const providers = await Provider.find(response.locals.findQuery);
  const providerResources = providers.map(provider => new ProviderResource(provider));

  return response.status(200).json(providerResources);
};

/*export const TurnByMarketId = async (request: Request, response: Response) => {
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
};*/

export const ProviderShow = async (request: Request, response: Response) => {
  const provider = await Provider.findOne(response.locals.findQuery);

  if (!provider) {
    return response.status(404).json({ message: 'Turn not found.' });
  }

  const providersResource = new ProviderResource(provider);

  return response.status(200).json(providersResource);
};

export const ProviderUpdate = async (request: Request, response: Response) => {
  const provider = await Provider.findOne(response.locals.findQuery);

  if (!provider) {
    return response.status(404).json({ message: 'Provider not found.' });
  }

  await fillAndSaveProvider(provider, request);

  return response.status(200).json({ id: provider.id });
};

export const ProviderStore = async (request: Request, response: Response) => {
  const marketId = response.locals.marketId;

  if (!marketId) {
    return response.status(404).json({ message: 'No tienes autorización para crear un turno.' });
  }

  const provider = new Provider();
  provider.marketId = marketId;
  provider.created = new Date();
  provider.updated = new Date();

  await fillAndSaveProvider(provider, request);

  return response.status(200).json({ id: provider.id });
};

async function fillAndSaveProvider(provider: Provider, request: Request) {
  provider.name = request.body.name;
  await provider.save();
}
