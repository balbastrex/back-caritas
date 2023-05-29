import { Request, Response } from 'express';
import { UserProfiles } from '../../../../utils/constants';

const dashboardGeneralPolicy = (req: Request, res: Response, next: Function) => {
  console.log('==> DashboardGeneralPolicy')

  if (res.locals.profileId != UserProfiles.ADMINISTRADOR || res.locals.profileId != UserProfiles.DIRECTOR_ECONOMATO) {
    return res.status(403).send({
      status: 'Forbidden',
    });
  }

  next();
};

export default dashboardGeneralPolicy;
