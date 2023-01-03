import { Request, Response } from 'express';
import { UserProfiles } from '../../../../utils/constants';
import moment from 'moment';

const orderHistoryGeneralPolicy = (req: Request, res: Response, next: Function) => {
  console.log('==> OrderHistoryGeneralPolicy')

  if (res.locals.profileId === UserProfiles.COMPRAS || res.locals.profileId === UserProfiles.GESTOR_PARROQUIA || res.locals.profileId === UserProfiles.CAJA_PEDIDOS) {
    return res.status(403).send({
      status: 'Forbidden',
    });
  }

  if (res.locals.profileId === UserProfiles.DIRECTOR_ECONOMATO) {
    res.locals.findQuery = {
      marketId: res.locals.marketId,
      // status: 'Cerrado'
    };
  }

  next();
};

export default orderHistoryGeneralPolicy;
