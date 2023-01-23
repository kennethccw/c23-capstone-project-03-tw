import { HomeActivity } from "../redux/home";
import { fetchJson } from "./utilsAPI";
const HOME_API_PATH = "http://localhost:8080/home";

export interface HomeOrganisation {
  id: number;
  name: string;
  logo: string;
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

export const getHomeOrganisation = async () => {
  const data = await fetchJson<HomeOrganisation[]>(`${HOME_API_PATH}/organisation`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};
