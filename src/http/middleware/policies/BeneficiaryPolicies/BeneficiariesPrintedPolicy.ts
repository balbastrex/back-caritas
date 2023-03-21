import { Request, Response } from 'express';
import { UserProfiles } from '../../../../utils/constants';

const beneficiariesPrintedPolicy = (req: Request, res: Response, next: Function) => {
  console.log('==> Read|Beneficiary|PrintedPolicy')

  //  CHECK ALLOWED METHODS
  if (req.method !== 'PUT') {
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
      needs_print: true
    },
    relations: ["parish"],
  }
  next();
};

export default beneficiariesPrintedPolicy;
