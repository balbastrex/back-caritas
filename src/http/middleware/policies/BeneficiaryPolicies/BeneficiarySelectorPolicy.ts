import { Request, Response } from 'express';
import { IsNull, Not } from 'typeorm';
import { UserProfiles } from '../../../../utils/constants';

const beneficiarySelectorPolicy = (req: Request, res: Response, next: Function) => {
  console.log('==> Read|Beneficiary|SelectorPolicy')

  //  CHECK ALLOWED METHODS
  if (req.method !== 'GET') {
    return next();
  }

  //  CHECK ALLOWED PROFILES
  if (res.locals.profileId === UserProfiles.COMPRAS || res.locals.profileId === UserProfiles.GESTOR_PARROQUIA) {
    return res.status(403).send({
      status: 'Forbidden',
    });
  }

  //  SET ALLOWED QUERY PARAMETERS
  res.locals.findQuery = {
    where: {
      parish: { marketId: res.locals.marketId },
      sice: Not(IsNull())
    },
    relations: ["parish"],
  }
  next();
};

export default beneficiarySelectorPolicy;
