import { Request, Response } from 'express';

const parishPolicies = (req: Request, res: Response, next: Function) => {
  const parishURL = '/api/v1/parish'
  const originalUrl = req.originalUrl;

  if (parishURL === originalUrl) {
    if (res.locals.profileId === 3 || res.locals.profileId === 4) {
      return res.status(403).send({
        status: 'Forbidden',
      });
    }
  }

  next();
};

export default parishPolicies;
