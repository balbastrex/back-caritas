import { Request, Response } from 'express';
import { UserProfiles } from '../../../../utils/constants';

const reportGeneralPolicy = (req: Request, res: Response, next: Function) => {
  console.log('==> ReportGeneralPolicy')

  if (res.locals.profileId != UserProfiles.ADMINISTRADOR && res.locals.profileId != UserProfiles.DIRECTOR_ECONOMATO && res.locals.profileId != UserProfiles.GESTOR_PARROQUIA) {
    console.log('here', res.locals.profileId)
    return res.status(403).send({
      status: 'Forbidden',
    });
  }

  next();
};

export default reportGeneralPolicy;
