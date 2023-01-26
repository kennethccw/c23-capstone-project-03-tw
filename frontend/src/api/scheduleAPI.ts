import { fetchJson } from "../api/utilsAPI";

const SCHEDULE_API_PATH = "http://localhost:8080/schedule";

export interface ScheduleActivity {
  application_id: number;
  image: string;
  organisation: string;
  name: string;
  location: string;
  start_time: Date;
  end_time: Date;
  date: Date;
}
export interface Schedule {
  confirmed: ScheduleActivity[];
  pending: ScheduleActivity[];
}

export const getScheduleActivities = async () => {
  const data = await fetchJson<Schedule>(`${SCHEDULE_API_PATH}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};
