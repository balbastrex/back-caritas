import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../../../entities/User';
import * as bcrypt from 'bcrypt';
import logger from 'npmlog';
require('dotenv').config()

const Login = async (request: Request, response: Response) => {
  const { body } = request;
  const { email, password } = body;

  // const hash = bcrypt.hashSync(password, 8);
  // console.log("Hassed password, ", hash)

  if (email && password) {
    const userRepository = getRepository(User, "default");
    const user = await userRepository.findOne({ where: { email: email, isActive: true } });

    if (!user)
    {
      return response.status(403).json({
        status: 'Forbidden',
      });
    }

    return bcrypt.compare(password, user.password, function (err: Error, result: boolean) {

      if (result) {
        const jwtToken = sign({
          id: user.id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          profileId: user.profileId,
          marketId: user.marketId,
          parishId: user.parishId,
        },
          process.env.HASH_ENCRYPTION,
          { expiresIn: '8h' })

        logger.info('Login', `${user.name} logged successfully`);
        return response.status(200).json({
          status: 'Logged in successfully',
          token: jwtToken,
        });
      }
      if (err || !result) {
        logger.error('Login', `login failed for ${email}`);
        return response.status(403).json({
          status: 'Forbidden',
        });
      }
    });
  } else {
    logger.warn('Login', 'email or password not provided');
    return response.status(403).json({
      status: 'Forbidden',
    });
  }
}

export default Login;
