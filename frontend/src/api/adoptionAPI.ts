import { fetchJson } from "./utilsAPI";

const ADOPTION_API_PATH = "http://localhost:8080/adoption";

export interface PetDetail {
  image: string;
  name: string;
  age: number;
  weight: number;
  gender?: any;
  breed: string;
  illness_record: string;
}

export const getPetAdoption = async (id: string) => {
  const data = await fetchJson<PetDetail>(`${ADOPTION_API_PATH}/detail?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};
