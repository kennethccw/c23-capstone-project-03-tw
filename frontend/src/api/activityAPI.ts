import { Profile } from "./profileAPI";
import { fetchJson } from "./utilsAPI";

const ACTIVITY_API_PATH = "http://localhost:8080/activity";

export enum District {
  kowloon = "kowloon",
  hong_kong_island = "hong_kong_island",
  new_territories = "new_territories",
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
  total_place: number;
  remaining_place: number;
  organisation: string;
  district: District;
  mobile: string;
  email: string;
}

export const getActivityDetail = async (id: string) => {
  console.log("hihi");
  const data = await fetchJson<ActivityDetail>(`${ACTIVITY_API_PATH}/detail?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};
export const postActivityApplication = async (id: string, profile: Profile) => {
  console.log("hihi");
  const data = await fetch(`${ACTIVITY_API_PATH}/application?id=${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(profile),
  });
  return data;
};
