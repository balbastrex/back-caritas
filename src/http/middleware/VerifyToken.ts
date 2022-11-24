import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: Function) => {
  console.log('==> VerifyTokenPolicy')
  const authHeader = req.get('Authorization');
  const authPrefix = authHeader && authHeader.split(' ')[0];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).send({
      status: 'Forbidden',
    });
  }

  if (authPrefix !== 'Bearer') {
    return res.status(403).send({
      message: 'Forbidden'
    });
  }

  verify(token, process.env.HASH_ENCRYPTION, function (error, decoded) {
    if (error) {
      return res.status(403).send({
        status: 'Forbidden',
      });
    }

    res.locals.email = decoded.email;
    res.locals.userId = decoded.id;
    res.locals.profileId = decoded.profileId;
    res.locals.marketId = decoded.marketId;
    res.locals.parishId = decoded.parishId;
  });

  next();
};

export default verifyToken;
