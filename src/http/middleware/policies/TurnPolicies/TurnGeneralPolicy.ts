import { Request, Response } from 'express';
import { UserProfiles } from '../../../../utils/constants';

const turnGeneralPolicy = (req: Request, res: Response, next: Function) => {
  console.log('==> TurnGeneralPolicy')

  if (res.locals.profileId === UserProfiles.COMPRAS ||
    res.locals.profileId === UserProfiles.CAJA_PEDIDOS ||
    res.locals.profileId === UserProfiles.GESTOR_PARROQUIA) {
    return res.status(403).send({
      status: 'Forbidden',
    });
  }

  res.locals.marketId = res.locals.profileId === UserProfiles.ADMINISTRADOR ? null : res.locals.marketId;

  next();
};

export default turnGeneralPolicy;
