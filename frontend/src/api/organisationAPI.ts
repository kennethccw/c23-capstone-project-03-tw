import { fetchJson } from "./utilsAPI";

const ORGANISATION_API_PATH = "http://localhost:8080/organisation";

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
export const getOrganisationList = async () => {
  const data = await fetchJson<OrganisationList[]>(`${ORGANISATION_API_PATH}/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};
export const getOrganisationDetail = async (id: string) => {
  console.log("hihi");
  const data = await fetchJson<OrganisationDetail>(`${ORGANISATION_API_PATH}/detail?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};
