import { Request, Response } from 'express';
import { AuthorizationType } from '../../../entities/AuthorizationType';
import { AuthorizationTypeResource } from './AuthorizationTypeResource';

export const AuthorizationTypeIndex = async (request: Request, response: Response) => {
  const authorizationType = await AuthorizationType.find();

  const authorizationTypeResources = authorizationType.map(authorizationType => new AuthorizationTypeResource(authorizationType));

  return response.status(200).json(authorizationTypeResources);
};
