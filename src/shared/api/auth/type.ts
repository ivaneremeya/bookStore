const Endpoints = {
  AUTH: {
    LOGIN: "/api/token/",
    REFRESH: "/api/token/refresh/",
    PROFILE: "/profile/api/token/verify",
  },
};

export default Endpoints;

export interface ILoginRequest {
  login: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
}
