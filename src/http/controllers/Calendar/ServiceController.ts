import { Request, Response } from 'express';
import { Service } from '../../../entities/Service';
import { ServiceResource } from './ServiceResource';

export const ServiceIndex = async (request: Request, response: Response) => {
  const services = await Service.find({ ...response.locals.findQuery });
  const servicesResource = services.map(service => new ServiceResource(service));

  return response.status(200).json(servicesResource);
};
