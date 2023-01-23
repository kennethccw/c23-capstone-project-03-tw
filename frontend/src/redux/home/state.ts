export interface AuthState {
  loading: boolean;
  isAuth: boolean;
  user?: JWTPayload;
  message?: string;
}
export type JWTPayload = {
  id: number;
  username: string;
};
