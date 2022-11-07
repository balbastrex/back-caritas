import { Request, Response } from 'express';

const parishGeneralPolicy = (req: Request, res: Response, next: Function) => {
  console.log('==> BeneficiaryGeneralPolicy')

  if (res.locals.profileId === 3 || res.locals.profileId === 4) {
    return res.status(403).send({
      status: 'Forbidden',
    });
  }

  res.locals.findQuery = {};
  if (res.locals.profileId === 5) {
    res.locals.findQuery = { parishId: res.locals.parishId };
  }
  if (res.locals.profileId === 2) {
    res.locals.findQuery = {
      where: {
        parish: { id_economato: res.locals.marketId },
      },
      relations: ["parish"],
    }
  }

  next();
};

export default parishGeneralPolicy;
