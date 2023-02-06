import { HomeActivity } from "../redux/home";
import { fetchJson } from "./utilsAPI";
const HOME_API_PATH = `${process.env.REACT_APP_BACKEND_URL}/home`;

export interface HomeAdvertiser {
  id: number;
  media: string;
  link: string;
}
export interface HomeNotification {
  id: number;
  type: NotificationType;
  content: string;
  any_id?: number;
  count?: number;
}

export enum NotificationType {
  badge = "badge",
  message = "message",
  activity = "activity",
  adoption = "adoption",
}

export const getHomeActivities = async () => {
  const data = await fetchJson<HomeActivity[]>(`${HOME_API_PATH}/activity`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};
export const getHomeNotification = async () => {
  const data = await fetchJson<HomeNotification[]>(`${HOME_API_PATH}/notification`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};
export const getHomeAdvertisers = async () => {
  const data = await fetchJson<HomeAdvertiser[]>(`${HOME_API_PATH}/advertiser`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

export const postHomeAdvertiser = async (adsId: number) => {
  const resp = await fetch(`${HOME_API_PATH}/advertiser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ adsId }),
  });
  return resp;
};
export const delHomeAdvertiser = async (notificationId: number) => {
  const resp = await fetch(`${HOME_API_PATH}/notification`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ notificationId }),
  });
  return resp;
};
