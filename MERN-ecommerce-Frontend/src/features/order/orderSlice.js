

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  fetchOrderById,
  fetchLoggedInUserOrders,
  fetchAllOrders,
  updateOrder,
  deleteOrder,
  addTrackingUpdate,
  getTrackingHistory,
  updatePaymentStatus,
} from "./Orderapi";

const initialState = {
  orders: [],
  currentOrder: null,
  trackingHistory: [],
  totalOrders: 0,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filters: {
    page: 1,
    limit: 10,
    sort: "createdAt",
    order: "desc",
  },
};

// ============================================
// ASYNC THUNKS
// ============================================

/**
 * Create a new order
 */
export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order, { rejectWithValue }) => {
    try {
      const response = await createOrder(order);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create order"
      );
    }
  }
);

/**
 * Fetch a single order by ID
 */
export const fetchOrderByIdAsync = createAsyncThunk(
  "order/fetchOrderById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchOrderById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch order"
      );
    }
  }
);

/**
 * Fetch all orders for logged-in user
 */
export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  "order/fetchLoggedInUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchLoggedInUserOrders();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

/**
 * Fetch all orders (Admin only)
 */
export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async (queryParams, { rejectWithValue }) => {
    try {
      const response = await fetchAllOrders(queryParams);
      // console.log("API Response Headers:", response.data.orders

        // console.log("header", response)
      
      return {
        orders: response.data?.orders,
        totalOrders: response.data?.totalOrders,
        // totalOrders: parseInt(response.headers["x-total-count"] || "0"),
        // totalOrders: response.data?.orders.length || 0,
        // totalOrders: parseInt(response.headers["x-total-count"] || "0"),
      };
    } catch (error) {
      console.error("Error fetching all orders:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch all orders"
      );
    }
  }
);

/**
 * Update an order
 */
export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async ({ id, update }, { rejectWithValue }) => {
    try {
      const response = await updateOrder(id, update);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update order"
      );
    }
  }
);

/**
 * Delete an order
 */
export const deleteOrderAsync = createAsyncThunk(
  "order/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteOrder(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete order"
      );
    }
  }
);

/**
 * Add a tracking update to an order
 */
export const addTrackingUpdateAsync = createAsyncThunk(
  "order/addTrackingUpdate",
  async ({ id, trackingData }, { rejectWithValue }) => {
    try {
      const response = await addTrackingUpdate(id, trackingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add tracking update"
      );
    }
  }
);

/**
 * Get tracking history for an order
 */
export const getTrackingHistoryAsync = createAsyncThunk(
  "order/getTrackingHistory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getTrackingHistory(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tracking history"
      );
    }
  }
);

/**
 * Update payment status
 */
export const updatePaymentStatusAsync = createAsyncThunk(
  "order/updatePaymentStatus",
  async ({ id, paymentData }, { rejectWithValue }) => {
    try {
      const response = await updatePaymentStatus(id, paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update payment status"
      );
    }
  }
);

// ============================================
// SLICE
// ============================================

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
      state.trackingHistory = [];
      state.error = null;
    },
    clearOrders: (state) => {
      state.orders = [];
      state.totalOrders = 0;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      // ============================================
      // CREATE ORDER
      // ============================================
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentOrder = action.payload;
        state.orders.unshift(action.payload); // Add to beginning
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ============================================
      // FETCH ORDER BY ID
      // ============================================
      .addCase(fetchOrderByIdAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchOrderByIdAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentOrder = action.payload;
        state.trackingHistory = action.payload.trackingHistory || [];
      })
      .addCase(fetchOrderByIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ============================================
      // FETCH USER ORDERS
      // ============================================
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchLoggedInUserOrdersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ============================================
      // FETCH ALL ORDERS (ADMIN)
      // ============================================
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.orders = action.payload.orders;
        console.log("state", state.orders);
        // console.log("Total Orders:", action.payload.totalOrders, action.payload);
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(fetchAllOrdersAsync.rejected, (state, action) => {
        state.status = "failed";
        // state.error = action.payload;
      })

      // ============================================
      // UPDATE ORDER
      // ============================================
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        
        // Update in orders array
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        
        // Update current order if it matches
        if (state.currentOrder?.id === action.payload.id) {
          state.currentOrder = action.payload;
          state.trackingHistory = action.payload.trackingHistory || [];
        }
      })
      .addCase(updateOrderAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ============================================
      // DELETE ORDER
      // ============================================
      .addCase(deleteOrderAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteOrderAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = state.orders.filter(
          (order) => order.id !== action.payload.id
        );
        if (state.currentOrder?.id === action.payload.id) {
          state.currentOrder = null;
        }
      })
      .addCase(deleteOrderAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ============================================
      // ADD TRACKING UPDATE
      // ============================================
      .addCase(addTrackingUpdateAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addTrackingUpdateAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        
        // Update in orders array
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        
        // Update current order
        if (state.currentOrder?.id === action.payload.id) {
          state.currentOrder = action.payload;
          state.trackingHistory = action.payload.trackingHistory || [];
        }
      })
      .addCase(addTrackingUpdateAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ============================================
      // GET TRACKING HISTORY
      // ============================================
      .addCase(getTrackingHistoryAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getTrackingHistoryAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.trackingHistory = action.payload;
      })
      .addCase(getTrackingHistoryAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ============================================
      // UPDATE PAYMENT STATUS
      // ============================================
      .addCase(updatePaymentStatusAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updatePaymentStatusAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        
        // Update in orders array
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
        
        // Update current order
        if (state.currentOrder?.id === action.payload.id) {
          state.currentOrder = action.payload;
        }
      })
      .addCase(updatePaymentStatusAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// ============================================
// ACTIONS
// ============================================

export const { resetOrder, clearOrders, clearError, setFilters, resetFilters } =
  orderSlice.actions;

// ============================================
// SELECTORS
// ============================================


export const selectOrders = (state) => state.order.orders;
// console.log("order", selectOrders);
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectTrackingHistory = (state) => state.order.trackingHistory;
export const selectOrderStatus = (state) => state.order.status;
export const selectOrderError = (state) => state.order.error;
export const selectTotalOrders = (state) => state.order.totalOrders;
export const selectFilters = (state) => state.order.filters;

// Memoized selectors for computed values
export const selectOrderById = (orderId) => (state) =>
  state.order.orders.find((order) => order.id === orderId);

export const selectOrdersByStatus = (status) => (state) =>
  state.order.orders.filter((order) => order.status === status);

export const selectPendingOrders = (state) =>
  state.order.orders.filter((order) => order.status === "PENDING");

export const selectShippedOrders = (state) =>
  state.order.orders.filter((order) => order.status === "SHIPPED");

export const selectDeliveredOrders = (state) =>
  state.order.orders.filter((order) => order.status === "DELIVERED");

export const selectIsLoading = (state) => state.order.status === "loading";

export const selectHasError = (state) => state.order.error !== null;

// ============================================
// REDUCER EXPORT
// ============================================

export default orderSlice.reducer;