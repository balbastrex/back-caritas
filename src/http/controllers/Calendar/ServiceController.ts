import { Request, Response } from 'express';
import { Service } from '../../../entities/Service';
import { ServiceResource } from './ServiceResource';

export const ServiceIndex = async (request: Request, response: Response) => {
  const services = await Service.find({ ...response.locals.findQuery });
  const servicesResource = services.map(service => new ServiceResource(service));

  return response.status(200).json(servicesResource);
};

export const ServiceUpdate = async (request: Request, response: Response) => {
  const service = await Service.findOne(response.locals.findQuery);

  if (!service) {
    return response.status(404).json({ message: 'Service not found.' });
  }

  service.turnId = request.body.turnId;
  service.date = new Date(request.body.date);
  await service.save();

  return response.status(200).json({ id: service.id });
}

export const ServiceCreate = async (request: Request, response: Response) => {
  const service = new Service();

  service.marketId = response.locals.marketId;
  service.turnId = request.body.turnId;
  service.date = new Date(request.body.date);
  service.created = new Date();
  service.updated = new Date();
  await service.save();

  return response.status(200).json({ id: service.id });
}

export const ServiceDelete = async (request: Request, response: Response) => {
  const service = await Service.findOne(response.locals.findQuery);

  if (!service) {
    return response.status(404).json({ message: 'Service not found.' });
  }

  await service.remove();

  return response.status(200).json({ id: service.id });
}
