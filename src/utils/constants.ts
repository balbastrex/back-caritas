
export enum DistributionTypes {
  DIAS = 'dias',
  PRESUPUESTO = 'presupuesto'
}

export enum UserProfiles {
  ADMINISTRADOR = 1,
  DIRECTOR_ECONOMATO = 2,
  COMPRAS = 3,
  CAJA_PEDIDOS = 4,
  GESTOR_PARROQUIA = 5
}

export const MarketColors = {
  1: '#f30606',
  2: '#1544e0',
  3: '#4ea42c',
  4: '#6b1dcc',
  5: '#f5dc15',
  6: '#50c9a4',
}

export enum OrderStatuses {
  ABIERTO = 'Abierto',
  CERRADO = 'Cerrado',
  CANCELADO = 'Cancelado',
  // PENDIENTE = 'Pendiente',
  PAGADO = 'Pagado',
}
