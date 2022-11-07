import { Request, Response } from 'express';

const parishParamPolicies = (req: Request, res: Response, next: Function) => {
  console.log('==> ParishParamsPolicy')

  res.locals.findQuery = {};
  if (res.locals.profileId === 5) {
    if (res.locals.parishId !== parseInt(req.params.id)) {
      return res.status(403).send({
        message: 'Forbidden'
      });
    }
  }
  res.locals.findQuery = { id: req.params.id };

  if (res.locals.profileId === 2) {
    res.locals.findQuery = {
      ...res.locals.findQuery,
      marketId: res.locals.marketId
    }
  }

  next();
};

export default parishParamPolicies;
