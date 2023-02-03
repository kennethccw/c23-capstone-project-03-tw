import { fetchJson } from "./utilsAPI";

const HELP_API_PATH = "http://localhost:8080/help";

export interface ClientChatroom {
  organisation: OrganisationChatroom;
  message: ChatroomMessage[];
}
export interface SupportChatroom {
  user: string;
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
export interface SupportPanel {
  user_id: number;
  username: string;
}

export const getOrganisationChatroom = async (oid: string) => {
  const data = await fetchJson<ClientChatroom>(`${HELP_API_PATH}/chatroom?oid=${oid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};
export const getSupportPanel = async () => {
  const data = await fetchJson<SupportPanel[]>(`${HELP_API_PATH}/panel`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};
export const getUserChatroom = async (uid: string) => {
  const data = await fetchJson<SupportChatroom>(`${HELP_API_PATH}/chatroom?uid=${uid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};
export const postTextChatroomClient = async (oid: string, conversation: string) => {
  console.log(oid);
  const data = await fetch(`${HELP_API_PATH}/chatroom/client/text`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ oid, conversation }),
  });
  return data;
};
export const postImageChatroomClient = async (formData: FormData) => {
  const data = await fetch(`${HELP_API_PATH}/chatroom/client/image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });
  return data;
};
export const postTextChatroomSupport = async (uid: string, conversation: string) => {
  const data = await fetch(`${HELP_API_PATH}/chatroom/support/text`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ uid, conversation }),
  });
  return data;
};
export const postImageChatroomSupport = async (formData: FormData) => {
  const data = await fetch(`${HELP_API_PATH}/chatroom/support/image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });
  return data;
};
