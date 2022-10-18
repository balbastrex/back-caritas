import { Request, Response } from 'express';
import { EducationType } from '../../../entities/EducationType';
import { EducationTypeResource } from './EducationTypeResource';

export const EducationTypeIndex = async (request: Request, response: Response) => {
  const educationType = await EducationType.find();

  const educationTypeResources = educationType.map(educationType => new EducationTypeResource(educationType));

  return response.status(200).json(educationTypeResources);
};
