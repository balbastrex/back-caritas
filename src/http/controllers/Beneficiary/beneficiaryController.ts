import { Request, Response } from 'express';
import moment from 'moment/moment';
import { Beneficiary } from '../../../entities/Beneficiary';
import { Note } from '../../../entities/Note';
import { Parish } from '../../../entities/Parish';
import { Turn } from '../../../entities/Turn';
import { BeneficiaryIdNameResource } from './BeneficiaryIdNameResource';
import { BeneficiaryLicenseResource } from './BeneficiaryLicenseResource';
import { BeneficiaryResource } from './BeneficiaryResource';
import { BeneficiaryTurnResource } from './BeneficiaryTurnResource';

export const BeneficiaryIndex = async (request: Request, response: Response) => {
  const beneficiaries = await Beneficiary.find({
    ...response.locals.findQuery,
    order: { license: 'ASC'},
    relations: ['parish', 'parish.market']
  });

  const BeneficiariesResources = beneficiaries.map(beneficiary => new BeneficiaryResource(beneficiary));

/*  const duplicated = await Beneficiary.createQueryBuilder('beneficiary')
    .select('beneficiary.license', 'License')
    .addSelect('COUNT(beneficiary.license)', 'repeated')
    .groupBy('beneficiary.license')
    .having('COUNT(beneficiary.license) > 1')
    .getRawMany();

  console.log(duplicated);*/

  return response.status(200).json(BeneficiariesResources);
};

export const BeneficiaryIndexIdName = async (request: Request, response: Response) => {
  const beneficiaries = await Beneficiary.find({
    ...response.locals.findQuery,
    relations: ['orders', 'parish', 'parish.market', 'notes']
  });

  const beneficiariesResources = beneficiaries.map(beneficiary => {
    const lastDateOrder = beneficiary.orders.length > 0 ? beneficiary.orders[beneficiary.orders.length - 1].created : new Date();
    return new BeneficiaryIdNameResource(beneficiary, lastDateOrder);
  });

  return response.status(200).json(beneficiariesResources);
}

export const BeneficiaryShow = async (request: Request, response: Response) => {
  const beneficiary: Beneficiary = await Beneficiary.findOne(response.locals.findQuery);
  console.log('show')
  if (!beneficiary) {
    return response.status(404).json({ message: 'Beneficiary not found.' });
  }

  const beneficiaryResource = new BeneficiaryResource(beneficiary);

  return response.status(200).json(beneficiaryResource);
};

export const BeneficiaryStore = async (request: Request, response: Response) => {
  const beneficiary: Beneficiary = await new Beneficiary();

  if (await isIdentifyDuplicated(request.body.cif)) {
    return response.status(404).json({ message: 'Este NIF/NIE ya existe.' });
  }

  /*if (!response.locals.parishId) {
    return response.status(404).json({ message: 'Parish not found.' });
  }*/

  beneficiary.firstname = request.body.name;
  beneficiary.lastname1 = request.body.lastname1;
  beneficiary.lastname2 = request.body.lastname2;
  beneficiary.license = request.body.license === 0 ? await licenseGenerator(response.locals.marketId) : request.body.license;
  beneficiary.cif = request.body.cif;
  beneficiary.adults = request.body.adults;
  beneficiary.minors = request.body.minors;
  beneficiary.family_unit = parseInt(request.body.adults) + parseInt(request.body.minors);
  beneficiary.phone = request.body.phone;
  beneficiary.email = request.body.email;
  beneficiary.address = request.body.address;
  beneficiary.city = request.body.city;
  beneficiary.state = request.body.state;
  beneficiary.zip = request.body.zip;
  beneficiary.free = request.body.free;
  beneficiary.nationalityId = request.body.nationalityId === "" ? null : request.body.nationalityId;
  beneficiary.birth_date = new Date(request.body.birthDate);
  beneficiary.sice = request.body.sice;
  beneficiary.gender = request.body.gender;
  beneficiary.gratuitous = request.body.gratuitous;
  beneficiary.expires = new Date(request.body.expires);
  beneficiary.homeless = request.body.homeless;
  beneficiary.children_under_18 = request.body.childrenUnder18;
  beneficiary.children_over_18 = request.body.childrenOver18;
  beneficiary.needs_print = true;

  beneficiary.parishId = request.body.parishId;
  beneficiary.turnId = request.body.turnId;
  beneficiary.familyTypeId = request.body.familyTypeId === "" ? null : request.body.familyTypeId;
  beneficiary.citizenTypeId = request.body.citizenTypeId === "" ? null : request.body.citizenTypeId;
  beneficiary.civilStateTypeId = request.body.civilStateTypeId === "" ? null : request.body.civilStateTypeId;
  beneficiary.employmentTypeId = request.body.employmentTypeId === "" ? null : request.body.employmentTypeId;
  beneficiary.guardianshipTypeId = request.body.guardianshipTypeId === "" ? null : request.body.guardianshipTypeId;
  beneficiary.educationTypeId = request.body.educationTypeId === "" ? null : request.body.educationTypeId;
  beneficiary.authorizationTypeId = request.body.authorizationTypeId === "" ? null : request.body.authorizationTypeId;
  await beneficiary.save();

  return response.status(200).json({ id: beneficiary.id });
}

