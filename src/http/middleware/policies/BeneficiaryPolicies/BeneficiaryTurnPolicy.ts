import { Request, Response } from 'express';
import { IsNull, Not } from 'typeorm';
import { UserProfiles } from '../../../../utils/constants';

const beneficiaryTurnPolicy = (req: Request, res: Response, next: Function) => {
  console.log('==> Read|Beneficiary|TurnPolicy')

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
      id: req.params.id,
      marketId: res.locals.marketId,
  }
  next();
};

export default beneficiaryTurnPolicy;
