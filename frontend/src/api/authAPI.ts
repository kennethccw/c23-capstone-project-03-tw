import { fetchJson } from "./utilsAPI";

// const AUTH_API_PATH = `${process.env.REACT_APP_BACKEND_URL}/user`;
const AUTH_API_PATH = `${"http://localhost:8080"}/user`;

export interface UserLoginInfo {
  userIdentity: string;
  password: string;
}

export const login = async ({ userIdentity, password }: UserLoginInfo) => {
  const data = await fetchJson<{ token: string }>(`${AUTH_API_PATH}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userIdentity, password }),
  });
  return data;
};

export const facebookLogin = async (code: string) => {
  const data = await fetchJson<{ token: string }>(`${AUTH_API_PATH}/login/facebook`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });
  return data;
};
export const validateToken = async (token: string | null) => {
  const data = await fetchJson<{ token: string }>(`${AUTH_API_PATH}/login/validation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ token }),
  });
  return data;
};
export const googleLogin = async () => {
  const data = await fetchJson<{ token: string }>(`${AUTH_API_PATH}/login/google`);
  return data;
};

export const registerUser = async (newUser: { username: string; email: string; password: string }) => {
  const result = await fetch(`${AUTH_API_PATH}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  return result;
};
