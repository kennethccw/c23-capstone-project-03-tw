import { fetchJson } from "./utilsAPI";

const HELP_API_PATH = "http://localhost:8080/help";

export interface Chatroom {
  organisation: OrganisationChatroom;
  message: ChatroomMessage[];
}
export interface OrganisationChatroom {
  name: string;
  logo: string;
}

export interface ChatroomMessage {
  id?: number;
  conversation?: string;
  image?: string;
  role: string;
  created_at?: Date;
}

export const getOrganisationChatroom = async (id: string) => {
  const data = await fetchJson<Chatroom>(`${HELP_API_PATH}/chatroom?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};
export const postTextChatroom = async (id: string, conversation: string) => {
  const data = await fetch(`${HELP_API_PATH}/chatroom/text`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ id, conversation }),
  });
  return data;
};
export const postImageChatroom = async (formData: FormData) => {
  const data = await fetch(`${HELP_API_PATH}/chatroom/image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });
  return data;
};
