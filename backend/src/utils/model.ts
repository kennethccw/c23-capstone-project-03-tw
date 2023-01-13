export enum Gender {
  male,
  female,
  others,
}

export interface User {
  username: string;
  email: string;
  password?: string;
  mobile?: string;
  birthday?: Date;
  gender: Gender;
  is_experienced: boolean;
  photo?: string;
}

export interface Auth {
  id: number;
  username: string;
  password: string;
}
