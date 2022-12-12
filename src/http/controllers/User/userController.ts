import { Request, Response } from 'express';
import { Market } from '../../../entities/Market';
import { Parish } from '../../../entities/Parish';
import { Role } from '../../../entities/Role';
import { User } from '../../../entities/User';
import { ParishMarketSelectorResource } from './ParishMarketSelectorResource';
import { RoleResource } from './RoleResource';
import { UserResource } from './UserResource';
// import * as bcrypt from 'bcrypt';

export const UserIndex = async (request: Request, response: Response) => {
  const users: User[] = await User.find({ ...response.locals.findQuery });

  const usersResource = users.map(user => new UserResource(user));

  return response.status(200).json(usersResource);
}

export const UserShow = async (request: Request, response: Response) => {
  const user: User = await User.findOne({ ...response.locals.findQuery });

  const userResource = new UserResource(user);

  return response.status(200).json(userResource);
}

export const UserRolesIndex = async (request: Request, response: Response) => {
  const roles: Role[] = await Role.find();

  const roleResources = roles.map(role => new RoleResource(role));

  return response.status(200).json(roleResources);
}

export const ParishesMarketSelector = async (request: Request, response: Response) => {
  const marketId = response.locals.marketId;
  const market: Market = await Market.findOne(marketId);

  if (!market) {
    return response.status(404).json({ message: 'Market not found.' });
  }

  const parishes = await Parish.createQueryBuilder('church')
    .where('church.id_economato = :marketId', { marketId })
    .orderBy({
      'church.id': 'ASC'
    })
    .getMany();

  const parishesResponse: ParishMarketSelectorResource[] = parishes.map(parish => new ParishMarketSelectorResource(parish));

  return response.status(200).json(parishesResponse);
}

export const UserStore = async (request: Request, response: Response) => {
  const marketId = response.locals.marketId;

  if (!marketId) {
    return response.status(404).json({ message: 'No tienes autorización para crear un Usuario.' });
  }

  const regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if (!regularExpression.test(request.body.password)) {
    return response.status(400).json({ message: 'La contraseña debe contener un mínimo de 8 caracteres, al menos un número, una letra mayúscula, una minúscula y un caracter especial.' });
  }

  const user = new User();
  user.marketId = marketId;
  user.password = request.body.password;

  await fillAndSaveUser(user, request);

  return response.status(200).json({ id: user.id });
};

export const UserUpdate = async (request: Request, response: Response) => {
  const marketId = response.locals.marketId;

  if (!marketId) {
    return response.status(404).json({ message: 'No tienes autorización para modificar un Usuario.' });
  }

  const user = await User.findOne(request.params.id);

  if (request.body.password && request.body.password.length > 0) {
    const regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!regularExpression.test(request.body.password)) {
      return response.status(400).json({ message: 'La contraseña debe contener un mínimo de 8 caracteres, al menos un número, una letra mayúscula, una minúscula y un caracter especial.' });
    }
    user.password = request.body.password;
  }

  user.marketId = marketId;

  await fillAndSaveUser(user, request);

  return response.status(200).json({ id: user.id });
};

async function fillAndSaveUser(user: User, request: Request) {
  user.name = request.body.name;
  user.userName = 'user';
  user.lastName = request.body.lastName;
  user.phone = request.body.phone;
  user.email = request.body.email;
  user.parishId = request.body.parishId;
  user.isActive = request.body.isActive;
  user.profileId = request.body.profileId;
  await user.save();
}
