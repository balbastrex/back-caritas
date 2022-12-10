import { Request, Response } from 'express';
import { UserProfiles } from '../../../../utils/constants';

const beneficiaryGeneralPolicy = (req: Request, res: Response, next: Function) => {
  console.log('==> BeneficiaryGeneralPolicy')

  if (res.locals.profileId === UserProfiles.COMPRAS || res.locals.profileId === UserProfiles.CAJA_PEDIDOS) {
    return res.status(403).send({
      status: 'Forbidden',
    });
  }

  if (req.method === 'POST') {
    if (res.locals.profileId === UserProfiles.ADMINISTRADOR) {
      return res.status(403).send({
        status: 'Forbidden',
      });
    }
  }

  res.locals.findQuery = {};
  if (res.locals.profileId === UserProfiles.GESTOR_PARROQUIA) {
    res.locals.findQuery = {
      where: {
        parishId: res.locals.parishId,
      },
      relations: ["parish"],
    }
  }
  if (res.locals.profileId === UserProfiles.DIRECTOR_ECONOMATO) {
    res.locals.findQuery = {
      where: {
        parish: { marketId: res.locals.marketId },
      },
      relations: ["parish"],
    }
  }

  next();
};

export default beneficiaryGeneralPolicy;
