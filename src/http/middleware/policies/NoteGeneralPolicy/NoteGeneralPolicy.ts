import { Request, Response } from 'express';
import { UserProfiles } from '../../../../utils/constants';

const noteGeneralPolicy = (req: Request, res: Response, next: Function) => {
  console.log('==> NoteGeneralPolicy')

  if (res.locals.profileId === UserProfiles.COMPRAS) {
    return res.status(403).send({
      status: 'Forbidden',
    });
  }

  if ((res.locals.profileId === UserProfiles.CAJA_PEDIDOS) && (req.method === 'POST')) {
    return res.status(403).send({
      status: 'Forbidden',
    });
  }

  next();
};

export default noteGeneralPolicy;
