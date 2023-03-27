import { Request, Response } from 'express';
import { UserProfiles } from '../../../../utils/constants';

const orderProductReportGeneralPolicy = (req: Request, res: Response, next: Function) => {
  console.log('==> OrderProductReportGeneralPolicy')

  if (res.locals.profileId !== UserProfiles.DIRECTOR_ECONOMATO) {
    return res.status(403).send({
      status: 'Forbidden',
    });
  }

  res.locals.findQuery = {
    marketId: res.locals.marketId,
  };

  next();
};

export default orderProductReportGeneralPolicy;
