// // // orderAPI.js - API calls for Order Management

// // import axios from "axios";

// // const BASE_URL = "http://localhost:8000"; // Update with your backend URL

// // const API = axios.create({
// //   baseURL: `${BASE_URL}`,
// // });

// // API.interceptors.request.use((config) => {
// //   if (localStorage.getItem("profile")) {
// //     config.headers.Authorization = `Bearer ${
// //       JSON.parse(localStorage.getItem("profile")).token
// //     }`;
// //   }
// //   return config;
// // });


// // // Create new order
// // export function createOrder(order) {
// //   return new Promise(async (resolve, reject) => {
// //     try {
// //       const response = await API.post("/orders", {
// //         method: "POST",
// //         body: JSON.stringify(order),
// //         headers: { "content-type": "application/json" },
// //         credentials: "include",
// //       });
      
// //       if (response.ok) {
// //         const data = await response.json();
// //         resolve({ data });
// //       } else {
// //         const error = await response.json();
// //         reject(error);
// //       }
// //     } catch (error) {
// //       reject(error);
// //     }
// //   });
// // }

// // // Fetch single order by ID
// // export function fetchOrderById(id) {
// //   return new Promise(async (resolve, reject) => {
// //     try {
// //       const response = await fetch(`${BASE_URL}/orders/${id}`, {
// //         credentials: "include",
// //       });
      
// //       if (response.ok) {
// //         const data = await response.json();
// //         resolve({ data });
// //       } else {
// //         const error = await response.json();
// //         reject(error);
// //       }
// //     } catch (error) {
// //       reject(error);
// //     }
// //   });
// // }

// // // Fetch logged-in user's orders
// // export function fetchLoggedInUserOrders() {
// //   return new Promise(async (resolve, reject) => {
// //     try {
// //       const response = await fetch(`${BASE_URL}/orders/user/own`, {
// //         credentials: "include",
// //       });
      
// //       if (response.ok) {
// //         const data = await response.json();
// //         resolve({ data });
// //       } else {
// //         const error = await response.json();
// //         reject(error);
// //       }
// //     } catch (error) {
// //       reject(error);
// //     }
// //   });
// // }

// // // Update order (Admin)
// // export function updateOrder(id, update) {
// //   return new Promise(async (resolve, reject) => {
// //     try {
// //       const response = await fetch(`${BASE_URL}/orders/${id}`, {
// //         method: "PATCH",
// //         body: JSON.stringify(update),
// //         headers: { "content-type": "application/json" },
// //         credentials: "include",
// //       });
      
// //       if (response.ok) {
// //         const data = await response.json();
// //         resolve({ data });
// //       } else {
// //         const error = await response.json();
// //         reject(error);
// //       }
// //     } catch (error) {
// //       reject(error);
// //     }
// //   });
// // }

// // // Add tracking update (Admin)
// // export function addTrackingUpdate(id, trackingData) {
// //   return new Promise(async (resolve, reject) => {
// //     try {
// //       const response = await fetch(`${BASE_URL}/orders/${id}/tracking`, {
// //         method: "POST",
// //         body: JSON.stringify(trackingData),
// //         headers: { "content-type": "application/json" },
// //         credentials: "include",
// //       });
      
// //       if (response.ok) {
// //         const data = await response.json();
// //         resolve({ data });
// //       } else {
// //         const error = await response.json();
// //         reject(error);
// //       }
// //     } catch (error) {
// //       reject(error);
// //     }
// //   });
// // }

// // // Fetch all orders (Admin)
// // export function fetchAllOrders(pagination) {
// //   return new Promise(async (resolve, reject) => {
// //     try {
// //       let queryString = "";
// //       if (pagination) {
// //         queryString = `?_page=${pagination._page}&_limit=${pagination._limit}`;
// //         if (pagination._sort) {
// //           queryString += `&_sort=${pagination._sort}&_order=${pagination._order}`;
// //         }
// //       }

// //       const response = await fetch(`${BASE_URL}/orders${queryString}`, {
// //         credentials: "include",
// //       });
      
// //       if (response.ok) {
// //         const data = await response.json();
// //         const totalOrders = response.headers.get("X-Total-Count");
// //         resolve({ data: { orders: data, totalOrders: +totalOrders } });
// //       } else {
// //         const error = await response.json();
// //         reject(error);
// //       }
// //     } catch (error) {
// //       reject(error);
// //     }
// //   });
// // }




