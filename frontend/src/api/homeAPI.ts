import { HomeActivity } from "../redux/home";
import { fetchJson } from "./utilsAPI";
const HOME_API_PATH = "http://localhost:8080/home";

export interface HomeAdvertiser {
  id: number;
  media: string;
  link: string;
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
