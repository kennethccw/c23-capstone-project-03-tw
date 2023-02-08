import { fetchJson } from "./utilsAPI";

const ORGANISATION_API_PATH = process.env.REACT_APP_NODE_ENV === "production" ? `${process.env.REACT_APP_BACKEND_URL}/organisation` : `${"http://localhost:8080"}/organisation`;

export interface OrganisationList {
  id: number;
  name: string;
  logo: string;
  district_org: string;
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
