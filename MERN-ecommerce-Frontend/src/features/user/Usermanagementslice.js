// // import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// // import {
// //   fetchLoggedInUserOrders,
// //   updateUser,
// //   fetchLoggedInUser,
// // } from './userAPI';

// // const initialState = {
// //   status: 'idle',
// //   userInfo: null, // this info will be used in case of detailed user info, while auth will
// //   // only be used for loggedInUser id etc checks
// // };

// // export const fetchLoggedInUserOrderAsync = createAsyncThunk(
// //   'user/fetchLoggedInUserOrders',
// //   async () => {
// //     const response = await fetchLoggedInUserOrders();
// //     // The value we return becomes the `fulfilled` action payload
// //     return response.data;
// //   }
// // );

// // export const fetchLoggedInUserAsync = createAsyncThunk(
// //   'user/fetchLoggedInUser',
// //   async () => {
// //     const response = await fetchLoggedInUser();
// //     // The value we return becomes the `fulfilled` action payload
// //     return response.data;
// //   }
// // );

// // export const updateUserAsync = createAsyncThunk(
// //   'user/updateUser',
// //   async (update) => {
// //     // this is name mistake
// //     const response = await updateUser(update);
// //     // The value we return becomes the `fulfilled` action payload
// //     return response.data;
// //   }
// // );

// // export const Usermanagementslice = createSlice({
// //   name: 'user',
// //   initialState,
// //   reducers: {
   
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
// //         state.status = 'loading';
// //       })
// //       .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
// //         state.status = 'idle';
// //         state.userInfo.orders = action.payload;

// //       })
// //       .addCase(updateUserAsync.pending, (state) => {
// //         state.status = 'loading';
// //       })
// //       .addCase(updateUserAsync.fulfilled, (state, action) => {
// //         state.status = 'idle';
// //         // earlier there was loggedInUser variable in other slice
// //         state.userInfo = action.payload;
// //       })
// //       .addCase(fetchLoggedInUserAsync.pending, (state) => {
// //         state.status = 'loading';
// //       })
// //       .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
// //         state.status = 'idle';
// //         // this info can be different or more from logged-in User info
// //         state.userInfo = action.payload;
// //       });
// //   },
// // });

// // export const selectUserOrders = (state) => state.user.userInfo.orders;
// // export const selectUserInfo = (state) => state.user.userInfo;
// // export const selectUserInfoStatus = (state) => state.user.status;

// // // export const { increment } = Usermanagementslice.actions;

// // export default Usermanagementslice.reducer;


// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import {
//   fetchLoggedInUserOrders,
//   updateUser,
//   fetchLoggedInUser,
// } from './userAPI';

// const initialState = {
//   status: 'idle',
//   userInfo: null,
// };

// /* ==================== THUNKS ==================== */

// export const fetchLoggedInUserOrderAsync = createAsyncThunk(
//   'user/fetchLoggedInUserOrders',
//   async () => {
//     const response = await fetchLoggedInUserOrders();
//     return response.data;
//   }
// );

// export const fetchLoggedInUserAsync = createAsyncThunk(
//   'user/fetchLoggedInUser',
//   async () => {
//     const response = await fetchLoggedInUser();
//     return response.data;
//   }
// );

// export const updateUserAsync = createAsyncThunk(
//   'user/updateUser',
//   async (update) => {
//     const response = await updateUser(update);
//     return response.data;
//   }
// );

// /* ==================== SLICE ==================== */

// export const Usermanagementslice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     clearUserInfo: (state) => {
//       state.userInfo = null;
//       state.status = 'idle';
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLoggedInUserAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.userInfo = action.payload;
//       })
//       .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
//         if (state.userInfo) {
//           state.userInfo.orders = action.payload;
//         }
//       })
//       .addCase(updateUserAsync.fulfilled, (state, action) => {
//         state.userInfo = action.payload;
//       });
//   },
// });

// /* ==================== EXPORTS ==================== */

// export const { clearUserInfo } = Usermanagementslice.actions;
// export const selectUserOrders = (state) => state.user.userInfo.orders;

// export const selectUserInfo = (state) => state.user.userInfo;
// export const selectUserInfoStatus = (state) => state.user.status;

// export default Usermanagementslice.reducer;



