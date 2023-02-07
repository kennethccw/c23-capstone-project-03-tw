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
// const ACTIVITY_APPROVAL_API_PATH = `${process.env.REACT_APP_BACKEND_URL}/activity/approval`;
const ACTIVITY_APPROVAL_API_PATH = `${"http://localhost:8080"}/activity/approval`;

export const getPendingApplication = async () => {
  console.log("getPendingApplication");
  const data = await fetchJson<ScheduleActivity[]>(`${ACTIVITY_APPROVAL_API_PATH}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};
