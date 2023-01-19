import { Request, Response } from 'express';
import { UserProfiles } from '../../../../utils/constants';

const turnParamPolicies = (req: Request, res: Response, next: Function) => {
  console.log('==> NoteParamsPolicy')

  res.locals.findQuery = {};
  if (res.locals.profileId === UserProfiles.COMPRAS) {
      return res.status(404).send({
        message: 'Note not found.'
      });
  }

  if (res.locals.profileId === UserProfiles.ADMINISTRADOR) {
    res.locals.findQuery = { id: req.params.id };
  }

  if (res.locals.profileId === UserProfiles.DIRECTOR_ECONOMATO ||
    res.locals.profileId === UserProfiles.GESTOR_PARROQUIA ||
    res.locals.profileId === UserProfiles.CAJA_PEDIDOS
  ) {
    res.locals.findQuery = {
      where: {
        id: req.params.id,
        beneficiary: { parish: { market: { id: res.locals.marketId } } }
      },
      relations: ['beneficiary', 'beneficiary.parish', 'beneficiary.parish.market']
    }
  }

  next();
};

export default turnParamPolicies;
