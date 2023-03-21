import { Request, Response } from 'express';
import { UserProfiles } from '../../../../utils/constants';

const receiptGeneralPolicy = (req: Request, res: Response, next: Function) => {
  console.log('==> ReceiptGeneralPolicy')

  if (res.locals.profileId === UserProfiles.CAJA_PEDIDOS) {
    return res.status(403).send({
      status: 'Forbidden',
    });
  }

  res.locals.findQuery = {};
  if (res.locals.profileId === UserProfiles.COMPRAS || res.locals.profileId === UserProfiles.DIRECTOR_ECONOMATO) {
    const parishId =  req.body.parishId || 0;
    if (parishId === 0) {
      res.locals.findQuery = {
        marketId: res.locals.marketId,
      };
    } else {
      res.locals.findQuery = {
        marketId: res.locals.marketId,
        parishId: parishId,
      };
    }
  }

  if (res.locals.profileId === UserProfiles.GESTOR_PARROQUIA) {
    res.locals.findQuery = {
      marketId: res.locals.marketId,
      parishId: res.locals.parishId,
    };
  }

  next();
};

export default receiptGeneralPolicy;
