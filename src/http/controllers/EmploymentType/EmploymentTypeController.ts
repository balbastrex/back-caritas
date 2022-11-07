import { Request, Response } from 'express';
import { EmploymentType } from '../../../entities/EmploymentType';
import { EmploymentTypeResource } from './EmploymentTypeResource';

export const EmploymentTypeIndex = async (request: Request, response: Response) => {
  const employmentType = await EmploymentType.find();

  const employmentTypeResources = employmentType.map(employmentType => new EmploymentTypeResource(employmentType));

  return response.status(200).json(employmentTypeResources);
};
