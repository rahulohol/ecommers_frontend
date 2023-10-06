// export function fetchLoggedInUserOrders() {
//   return new Promise(async (resolve) =>{
//     const response = await fetch('/orders/own/')
//     const data = await response.json()
//     resolve({data})
//   }
//   );
// }

// export function fetchLoggedInUser() {
//   return new Promise(async (resolve) =>{
//     const response = await fetch('/users/own')
//     const data = await response.json()
//     resolve({data})
//   }
//   );
// }

// export function updateUser(update) {
//   return new Promise(async (resolve) => {
//     const response = await fetch('/users/'+update.id, {
//       method: 'PATCH',
//       body: JSON.stringify(update),
//       headers: { 'content-type': 'application/json' },
//     });
//     const data = await response.json();
//     resolve({ data });
//   });
// }

// export function fetchLoggedInUserOrders() {
//   return new Promise(async (resolve) => {
//     const response = await fetch(`${baseUrl}/orders/own`);
//     const data = await response.json();
//     resolve({ data });
//   });
// }

// export function fetchLoggedInUser() {
//   return new Promise(async (resolve) => {
//     const response = await fetch(`${baseUrl}/users/own`);
//     const data = await response.json();
//     resolve({ data });
//   });
// }

// export function updateUser(update) {
//   return new Promise(async (resolve) => {
//     const response = await fetch(`${baseUrl}/users/${update.id}`, {
//       method: "PATCH",
//       body: JSON.stringify(update),
//       headers: { "content-type": "application/json" },
//     });
//     const data = await response.json();
//     resolve({ data });
//   });
// }

import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const API = axios.create({
  baseURL: `${baseUrl}`,
});

API.interceptors.request.use((config) => {
  if (localStorage.getItem("profile")) {
    config.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return config;
});

export function fetchLoggedInUserOrders() {
  return API.get("/orders/own").then((response) => ({ data: response.data }));
}

export function fetchLoggedInUser() {
  return API.get("/users/own").then((response) => ({ data: response.data }));
}

export function updateUser(update) {
  return API.patch(`/users/${update.id}`, update, {
    headers: { "Content-Type": "application/json" },
  }).then((response) => ({ data: response.data }));
}
