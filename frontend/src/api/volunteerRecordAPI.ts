import { fetchJson } from "./utilsAPI";

const VOLUNTEER_RECORD_API_PATH = "http://localhost:8080/record";

export interface ActivityRecord {
  activity_name: string;
  activity_date: Date;
  activity_start_time: Date;
  activity_end_time: Date;
}

export interface VolunteerRecord {
  onBoardDate: Date;
  approvedResult: ActivityRecord[];
  participatedResult: ActivityRecord[];
}

export const getVolunteerHistory = async () => {
  const data = await fetchJson<VolunteerRecord>(VOLUNTEER_RECORD_API_PATH, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};
