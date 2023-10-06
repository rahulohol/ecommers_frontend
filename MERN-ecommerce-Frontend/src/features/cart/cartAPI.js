import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export function addToCart(item) {
  return API.post("/cart", item, {
    headers: { "Content-Type": "application/json" },
  });
}

export function fetchItemsByUserId() {
  return API.get("/cart");
}

export function updateCart(update) {
  return API.patch(`/cart/${update.id}`, update, {
    headers: { "Content-Type": "application/json" },
  });
}

export function deleteItemFromCart(itemId) {
  return API.delete(`/cart/${itemId}`);
}

export function resetCart() {
  return fetchItemsByUserId().then((response) => {
    const items = response.data;
    const deletePromises = items.map((item) => deleteItemFromCart(item.id));
    return Promise.all(deletePromises).then(() => ({ status: "success" }));
  });
}
