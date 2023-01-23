import { fetchJson } from "./utilsAPI";
const PROFILE_API_PATH = "http://localhost:8080/user/profile";

export interface Profile {
  username: string;
  email: string;
  mobile?: string;
  birthday?: Date;
  gender?: string;
}

export const getProfile = async () => {
  const data = fetchJson<Profile>(PROFILE_API_PATH, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

export const putProfile = async (profile: Profile) => {
  const res = fetch(PROFILE_API_PATH, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(profile),
  });
  return res;
};

export const changePassword = async (password: string) => {
  const res = fetch(`${PROFILE_API_PATH}/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ password }),
  });
  return res;
};
