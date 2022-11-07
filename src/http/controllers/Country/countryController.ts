import { Request, Response } from 'express';
import { Country } from '../../../entities/Country';
import { CountryResource } from './CountryResource';

export const CountryIndex = async (request: Request, response: Response) => {
  const countries = await Country.find();

  const countryResources = countries.map(country => new CountryResource(country));

  return response.status(200).json(countryResources);
};