export const BeneficiaryUpdate = async (request: Request, response: Response) => {
  const beneficiary: Beneficiary = await Beneficiary.findOne(response.locals.findQuery);

  if (!beneficiary) {
    return response.status(404).json({ message: 'Beneficiary not found.' });
  }

  const parish = await Parish.findOne(request.body.parishId);

  beneficiary.firstname = request.body.name;
  beneficiary.lastname1 = request.body.lastname1;
  beneficiary.lastname2 = request.body.lastname2;
  beneficiary.license = request.body.license === 0 ? await licenseGenerator(response.locals.marketId) : request.body.license;
  beneficiary.cif = request.body.cif;
  beneficiary.adults = request.body.adults;
  beneficiary.minors = request.body.minors;
  beneficiary.family_unit = parseInt(request.body.adults) + parseInt(request.body.minors);
  beneficiary.phone = request.body.phone;
  beneficiary.email = request.body.email;
  beneficiary.address = request.body.address;
  beneficiary.city = request.body.city;
  beneficiary.state = request.body.state;
  beneficiary.zip = request.body.zip;
  beneficiary.free = request.body.free;
  beneficiary.nationalityId = request.body.nationalityId === "" ? null : request.body.nationalityId;
  beneficiary.birth_date = new Date(request.body.birthDate);
  beneficiary.sice = request.body.sice;
  beneficiary.gender = request.body.gender;
  beneficiary.gratuitous = request.body.gratuitous;
  beneficiary.homeless = request.body.homeless;
  beneficiary.children_under_18 = request.body.childrenUnder18;
  beneficiary.children_over_18 = request.body.childrenOver18;

  const expireDate = moment(request.body.expires).format('yyyy-MM-DD')
  const beneficiaryExpires = moment(beneficiary.expires).format('yyyy-MM-DD')
  if (expireDate !== beneficiaryExpires) {
    beneficiary.needs_print = true;
  }

  beneficiary.expires = new Date(request.body.expires);


  beneficiary.parish = parish;
  beneficiary.turnId = request.body.turnId;
  beneficiary.familyTypeId = request.body.familyTypeId === "" ? null : request.body.familyTypeId;
  beneficiary.citizenTypeId = request.body.citizenTypeId === "" ? null : request.body.citizenTypeId;
  beneficiary.civilStateTypeId = request.body.civilStateTypeId === "" ? null : request.body.civilStateTypeId;
  beneficiary.employmentTypeId = request.body.employmentTypeId === "" ? null : request.body.employmentTypeId;
  beneficiary.guardianshipTypeId = request.body.guardianshipTypeId === "" ? null : request.body.guardianshipTypeId;
  beneficiary.educationTypeId = request.body.educationTypeId === "" ? null : request.body.educationTypeId;
  beneficiary.authorizationTypeId = request.body.authorizationTypeId === "" ? null : request.body.authorizationTypeId;
  await beneficiary.save();

  return response.status(200).json({ id: beneficiary.id });
}

export const BeneficiaryByTurn = async (request: Request, response: Response) => {
  const turn = await Turn.createQueryBuilder('turn')
    .where('turn.id = :id', { id: response.locals.findQuery.id })
    .andWhere('turn.marketId = :marketId', { marketId: response.locals.findQuery.marketId })
    .leftJoinAndSelect('turn.beneficiaries', 'beneficiary')
    .leftJoinAndSelect('beneficiary.parish', 'parish')
    .leftJoinAndSelect('beneficiary.orders', 'orders')
    .orderBy('beneficiary.license', 'ASC')
    .getOne();

  if (!turn) {
    return response.status(404).json({ message: 'Turn not found.' });
  }

  const BeneficiariesResources = turn.beneficiaries.filter(beneficiary => beneficiary.expires > new Date()).map(beneficiary => {
    let lastDateOrder = undefined;

    if (beneficiary.orders.length > 0) {
      const orders = beneficiary.orders.sort((a, b) => {
        if (a.created > b.created) {
          return 1;
        }
        if (a.created < b.created) {
          return -1;
        }
        return 0;
      });

      lastDateOrder = orders[orders.length - 1].created
    }

    return new BeneficiaryTurnResource(beneficiary, lastDateOrder);
  });

  return response.status(200).json(BeneficiariesResources);
}

export const IndexBeneficiaryNotes = async (request: Request, response: Response) => {
  const beneficiary: Beneficiary = await Beneficiary.findOne(response.locals.findQuery);

  if (!beneficiary) {
    return response.status(404).json({ message: 'Beneficiary not found.' });
  }

  const notes = await Note.find({ where: { beneficiaryId: beneficiary.id } });

  return response.status(200).json({ notes, beneficiaryName: beneficiary.firstname + ' ' + beneficiary.lastname1 });
}

const isIdentifyDuplicated = (cif) => {
  return Beneficiary.findOne({ where: { cif: cif } });
}

export const BeneficiariesNeedsPrint = async (request: Request, response: Response) => {
  const beneficiaries = await Beneficiary.find({ ...response.locals.findQuery });
  const beneficiariesLicenseResources = beneficiaries.map(beneficiary => new BeneficiaryLicenseResource(beneficiary));

  return response.status(200).json(beneficiariesLicenseResources);
}

export const setBeneficiariesPrinted = async (request: Request, response: Response) => {
  const beneficiaries = await Beneficiary.find({ ...response.locals.findQuery });
  for (const beneficiary of beneficiaries) {
    beneficiary.needs_print = false;
    await beneficiary.save();
  }

  return response.status(200).json({ message: 'Beneficiaries updated.' });
}

const licenseGenerator = async (marketId) => {

  const lastBeneficiary = await Beneficiary.createQueryBuilder('beneficiary')
    .leftJoin('beneficiary.parish', 'parish')
    .where('parish.marketId = :marketId', { marketId: marketId })
    .orderBy('beneficiary.license', 'DESC')
    .getOne();

  if (lastBeneficiary) {
    console.log('license', lastBeneficiary.license);
    return lastBeneficiary.license + 1;
  }
  console.log('license', 1);
  return 1;
}
