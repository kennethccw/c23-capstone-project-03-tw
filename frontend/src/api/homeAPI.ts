import { fetchJson } from "./utilsAPI";
const HOME_API_PATH = "http://localhost:8080/home";

export interface Profile {
  username: string;
  email: string;
  mobile?: string;
  birthday?: Date;
  gender?: string;
}

export const getEditorChoice = async () => {
  const data = fetchJson<Profile>(`${HOME_API_PATH}/activity`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};
