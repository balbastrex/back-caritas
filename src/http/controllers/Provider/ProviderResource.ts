import { Provider } from '../../../entities/Provider';

export class ProviderResource {
  id: number;
  name: string;
  marketId: number;

  constructor(provider: Provider) {
    this.id = provider.id;
    this.name = provider.name;
    this.marketId = provider.marketId;
  }
}
