import { Request, Response } from 'express';

const turnParamPolicies = (req: Request, res: Response, next: Function) => {
  console.log('==> TurnParamsPolicy')

  // res.locals.findQuery = {};
  if (res.locals.profileId === 2) {
    if (res.locals.parishId !== parseInt(req.params.id)) {
      return res.status(403).send({
        message: 'Forbidden'
      });
    }
  }

  next();
};

export default turnParamPolicies;