import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchAllUsers,
  updateUserRole,
  getUserStats,
  deleteUser,
  getUserPermissions,
  fetchLoggedInUserOrders,
  updateUser,
  fetchLoggedInUser,
} from './userAPI';

const initialState = {
   userInfo: null, // this info will be used in case of detailed user info, while auth will

  users: [],
  totalUsers: 0,
  currentPage: 1,
  totalPages: 1,
  status: 'idle',
  error: null,
  stats: null,
  permissions: null,
};

// ===== ASYNC THUNKS =====


export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async () => {
    const response = await fetchLoggedInUserOrders();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async () => {
    const response = await fetchLoggedInUser();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    // this is name mistake
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllUsersAsync = createAsyncThunk(
  'userManagement/fetchAllUsers',
  async ({ pagination, filters, sort }, { rejectWithValue }) => {
    try {
      const response = await fetchAllUsers(pagination, filters, sort);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserRoleAsync = createAsyncThunk(
  'userManagement/updateUserRole',
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const response = await updateUserRole(userId, role);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserStatsAsync = createAsyncThunk(
  'userManagement/getUserStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserStats();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUserAsync = createAsyncThunk(
  'userManagement/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await deleteUser(userId);
      return { ...response.data, userId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserPermissionsAsync = createAsyncThunk(
  'userManagement/getUserPermissions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserPermissions();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ===== SLICE =====

export const Usermanagementslice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
        clearUserInfo: (state) => {
      state.userInfo = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // ===== FETCH ALL USERS =====
      .addCase(fetchAllUsersAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllUsersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.users = action.payload.users;
        state.totalUsers = action.payload.totalUsers;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAllUsersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // ===== UPDATE USER ROLE =====
      .addCase(updateUserRoleAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // .addCase(updateUserRoleAsync.fulfilled, (state, action) => {
      //   state.status = 'idle';
      //   // Update user in the list
      //   const index = state.users.findIndex(
      //     (user) => user?._id  === action.payload.user?._id ||  user?.id === action.payload.user?.id
      //   );
      //   if (index !== -1) {
      //     state.users[index] = action.payload.user;
      //   }
      // })
      .addCase(updateUserRoleAsync.fulfilled, (state, action) => {
  state.status = 'idle';

  const updatedUser = action.payload?.user;
  if (!updatedUser) return;

  const updatedUserId = updatedUser._id || updatedUser.id;

  const index = state.users.findIndex(
    (user) => (user?._id || user?.id) === updatedUserId
  );

  if (index !== -1) {
    state.users[index] = updatedUser;
  }
})

      .addCase(updateUserRoleAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // ===== GET USER STATS =====
      .addCase(getUserStatsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserStatsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.stats = action.payload;
      })
      .addCase(getUserStatsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // ===== DELETE USER =====
      .addCase(deleteUserAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // Remove user from the list
        state.users = state.users.filter(
          (user) => user.id !== action.payload.userId
        );
        state.totalUsers -= 1;
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // ===== GET USER PERMISSIONS =====
      .addCase(getUserPermissionsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserPermissionsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.permissions = action.payload;
      })
      .addCase(getUserPermissionsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
            .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        if (state.userInfo) {
          state.userInfo.orders = action.payload;
        }
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      });
  },
});

// ===== ACTIONS =====
export const { clearError } = Usermanagementslice.actions;

// ===== SELECTORS =====
export const selectAllUsers = (state) => state.userManagement.users;
export const selectTotalUsers = (state) => state.userManagement.totalUsers;
export const selectCurrentPage = (state) => state.userManagement.currentPage;
export const selectTotalPages = (state) => state.userManagement.totalPages;
export const selectUserManagementStatus = (state) => state.userManagement.status;
export const selectUserManagementError = (state) => state.userManagement.error;
export const selectUserStats = (state) => state.userManagement.stats;
export const selectUserPermissions = (state) => state.userManagement.permissions;
export const selectUserOrders = (state) => state.userManagement.userInfo.orders;

export const selectUserInfo = (state) => state.userManagement.userInfo;
export const selectUserInfoStatus = (state) => state.userManagement.status;

export const { clearUserInfo } = Usermanagementslice.actions;
export default Usermanagementslice.reducer;