// // orderAPI.js - API calls for Order Management (Axios)

// import axios from "axios";

// const BASE_URL = "http://localhost:8000"; // update if needed

// const API = axios.create({
//   baseURL: BASE_URL,
//   // withCredentials: true, // ✅ replaces credentials: "include"
// });

// // 🔐 Attach token automatically
// API.interceptors.request.use((config) => {
//   const profile = localStorage.getItem("profile");
//   if (profile) {
//     config.headers.Authorization = `Bearer ${
//       JSON.parse(profile).token
//     }`;
//   }
//   return config;
// });

// /* ---------------------------------------------------
//    Create New Order
// --------------------------------------------------- */
// export const createOrder = async (order) => {
//   try {
//     const response = await API.post("/orders/create", order);
//     return { data: response.data };
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };

// /* ---------------------------------------------------
//    Fetch Order By ID
// --------------------------------------------------- */
// export const fetchOrderById = async (id) => {
//   try {
//     const response = await API.get(`/orders/${id}`);
//     console.log("API Response for fetchOrderById:", response.data);
//     return { data: response.data };
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };

// /* ---------------------------------------------------
//    Fetch Logged-in User Orders
// --------------------------------------------------- */
// export const fetchLoggedInUserOrders = async () => {
//   try {
//     const response = await API.get("/orders/own");
//     return { data: response.data };
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };

// /* ---------------------------------------------------
//    Update Order (Admin)
// --------------------------------------------------- */
// export const updateOrder = async (id, update) => {
//   try {
//     const response = await API.patch(`/orders/${id}`, update);
//     return { data: response.data };
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };

// /* ---------------------------------------------------
//    Add Tracking Update (Admin)
// --------------------------------------------------- */
// export const addTrackingUpdate = async (id, trackingData) => {
//   try {
//     const response = await API.post(
//       `/orders/${id}/tracking`,
//       trackingData
//     );
//     return { data: response.data };
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };

// /* ---------------------------------------------------
//    Fetch All Orders (Admin + Pagination)
// --------------------------------------------------- */
// export const fetchAllOrders = async (pagination) => {
//   try {
//     const params = {};

//     if (pagination) {
//       params._page = pagination._page;
//       params._limit = pagination._limit;

//       if (pagination._sort) {
//         params._sort = pagination._sort;
//         params._order = pagination._order;
//       }
//     }

//     const response = await API.get("/orders", { params });

//     return {
//       data: {
//         orders: response.data,
//         totalOrders: Number(response.headers["x-total-count"]),
//       },
//     };
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };




// Orderapi.js - API calls for Order Management with Tracking

import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

const API = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true, // Enable credentials for cookie-based auth
});

// ============================================
// REQUEST INTERCEPTOR
// ============================================

