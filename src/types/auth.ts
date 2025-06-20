export interface AuthState {
  username?: string
  type?: UserType
  language: Language
}

export enum UserType {
  ADMIN = 'ADMIN',
  SALESMAN = 'SALESMAN',
  L1_MANAGER = 'L1_MANAGER',
  L2_MANAGER = 'L2_MANAGER',
}

export enum Language {
  EN = 'EN',
  SR = 'SR',
}
