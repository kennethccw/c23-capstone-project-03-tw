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
  place: number;
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
