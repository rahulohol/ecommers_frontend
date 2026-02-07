// // export function fetchLoggedInUserOrders() {
// //   return new Promise(async (resolve) =>{
// //     const response = await fetch('/orders/own/')
// //     const data = await response.json()
// //     resolve({data})
// //   }
// //   );
// // }

// // export function fetchLoggedInUser() {
// //   return new Promise(async (resolve) =>{
// //     const response = await fetch('/users/own')
// //     const data = await response.json()
// //     resolve({data})
// //   }
// //   );
// // }

// // export function updateUser(update) {
// //   return new Promise(async (resolve) => {
// //     const response = await fetch('/users/'+update.id, {
// //       method: 'PATCH',
// //       body: JSON.stringify(update),
// //       headers: { 'content-type': 'application/json' },
// //     });
// //     const data = await response.json();
// //     resolve({ data });
// //   });
// // }

// // export function fetchLoggedInUserOrders() {
// //   return new Promise(async (resolve) => {
// //     const response = await fetch(`${baseUrl}/orders/own`);
// //     const data = await response.json();
// //     resolve({ data });
// //   });
// // }

// // export function fetchLoggedInUser() {
// //   return new Promise(async (resolve) => {
// //     const response = await fetch(`${baseUrl}/users/own`);
// //     const data = await response.json();
// //     resolve({ data });
// //   });
// // }

// // export function updateUser(update) {
// //   return new Promise(async (resolve) => {
// //     const response = await fetch(`${baseUrl}/users/${update.id}`, {
// //       method: "PATCH",
// //       body: JSON.stringify(update),
// //       headers: { "content-type": "application/json" },
// //     });
// //     const data = await response.json();
// //     resolve({ data });
// //   });
// // }

// import axios from "axios";

// const baseUrl = process.env.REACT_APP_BACKEND_URL;

// const API = axios.create({
//   baseURL: `${baseUrl}`,
// });

// API.interceptors.request.use((config) => {
//   if (localStorage.getItem("profile")) {
//     config.headers.Authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("profile")).token
//     }`;
//   }
//   return config;
// });

// export async function fetchLoggedInUserOrders() {
//   const response = await API.get("/orders/own");
//   return ({ data: response.data });
// }

// // export function fetchLoggedInUser() {
// //   return API.get("/users/own").then((response) => ({ data: response.data }));
// // }

// // export function updateUser(update) {
// //   return API.patch(`/users/${update.id}`, update, {
// //     headers: { "Content-Type": "application/json" },
// //   }).then((response) => ({ data: response.data }));
// // }




// // const baseUrl = process.env.REACT_APP_BACKEND_URL;

// /**
//  * Fetch all users with pagination and filters
//  * Admin/SuperAdmin only
//  */
// export function fetchAllUsers(pagination, filters, sort) {
//   let queryString = '';

//   // Pagination
//   if (pagination) {
//     for (let key in pagination) {
//       queryString += `${key}=${pagination[key]}&`;
//     }
//   }

//   // Filters
//   if (filters) {
//     for (let key in filters) {
//       if (filters[key]?.length) {
//         queryString += `${key}=${filters[key].join(',')}&`;
//       }
//     }
//   }

//   // Search
//   if (filters?.search) {
//     queryString += `search=${filters.search}&`;
//   }

//   // Sorting
//   if (sort) {
//     for (let key in sort) {
//       queryString += `${key}=${sort[key]}&`;
//     }
//   }

//   // Remove trailing '&'
//   queryString = queryString.slice(0, -1);

//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await fetch(`${baseUrl}/users?${queryString}`, {
//         credentials: 'include', // Include cookies for authentication
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch users');
//       }

//       const data = await response.json();
//       resolve({ data });
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

// /**
//  * Update user role
//  * Admin/SuperAdmin only
//  */
// export function updateUserRole(userId, role) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await fetch(`${baseUrl}/users/${userId}/role`, {
//         method: 'PATCH',
//         body: JSON.stringify({ role }),
//         headers: { 'content-type': 'application/json' },
//         credentials: 'include',
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to update user role');
//       }

//       const data = await response.json();
//       resolve({ data });
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

// /**
//  * Get user statistics
//  */
// export function getUserStats() {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await fetch(`${baseUrl}/users/stats`, {
//         credentials: 'include',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch user statistics');
//       }

//       const data = await response.json();
//       resolve({ data });
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

// /**
//  * Get current user's permissions
//  */
// export function getUserPermissions() {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await fetch(`${baseUrl}/users/permissions`, {
//         credentials: 'include',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch permissions');
//       }

//       const data = await response.json();
//       resolve({ data });
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

// /**
//  * Delete user
//  * SuperAdmin only
//  */
// export function deleteUser(userId) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await fetch(`${baseUrl}/users/${userId}`, {
//         method: 'DELETE',
//         credentials: 'include',
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to delete user');
//       }

//       const data = await response.json();
//       resolve({ data });
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

// /**
//  * Update user profile
//  */
// export function updateUser(userId, updates) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await fetch(`${baseUrl}/users/${userId}`, {
//         method: 'PATCH',
//         body: JSON.stringify(updates),
//         headers: { 'content-type': 'application/json' },
//         credentials: 'include',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update user');
//       }

//       const data = await response.json();
//       resolve({ data });
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

// /**
//  * Fetch current user
//  */
// export function fetchLoggedInUser() {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await fetch(`${baseUrl}/users/own`, {
//         credentials: 'include',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch user');
//       }

//       const data = await response.json();
//       resolve({ data });
//     } catch (error) {
//       reject(error);
//     }
//   });
// }


import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL  || "http://localhost:8000";

export const API = axios.create({
  baseURL: baseUrl,
  // withCredentials: true, // replaces fetch credentials: 'include'
});

API.interceptors.request.use((config) => {
  const profile = localStorage.getItem("profile");
  if (profile) {
    config.headers.Authorization = `Bearer ${
      JSON.parse(profile).token
    }`;
  }
  return config;
});


export async function fetchLoggedInUserOrders() {
  const response = await API.get("/orders/own");
  return { data: response.data };
}


export async function fetchLoggedInUser() {
  const response = await API.get("/users/own");
  return { data: response.data };
}


export async function updateUser(userId, updates) {
  const response = await API.patch(`/users/${userId}`, updates, {
    headers: { "Content-Type": "application/json" },
  });
  return { data: response.data };
}


export async function fetchAllUsers(pagination, filters, sort) {
  let queryString = "";

  if (pagination) {
    for (let key in pagination) {
      queryString += `${key}=${pagination[key]}&`;
    }
  }

  if (filters) {
    for (let key in filters) {
      if (Array.isArray(filters[key]) && filters[key].length) {
        queryString += `${key}=${filters[key].join(",")}&`;
      }
    }
  }

  if (filters?.search) {
    queryString += `search=${filters.search}&`;
  }

  if (sort) {
    for (let key in sort) {
      queryString += `${key}=${sort[key]}&`;
    }
  }

  queryString = queryString.slice(0, -1);

  const response = await API.get(`/users?${queryString}`);
  return { data: response.data };
}


export async function updateUserRole(userId, role) {
  const response = await API.patch(
    `/users/${userId}/role`,
    { role },
    { headers: { "Content-Type": "application/json" } }
  );
  return { data: response.data };
}


export async function getUserStats() {
  const response = await API.get("/users/stats");
  return { data: response.data };
}


export async function getUserPermissions() {
  const response = await API.get("/users/permissions");
  return { data: response.data };
}



export async function deleteUser(userId) {
  const response = await API.delete(`/users/${userId}`);
  return { data: response.data };
}
