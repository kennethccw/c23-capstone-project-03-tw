export enum Gender {
  male,
  female,
  others,
}

export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
  mobile?: string;
  birthday?: Date;
  gender?: Gender;
  is_experienced?: boolean;
  photo?: string;
}

export interface Auth {
  id: number;
  username: string;
  password: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: Auth;
    }
  }
}

export interface Profile {
  username: string;
  email: string;
  mobile: string;
  birthday: Date;
  gender: Gender;
}

export interface HomeActivity {
  name: string;
  type: string;
  image: string;
  date: Date;
  start_time: Date;
  end_time: Date;
  place: number;
}

export interface OrganisationList {
  id: number;
  name: string;
  logo: string;
}

export interface OrganisationDetail {
  id: number;
  logo: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
}
export interface ActivityDetail {
  id: number;
  image: string;
  name: string;
  location: string;
  start_time: Date;
  end_time: Date;
  date: Date;
  requirement: string;
  description: string;
  place: number;
  organisation: string;
  district: District;
  mobile: string;
  email: string;
}

export enum District {
  kowloon = "kowloon",
  hong_kong_island = "hong_kong_island",
  new_territories = "new_territories",
}
