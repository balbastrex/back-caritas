import { Request, Response } from 'express';

const productGeneralPolicy = (req: Request, res: Response, next: Function) => {
  console.log('==> ProductGeneralPolicy')

  if (res.locals.profileId !== 1 && (res.locals.profileId === 5 || res.locals.marketId === null)) {
    return res.status(403).send({
      status: 'Forbidden',
    });
  }

  if (res.locals.profileId === 1) {
    res.locals.marketId = null;
  }

  next();
};

export default productGeneralPolicy;
