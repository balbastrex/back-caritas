import { Request, Response } from 'express';
import { UserProfiles } from '../../../utils/constants';

const turnParamPolicies = (req: Request, res: Response, next: Function) => {
  console.log('==> TurnParamsPolicy')

  res.locals.findQuery = {};
  if (res.locals.profileId === UserProfiles.COMPRAS ||
    res.locals.profileId === UserProfiles.CAJA_PEDIDOS ||
    res.locals.profileId === UserProfiles.GESTOR_PARROQUIA) {
      return res.status(404).send({
        message: 'Turn not found.'
      });
  }
  if (res.locals.profileId === UserProfiles.ADMINISTRADOR) {
    res.locals.findQuery = { id: req.params.id };
  }

  if (res.locals.profileId === UserProfiles.DIRECTOR_ECONOMATO) {
    res.locals.findQuery = {
      id: req.params.id,
      marketId: res.locals.marketId
    }
  }

  next();
};

export default turnParamPolicies;
