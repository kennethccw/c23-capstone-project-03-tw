import { fetchJson } from "./utilsAPI";

export interface ScheduleActivity {
  application_id: number;
  activity_id: number;
  image: string;
  organisation: string;
  activity: string;
  location: string;
  start_time: Date;
  end_time: Date;
  date: Date;
  user_id?: number;
  user_fullname?: string;
}
const ACTIVITY_APPROVAL_API_PATH = process.env.REACT_APP_NODE_ENV === "production" ? `${process.env.REACT_APP_BACKEND_URL}/activity/approval` : `${"http://localhost:8080"}/activity/approval`;

export const getPendingApplication = async () => {
  console.log("getPendingApplication");
  const data = await fetchJson<ScheduleActivity[]>(`${ACTIVITY_APPROVAL_API_PATH}/pending`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

export const getApprovedApplication = async () => {
  console.log("getApprovedApplication");
  const data = await fetchJson<ScheduleActivity[]>(`${ACTIVITY_APPROVAL_API_PATH}/alreadyApproved`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};
export const putPendingApplication = async (
  application: {
    fullname: string;
    user_id: number;
    activity_id: number;
    is_approved: boolean;
    is_rejected: boolean;
  }[]
) => {
  console.log("postPendingApplication");
  const data = await fetch(`${ACTIVITY_APPROVAL_API_PATH}/pending`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ application }),
  });
  return data;
};
