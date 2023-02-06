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
  image?: string;
  pet_name?: string;
  pet_image?: string;
  id?:number;
  created_at?: string;
}

export interface AdoptionResult {
  application_id: number;
  pet_id: number;
  name?: string;
  applicant_name?:string;
  image: string;
  status: AdoptionResultStatus;
  fail_reason: AdoptionResultFailReason;
  other_fail_reason: string;
  organisation_id?: number;
}

export enum AdoptionResultStatus {
  pending = "pending",
  success = "success",
  fail = "fail",
  cancelled = "cancelled",
}
export enum AdoptionResultFailReason {
  not_applicable = "not_applicable",
  age_under_21 = "age_under_21",
  no_window_screen = "no_window_screen",
  other = "other",
}
export enum AdoptionResultChineseStatus {
  pending = "處理中",
  success = "通過",
  fail = "不通過",
}
export enum AdoptionResultChineseFailReason {
  not_applicable = "不適用",
  age_under_21 = "未滿二十一歲",
  no_window_screen = "沒有裝窗網",
  other = "其他原因",
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
export const putPetAdoptionApplication = async (petId: number) => {
  const data = await fetch(`${ADOPTION_API_PATH}/application`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ petId }),
  });
  return data;
};
export const getPetAdoptionResult = async () => {
  const data = await fetchJson<AdoptionResult[]>(`${ADOPTION_API_PATH}/result`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};


export const getPetAdoptionResultByOrganisation = async (organisationID:number) => {
  const data = await fetchJson<AdoptionResult[]>(`${ADOPTION_API_PATH}/result/${organisationID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

export const approvalOfAdoption = async (applicationID: number) => {
  const data =await fetch(`${process.env.REACT_APP_BACKEND_URL}/adoption/approveAdoption`,
  {
    method: 'POST',
    headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify({applicationID}),
}) ;
  return data;
}


export const rejectOfAdoption = async (applicationID: number,rejectedReason:string,otherReason: string ) => {
  const data =await fetch(`${process.env.REACT_APP_BACKEND_URL}/adoption/rejectAdoption`,
  {
    method: 'POST',
    headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify({applicationID, rejectedReason, otherReason}),
}) ;
  return data;
}