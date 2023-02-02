import { Profile } from "./profileAPI";
import { fetchJson } from "./utilsAPI";

const ACTIVITY_API_PATH = "http://localhost:8080/activity";

export enum District {
  kowloon = "kowloon",
  hong_kong_island = "hong_kong_island",
  new_territories = "new_territories",
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
export interface ActivityPreview {
  activity_id: number;
  image: string;
  organisation: string;
  activity: string;
  location: string;
  start_time: Date;
  end_time: Date;
  date: Date;
  district: string;
}

// const activityCategoryArr = ["editors_choice", "urgent", "popular"];

export const getActivityDetail = async (id: string) => {
  const data = await fetchJson<ActivityDetail>(`${ACTIVITY_API_PATH}/detail?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};
export const postActivityApplication = async (activityId: string, profile: Profile) => {
  const data = await fetch(`${ACTIVITY_API_PATH}/application`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ profile, activityId }),
  });
  return data;
};
export const putActivityApplication = async (activityId: string) => {
  const data = await fetch(`${ACTIVITY_API_PATH}/application`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ activityId }),
  });
  return data;
};

export const getActivitiesByCategory = async (category: string) => {
  const data = await fetchJson<ActivityPreview[]>(`${ACTIVITY_API_PATH}/category?type=${category}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};
export const getAllActivities = async () => {
  const data = await fetchJson<ActivityPreview[]>(`${ACTIVITY_API_PATH}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};
