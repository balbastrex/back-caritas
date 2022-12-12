import { Request, Response } from 'express';
import { UserProfiles } from '../../../../utils/constants';

const userGeneralPolicy = (req: Request, res: Response, next: Function) => {
  console.log('==> UserGeneralPolicy')

  if (res.locals.profileId === UserProfiles.COMPRAS ||
    res.locals.profileId === UserProfiles.CAJA_PEDIDOS ||
    res.locals.profileId === UserProfiles.GESTOR_PARROQUIA) {
    return res.status(403).send({
      status: 'Forbidden',
    });
  }

  res.locals.findQuery = {};
  if (res.locals.profileId === UserProfiles.DIRECTOR_ECONOMATO) {
    res.locals.findQuery = {
      where: { marketId: res.locals.marketId },
      order: { id: 'ASC' },
    };
  }

  next();
}

export default userGeneralPolicy;
