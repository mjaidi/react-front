import { authStorage } from "./localStorage";

export const BASE_URL = "http://localhost:3000";
export const BASE_API_URL = "http://localhost:3000/api/v1";
export const AUTH_HEADERS = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: authStorage.getToken()
  }
};
