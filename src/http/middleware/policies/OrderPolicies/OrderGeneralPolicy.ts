import { Request, Response } from 'express';
import { UserProfiles } from '../../../../utils/constants';
import moment from 'moment';

const orderGeneralPolicy = (req: Request, res: Response, next: Function) => {
  console.log('==> OrderGeneralPolicy')

  if (res.locals.profileId === UserProfiles.COMPRAS || res.locals.profileId === UserProfiles.GESTOR_PARROQUIA) {
    return res.status(403).send({
      status: 'Forbidden',
    });
  }

  const todayDate = moment(new Date()).format('yyyy-MM-DD')
  res.locals.findQuery = { created: todayDate };
  if (res.locals.profileId === UserProfiles.CAJA_PEDIDOS || res.locals.profileId === UserProfiles.DIRECTOR_ECONOMATO) {
    res.locals.findQuery = {
      marketId: res.locals.marketId,
      created: todayDate,
    };
  }

  next();
};

export default orderGeneralPolicy;
