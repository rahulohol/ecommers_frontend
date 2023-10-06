import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const API = axios.create({
  baseURL: `${baseUrl}`,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const createUser = (formData, config) =>
  API.post(`/auth/signup`, formData, config);

export function loginUser(loginInfo) {
  return API.post("/auth/login", loginInfo, {
    headers: { "Content-Type": "application/json" },
  });
}

export function checkAuth() {
  return API.get("/auth/check");
}

export function signOut(userId) {
  return API.get("/auth/logout");
}

export function resetPasswordRequest(email) {
  return API.post(
    "/auth/reset-password-request",
    { email },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
}

export function resetPassword(data) {
  return API.post("/auth/reset-password", data, {
    headers: { "Content-Type": "application/json" },
  });
}