// 🔐 Attach token automatically to all requests
API.interceptors.request.use(
  (config) => {
    const profile = localStorage.getItem("profile");
    if (profile) {
      try {
        const { token } = JSON.parse(profile);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error parsing profile from localStorage:", error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ============================================
// RESPONSE INTERCEPTOR (Optional - for global error handling)
// ============================================

API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("profile");
      // Optionally redirect to login
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============================================
// ORDER CRUD OPERATIONS
// ============================================

/**
 * Create a new order
 * @param {Object} order - Order data
 * @returns {Promise<{data: Object}>}
 */
export const createOrder = async (order) => {
  try {
    const response = await API.post("/orders/create", order);
    return { data: response.data };
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Fetch a single order by ID
 * @param {string} id - Order ID
 * @returns {Promise<{data: Object}>}
 */
export const fetchOrderById = async (id) => {
  try {
    const response = await API.get(`/orders/${id}`);
    console.log("API Response for fetchOrderById:", response.data);
    return { data: response.data };
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Fetch all orders for the logged-in user
 * @returns {Promise<{data: Array}>}
 */
export const fetchLoggedInUserOrders = async () => {
  try {
    const response = await API.get("/orders/own");
    return { data: response.data };
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Update an existing order
 * @param {string} id - Order ID
 * @param {Object} update - Fields to update
 * @returns {Promise<{data: Object}>}
 */
export const updateOrder = async (id, update) => {
  try {
    const response = await API.patch(`/orders/${id}`, update);
    return { data: response.data };
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Delete an order
 * @param {string} id - Order ID
 * @returns {Promise<{data: Object}>}
 */
export const deleteOrder = async (id) => {
  try {
    const response = await API.delete(`/orders/${id}`);
    return { data: response.data };
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ============================================
// ADMIN OPERATIONS
// ============================================

/**
 * Fetch all orders (Admin only)
 * @param {Object} queryParams - Query parameters for filtering/pagination
 * @param {number} queryParams.page - Page number
 * @param {number} queryParams.limit - Items per page
 * @param {string} queryParams.sort - Sort field
 * @param {string} queryParams.order - Sort order (asc/desc)
 * @returns {Promise<{data: {orders: Array, totalOrders: number}}>}
 */
export const fetchAllOrders = async (queryParams = {}) => {
  try {
    const params = {};

    // Map common naming conventions
    if (queryParams.page) params._page = queryParams.page;
    if (queryParams.limit) params._limit = queryParams.limit;
    if (queryParams.sort) params._sort = queryParams.sort;
    if (queryParams.order) params._order = queryParams.order;

    // Also support direct _page, _limit, etc.
    if (queryParams._page) params._page = queryParams._page;
    if (queryParams._limit) params._limit = queryParams._limit;
    if (queryParams._sort) params._sort = queryParams._sort;
    if (queryParams._order) params._order = queryParams._order;

    const response = await API.get("/orders", { params });

    return {
      data: {
        orders: response.data,
        totalOrders: Number(response.headers["x-total-count"] || 0),
      },
    };
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ============================================
// TRACKING OPERATIONS
// ============================================

/**
 * Add a custom tracking update to an order (Admin only)
 * @param {string} id - Order ID
 * @param {Object} trackingData - Tracking information
 * @param {string} trackingData.message - Tracking message
 * @param {string} trackingData.location - Current location
 * @param {string} trackingData.status - Order status (optional)
 * @returns {Promise<{data: Object}>}
 */
export const addTrackingUpdate = async (id, trackingData) => {
  try {
    const response = await API.post(`/orders/${id}/tracking`, trackingData);
    return { data: response.data };
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

/**
 * Get tracking history for an order
 * @param {string} id - Order ID
 * @returns {Promise<{data: Array}>}
 */
export const getTrackingHistory = async (id) => {
  try {
    const response = await API.get(`/orders/${id}/tracking`);
    return { data: response.data };
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ============================================
// PAYMENT OPERATIONS
// ============================================

/**
 * Update payment status after payment verification
 * @param {string} id - Order ID
 * @param {Object} paymentData - Payment verification data
 * @returns {Promise<{data: Object}>}
 */
export const updatePaymentStatus = async (id, paymentData) => {
  try {
    const response = await API.patch(`/orders/${id}/payment`, paymentData);
    return { data: response.data };
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get order status color for UI
 * @param {string} status - Order status
 * @returns {string} Color code
 */
export const getOrderStatusColor = (status) => {
  const colors = {
    PENDING: "#FFA500",
    CONFIRMED: "#4CAF50",
    SHIPPED: "#2196F3",
    DELIVERED: "#4CAF50",
    CANCELLED: "#F44336",
  };
  return colors[status] || "#757575";
};

/**
 * Get order status icon
 * @param {string} status - Order status
 * @returns {string} Icon name
 */
export const getOrderStatusIcon = (status) => {
  const icons = {
    PENDING: "schedule",
    CONFIRMED: "check_circle",
    SHIPPED: "local_shipping",
    DELIVERED: "check_circle_outline",
    CANCELLED: "cancel",
  };
  return icons[status] || "help";
};

/**
 * Format order date for display
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatOrderDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Calculate order progress percentage
 * @param {string} status - Current order status
 * @returns {number} Progress percentage (0-100)
 */
export const getOrderProgress = (status) => {
  const progressMap = {
    PENDING: 20,
    CONFIRMED: 40,
    SHIPPED: 70,
    DELIVERED: 100,
    CANCELLED: 0,
  };
  return progressMap[status] || 0;
};

/**
 * Format price in INR
 * @param {number} usdPrice - Price in USD
 * @returns {string} Formatted INR price
 */
export const formatINR = (usdPrice) => {
  const inrPrice = Math.round(usdPrice * 83);
  return inrPrice.toLocaleString("en-IN");
};

// ============================================
// EXPORT API INSTANCE (for custom calls)
// ============================================

export default API;