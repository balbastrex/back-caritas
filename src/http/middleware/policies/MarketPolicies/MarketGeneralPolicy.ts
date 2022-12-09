import { Request, Response } from 'express';
import { UserProfiles } from '../../../../utils/constants';

const marketGeneralPolicy = (req: Request, res: Response, next: Function) => {
  console.log('==> MarketGeneralPolicy')

  if (res.locals.profileId === 3 || res.locals.profileId === 4 || res.locals.profileId === 5) {
    return res.status(403).send({
      status: 'Forbidden',
    });
  }

  if (req.method === 'POST') {
    if (res.locals.profileId !== UserProfiles.ADMINISTRADOR) {
      return res.status(403).send({
        status: 'Forbidden',
      });
    }
  }

  res.locals.findQuery = {};
  if (res.locals.profileId === 2) {
    res.locals.findQuery = { id: res.locals.marketId };
  }

  next();
};

export default marketGeneralPolicy;
