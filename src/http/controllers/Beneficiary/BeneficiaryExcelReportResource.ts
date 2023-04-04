import moment from 'moment';
import { isNull } from 'util';
import { Beneficiary } from '../../../entities/Beneficiary';

export class BeneficiaryExcelReportResource {
  Nombre: string;
  Apellidos: string;
  Ciudad: string;
  Direccion: string;
  Email: string;
  Telefono: number;
  Carnet: number;
  NIF: string;
  Adultos: number;
  Menores: number;
  UnidadFamiliar: number;
  Provincia: string;
  CodigoPostal: string;
  Nacionalidad: string;
  Nacimiento: string;
  MenoresDe18: number;
  MayoresDe18: number;
  SinTecho: string;
  Genero: string;
  Expira: string;
  Gratuidad: string;
  Sice: number;
  TipoFamilia: string;

  citizenType: string;
  civilStateType: string;
  employmentType: string;
  guardianshipType: string;
  educationType: string;
  authorizationType: string;
  turn: number;
  budget: string;
  parishName: string;
  marketName: string;

  constructor(beneficiary: Beneficiary, extraData: any) {
    this.Carnet = beneficiary.license;
    this.Nombre = beneficiary.firstname
    this.Apellidos = `${beneficiary.lastname1} ${beneficiary.lastname2} `
    this.NIF = beneficiary.cif;
    this.Adultos = isNull(beneficiary.adults) ? 0 : beneficiary.adults;
    this.Menores = isNull(beneficiary.minors) ? 0 : beneficiary.minors;
    this.UnidadFamiliar = beneficiary.family_unit;
    this.Telefono = beneficiary.phone;
    this.Email = beneficiary.email;
    this.Direccion = beneficiary.address;
    this.Ciudad = beneficiary.city;
    this.Provincia = beneficiary.state;
    this.CodigoPostal = beneficiary.zip;
    this.Nacionalidad = extraData.nationality
    this.Nacimiento = moment(beneficiary.birth_date).format('DD/MM/YYYY');
    this.MenoresDe18 = isNull(beneficiary.children_under_18) ? 0 : beneficiary.children_under_18;
    this.MayoresDe18 = isNull(beneficiary.children_over_18) ? 0 : beneficiary.children_over_18;
    this.SinTecho = beneficiary.homeless ? 'Sí' : 'No';
    this.Genero = beneficiary.gender;
    this.Expira = moment(beneficiary.expires).format('DD/MM/YYYY');
    this.Gratuidad = `${beneficiary.gratuitous || 0}%`;
    this.Sice = beneficiary.sice;

    this.budget = (beneficiary.parish?.market?.budget_base + ((beneficiary.adults - 1) * beneficiary.parish?.market?.budget_adult) + (beneficiary.minors * beneficiary.parish?.market?.budget_child)).toString() + ' €';

    this.TipoFamilia = extraData.family;
    this.citizenType = extraData.citizen;
    this.civilStateType = extraData.civilState;
    this.employmentType = extraData.employment;
    this.guardianshipType = extraData.guardianShip;
    this.educationType = extraData.education;
    this.authorizationType = extraData.authorization;
    this.parishName = beneficiary.parish?.name;
    this.marketName = beneficiary.parish?.market?.name;
    this.turn = extraData.turn;
  }
}
