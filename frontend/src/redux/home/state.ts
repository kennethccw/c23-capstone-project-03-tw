export interface ActivityState {
  loading: boolean;
  activity?: HomeActivity[];
  message?: string;
}
export type JWTPayload = {
  id: number;
  username: string;
};

export interface HomeActivity {
  id: number;
  name: string;
  type: string;
  image: string;
  date: Date;
  start_time: Date;
  end_time: Date;
  place: number;
}
