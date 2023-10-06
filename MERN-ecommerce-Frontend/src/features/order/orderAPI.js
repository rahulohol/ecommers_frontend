// export function createOrder(order) {
//   return new Promise(async (resolve) => {
//     const response = await fetch('/orders', {
//       method: 'POST',
//       body: JSON.stringify(order),
//       headers: { 'content-type': 'application/json' },
//     });
//     const data = await response.json();
//     resolve({ data });
//   });
// }

// export function updateOrder(order) {
//   return new Promise(async (resolve) => {
//     const response = await fetch('/orders/'+order.id, {
//       method: 'PATCH',
//       body: JSON.stringify(order),
//       headers: { 'content-type': 'application/json' },
//     });
//     const data = await response.json();
//     resolve({ data });
//   });
// }

// export function fetchAllOrders(sort, pagination) {
//  let queryString = '';

//  for (let key in sort) {
//   queryString += `${key}=${sort[key]}&`;
// }
//   for (let key in pagination) {
//     queryString += `${key}=${pagination[key]}&`;
//   }

//   return new Promise(async (resolve) => {
//     const response = await fetch(
//       '/orders?' + queryString
//     );
//     const data = await response.json();
//     const totalOrders = await response.headers.get('X-Total-Count');
//     resolve({ data: { orders: data, totalOrders: +totalOrders } });
//   });
// }

// const baseUrl = process.env.REACT_APP_BACKEND_URL;

// export function createOrder(order) {
//   return new Promise(async (resolve) => {
//     const response = await fetch(`${baseUrl}/orders`, {
//       method: "POST",
//       body: JSON.stringify(order),
//       headers: { "content-type": "application/json" },
//     });
//     const data = await response.json();
//     resolve({ data });
//   });
// }

// export function updateOrder(order) {
//   return new Promise(async (resolve) => {
//     const response = await fetch(`${baseUrl}/orders/${order.id}`, {
//       method: "PATCH",
//       body: JSON.stringify(order),
//       headers: { "content-type": "application/json" },
//     });
//     const data = await response.json();
//     resolve({ data });
//   });
// }

// export function fetchAllOrders(sort, pagination) {
//   let queryString = "";

//   for (let key in sort) {
//     queryString += `${key}=${sort[key]}&`;
//   }
//   for (let key in pagination) {
//     queryString += `${key}=${pagination[key]}&`;
//   }

//   return new Promise(async (resolve) => {
//     const response = await fetch(`${baseUrl}/orders?${queryString}`);
//     const data = await response.json();
//     const totalOrders = await response.headers.get("X-Total-Count");
//     resolve({ data: { orders: data, totalOrders: +totalOrders } });
//   });
// }

import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

API.interceptors.request.use((config) => {
  if (localStorage.getItem("profile")) {
    config.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return config;
});

export function createOrder(order) {
  return API.post("/orders", order, {
    headers: { "Content-Type": "application/json" },
  }).then((response) => ({ data: response.data }));
}

export function updateOrder(order) {
  return API.patch(`/orders/${order.id}`, order, {
    headers: { "Content-Type": "application/json" },
  }).then((response) => ({ data: response.data }));
}

export function fetchAllOrders(sort, pagination) {
  const params = { ...sort, ...pagination };
  return API.get("/orders", { params }).then((response) => {
    const data = response.data;
    const totalOrders = response.headers["x-total-count"];
    return { data: { orders: data, totalOrders: +totalOrders } };
  });
}
