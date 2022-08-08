import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../../../entities/User';
import { UserResource } from './UserResource';

export const UserIndex = async (request: Request, response: Response) => {

  const userRepository = getRepository(User);

  const users: User[] = await userRepository.find();

  const usersResource = users.map(user => new UserResource(user));

  return response.status(200).json(usersResource);
}

export const Me = async (request: Request, response: Response) => {

  const user: User = await User.findByEmail(response.locals.email);

  if (!user) {
    return response.status(404).json({
      status: 'User not found',
    });
  }

  const userResource = new UserResource(user);

  return response.status(200).json({
    user: userResource
  });
}
