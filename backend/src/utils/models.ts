export enum Gender {
  male,
  female,
  others,
}

export interface User {
  id?: number;
  fullname?: string;
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
  fullname: string;
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
  activity_id: number;
  image: string;
  activity: string;
  location: string;
  start_time: Date;
  end_time: Date;
  date: Date;
  requirement: string;
  description: string;
  total_place: number;
  remaining_place: number;
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

export interface HomeAdvertiser {
  id: number;
  media: string;
  link: string;
}

export enum BadgeType {
  warmhearted = 1,
  advertising_philanthropist = 2,
  donation_philanthropist = 3,
}
export enum BadgeRank {
  gold = "gold",
  silver = "silver",
  copper = "copper",
}
export enum BadgeImage {
  gold = "goldbadge.png",
  silver = "silverbadge.png",
  copper = "cropperbadge.png",
}

export interface BadgeList {
  rank: BadgeRank;
  year: string;
  badge_id: BadgeType;
}

export interface AdvertiserWatchedTimes {
  total_advertising_watch_times: number;
  year: number;
}
export interface DonationAmount {
  total_donation: number;
  year: number;
}
export interface ActivityParticipatedTimes {
  total_activities_participated_times: number;
  year: number;
}

export interface ScheduleActivity {
  application_id: number;
  activity_id: number;
  image: string;
  organisation: string;
  activity: string;
  location: string;
  start_time: Date;
  end_time: Date;
  date: Date;
}

export enum LoginRole {
  organisation = "organisation",
  user = "user",
}
export interface PetDetail {
  image: string;
  name: string;
  age: number;
  weight: number;
  gender?: Gender;
  breed: string;
  illness_record: string;
}

export interface ActivityPreview {
  activity_id: number;
  image: string;
  organisation: string;
  activity: string;
  location: string;
  start_time: Date;
  end_time: Date;
  date: Date;
}

export interface Donation {
  receipt_name: string;
  receipt_email: string;
  receipt_mobile: string;
  payment_method: string;
  donation_amount: number;
  user_id: number;
}
