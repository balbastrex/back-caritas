import { Request, Response } from 'express';
import { UserProfiles } from '../../../../utils/constants';

const beneficiaryGeneralPolicy = (req: Request, res: Response, next: Function) => {
  console.log('==> BeneficiaryGeneralPolicy')

  if (res.locals.profileId === UserProfiles.COMPRAS || res.locals.profileId === UserProfiles.CAJA_PEDIDOS) {
    return res.status(403).send({
      status: 'Forbidden',
    });
  }

  res.locals.findQuery = {};
  if (res.locals.profileId === 5) {
    res.locals.findQuery = { parishId: res.locals.parishId };
  }
  if (res.locals.profileId === 2) {
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
