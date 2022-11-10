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
