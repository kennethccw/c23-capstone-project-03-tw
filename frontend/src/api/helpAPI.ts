import { fetchJson } from "./utilsAPI";

const HELP_API_PATH = "http://localhost:8080/help";

export interface OrganisationChatroom {
  name: string;
  logo: string;
}

export const getOrganisationChatroom = async (id: string) => {
  const data = await fetchJson<OrganisationChatroom>(`${HELP_API_PATH}/chatroom?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};
