import { Request, Response } from 'express';

const marketGeneralPolicy = (req: Request, res: Response, next: Function) => {
  console.log('==> MarketGeneralPolicy')

  if (res.locals.profileId === 3 || res.locals.profileId === 4 || res.locals.profileId === 5) {
    return res.status(403).send({
      status: 'Forbidden',
    });
  }

  res.locals.findQuery = {};
  if (res.locals.profileId === 2) {
    res.locals.findQuery = { id: res.locals.marketId };
  }

  next();
};

export default marketGeneralPolicy;
