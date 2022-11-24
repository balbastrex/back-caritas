import { Request, Response } from 'express';
import { UserProfiles } from '../../../../utils/constants';

const serviceGeneralPolicy = (req: Request, res: Response, next: Function) => {
  console.log('==> ServiceGeneralPolicy')

  if (res.locals.profileId === UserProfiles.COMPRAS ||
    res.locals.profileId === UserProfiles.CAJA_PEDIDOS ||
    res.locals.profileId === UserProfiles.GESTOR_PARROQUIA) {
    return res.status(403).send({
      status: 'Forbidden',
    });
  }

  res.locals.findQuery = { relations: ["turn", "market"] };
  if (res.locals.profileId === UserProfiles.DIRECTOR_ECONOMATO) {
    res.locals.findQuery = {
      where: {
        marketId: res.locals.marketId,
      },
      relations: ["turn", "market"],
    }
  }

  next();
};

export default serviceGeneralPolicy;
