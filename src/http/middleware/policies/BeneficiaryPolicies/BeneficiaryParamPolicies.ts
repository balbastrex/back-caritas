import { Request, Response } from 'express';

const beneficiaryParamPolicies = (req: Request, res: Response, next: Function) => {
  console.log('==> BeneficiaryParamsPolicy')

  res.locals.findQuery = { id: req.params.id };
  if (res.locals.profileId === 5) {
    res.locals.findQuery = {
      where: {
        id: req.params.id,
        parishId: res.locals.parishId,
        parish: { marketId: res.locals.marketId },
      },
      relations: ["parish"],
    }
  }

  if (res.locals.profileId === 2) {
    res.locals.findQuery = {
      where: {
        id: req.params.id,
        parish: { marketId: res.locals.marketId },
      },
      relations: ["parish"],
    }
  }

  next();
};

export default beneficiaryParamPolicies;
