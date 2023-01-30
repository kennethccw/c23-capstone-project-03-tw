import { fetchJson } from "./utilsAPI";

const ADOPTION_API_PATH = "http://localhost:8080/adoption";

export interface PetDetail {
  pet_id: number;
  organisation: string;
  image: string;
  name: string;
  age: string;
  weight: number;
  gender?: PetGender;
  breed: string;
  remark: string;
}

export enum PetGender {
  male = "male",
  female = "female",
}

export interface PetPreview {
  pet_id: number;
  image: string;
  name: string;
  age: number;
}

export interface AdoptionApplication {
  name: string;
  email: string;
  mobile: string;
  remark?: string;
  pet_id: number;
  user_id?: number;
}

export const getAllPetAdoption = async () => {
  const data = await fetchJson<PetPreview[]>(`${ADOPTION_API_PATH}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

export const getPetAdoptionById = async (id: string) => {
  const data = await fetchJson<PetDetail>(`${ADOPTION_API_PATH}/detail?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};
export const postPetAdoptionApplication = async (adoptionApplication: AdoptionApplication) => {
  const data = await fetch(`${ADOPTION_API_PATH}/application`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ adoptionApplication }),
  });
  return data;
};
