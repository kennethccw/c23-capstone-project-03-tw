import { fetchJson } from "./utilsAPI";

const BADGE_API_PATH = `${process.env.REACT_APP_BACKEND_URL}/badge`;
// const BADGE_API_PATH = `${"http://localhost:8080"}/badge`;

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

export interface BadgePage {
  badges: BadgeList[];
  advertiserWatchedTimes: AdvertiserWatchedTimes;
  donationAmount: DonationAmount;
  activityParticipatedTimes: ActivityParticipatedTimes;
}

export const getBadges = async () => {
  console.log("hihi");
  const data = await fetchJson<BadgePage>(BADGE_API_PATH, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};
