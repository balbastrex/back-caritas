import { Request, Response } from 'express';
import { UserProfiles } from '../../../../utils/constants';

const parishGeneralPolicy = (req: Request, res: Response, next: Function) => {
  console.log('==> ParishGeneralPolicy')

  if (res.locals.profileId === 3 || res.locals.profileId === 4) {
    return res.status(403).send({
      status: 'Forbidden',
    });
  }

  if (req.method === 'POST') {
    if (res.locals.profileId !== UserProfiles.DIRECTOR_ECONOMATO) {
      return res.status(403).send({
        status: 'Forbidden',
      });
    }
  }

  res.locals.findQuery = {};
  if (res.locals.profileId === 5) {
    res.locals.findQuery = { id: res.locals.parishId };
  }
  if (res.locals.profileId === 2) {
    res.locals.findQuery = {
      marketId: res.locals.marketId
    }
  }

  next();
};

export default parishGeneralPolicy;
