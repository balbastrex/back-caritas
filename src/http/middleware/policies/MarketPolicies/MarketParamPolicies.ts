import { Request, Response } from 'express';

const marketParamPolicies = (req: Request, res: Response, next: Function) => {
  console.log('==> MarketParamsPolicy')

  res.locals.findQuery = {};
  if (res.locals.profileId === 2) {
    if (res.locals.marketId !== parseInt(req.params.id)) {
      return res.status(403).send({
        message: 'Forbidden'
      });
    }
  }
  res.locals.findQuery = { id: req.params.id };

  next();
};

export default marketParamPolicies;
