import { Request, Response } from 'express';
import { Beneficiary } from '../../../../entities/Beneficiary';
import { Parish } from '../../../../entities/Parish';

const orderParamPolicies = async (req: Request, res: Response, next: Function) => {
  // With this flag avoid to execute the policies twice. As we have similar route.
  if (res.locals.validated) {
    return next();
  }

  //  CHECK ALLOWED METHODS
  switch (req.method) {
    case 'GET':
      //  CHECK ALLOWED PROFILES
      readOrderParamsPolicy(req, res, next);
      //  SET ALLOWED QUERY PARAMETERS
      break;
    case 'PUT':
    case 'POST':
      //  CHECK ALLOWED PROFILES
      await writeOrderParamsPolicy(req, res, next);
    //  SET ALLOWED QUERY PARAMETERS
  }
};

const readOrderParamsPolicy = (req: Request, res: Response, next: Function) => {
  console.log('==> Read|Order|ParamsPolicy')

  next();
}

const writeOrderParamsPolicy = async (req: Request, res: Response, next: Function) => {
  console.log('==> Write|Order|ParamsPolicy')

  const beneficiary = await Beneficiary.findOne(req.body.beneficiaryId);

  if (!beneficiary || !req.body.beneficiaryId) {
    return res.status(404).json({ message: 'Beneficiary not found.' });
  }

  const parish = await Parish.findOne(beneficiary.parishId);

  if (!parish) {
    return res.status(404).json({ message: 'Parish not found.' });
  }

  if (parish.marketId !== res.locals.marketId) {
    return res.status(403).json({ message: 'Forbidden.' });
  }

  res.locals.parishId = parish.id;

  next();
}

export default orderParamPolicies;
