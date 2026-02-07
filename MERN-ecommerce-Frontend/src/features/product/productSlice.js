// // import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// // import {
// //   fetchAllProducts,
// //   fetchProductsByFilters,
// //   fetchBrands,
// //   fetchCategories,
// //   fetchProductById,
// //   createProduct,
// //   updateProduct,
// // } from './productAPI';

// // // const initialState = {
// // //   products: [],
// // //   brands: [],
// // //   categories: [],
// // //   status: 'idle',
// // //   totalItems: 0,
// // //   selectedProduct: null,
// // // };

// // const initialState = {
// //   products: [],
// //   brands: [],
// //   categories: [],
// //   status: "idle",
// //   nextCursor: null,
// //   selectedProduct: null,
// // };



// // export const fetchProductByIdAsync = createAsyncThunk(
// //   'product/fetchProductById',
// //   async (id) => {
// //     const response = await fetchProductById(id);
// //     // The value we return becomes the `fulfilled` action payload
// //     return response.data;
// //   }
// // );

// // // export const fetchProductsByFiltersAsync = createAsyncThunk(
// // //   'product/fetchProductsByFilters',
// // //   async ({ filter, sort, pagination, admin }) => {
// // //     const response = await fetchProductsByFilters(filter, sort, pagination, admin);
// // //     // The value we return becomes the `fulfilled` action payload
// // //     return response.data;
// // //   }
// // // );

// // export const fetchProductsByFiltersAsync = createAsyncThunk(
// //   "product/fetchProductsByFilters",
// //   async ({ filter, sort, cursor, admin }) => {
// //     const response = await fetchProductsByFilters(
// //       filter,
// //       sort,
// //       cursor,
// //       admin
// //     );
// //     return response.data;
// //   }
// // );


// // export const fetchBrandsAsync = createAsyncThunk(
// //   'product/fetchBrands',
// //   async () => {
// //     const response = await fetchBrands();
// //     // The value we return becomes the `fulfilled` action payload
// //     return response.data;
// //   }
// // );
// // export const fetchCategoriesAsync = createAsyncThunk(
// //   'product/fetchCategories',
// //   async () => {
// //     const response = await fetchCategories();
// //     // The value we return becomes the `fulfilled` action payload
// //     return response.data;
// //   }
// // );

// // export const createProductAsync = createAsyncThunk(
// //   'product/create',
// //   async (product) => {
// //     const response = await createProduct(product);
// //     return response.data;
// //   }
// // );

// // export const updateProductAsync = createAsyncThunk(
// //   'product/update',
// //   async (update) => {
// //     const response = await updateProduct(update);
// //     return response.data;
// //   }
// // );

// // export const productSlice = createSlice({
// //   name: 'product',
// //   initialState,
// //   reducers: {
// //     clearSelectedProduct:(state)=>{
// //       state.selectedProduct = null
// //     },
// //     resetProducts: (state) => {
// //     state.products = [];
// //     state.nextCursor = null;
// //   },

// //   },
// //   extraReducers: (builder) => {
// //     builder.addCase(fetchProductsByFiltersAsync.pending, (state) => {
// //       state.status = "loading";
// //     })
// //     .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
// //       state.status = "idle";

// //       const { products, nextCursor } = action.payload;

// //       // ✅ APPEND (not replace)
// //       state.products.push(...products);
// //       state.nextCursor = nextCursor;
// //     })

// //       // .addCase(fetchProductsByFiltersAsync.pending, (state) => {
// //       //   state.status = 'loading';
// //       // })
// //       // .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
// //       //   state.status = 'idle';
// //       //   state.products = action.payload.products;
// //       //   state.totalItems = action.payload.totalItems;
// //       // })
// //       .addCase(fetchBrandsAsync.pending, (state) => {
// //         state.status = 'loading';
// //       })
// //       .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
// //         state.status = 'idle';
// //         state.brands = action.payload;
// //       })
// //       .addCase(fetchCategoriesAsync.pending, (state) => {
// //         state.status = 'loading';
// //       })
// //       .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
// //         state.status = 'idle';
// //         state.categories = action.payload;
// //       })
// //       .addCase(fetchProductByIdAsync.pending, (state) => {
// //         state.status = 'loading';
// //       })
// //       .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
// //         state.status = 'idle';
// //         state.selectedProduct = action.payload;
// //       })
// //       .addCase(createProductAsync.pending, (state) => {
// //         state.status = 'loading';
// //       })
// //       .addCase(createProductAsync.fulfilled, (state, action) => {
// //         state.status = 'idle';
// //         state.products.push(action.payload);
// //       })
// //       .addCase(updateProductAsync.pending, (state) => {
// //         state.status = 'loading';
// //       })
// //       .addCase(updateProductAsync.fulfilled, (state, action) => {
// //         state.status = 'idle';
// //         const index = state.products.findIndex(
// //           (product) => product.id === action.payload.id
// //         );
// //         state.products[index] = action.payload;
// //         state.selectedProduct = action.payload;

// //       });
// //   },
// // });

// // export const { clearSelectedProduct } = productSlice.actions;

// // export const selectAllProducts = (state) => state.product.products;
// // export const selectBrands = (state) => state.product.brands;
// // export const selectCategories = (state) => state.product.categories;
// // export const selectProductById = (state) => state.product.selectedProduct;
// // export const selectProductListStatus = (state) => state.product.status;

// // export const selectTotalItems = (state) => state.product.totalItems;

// // export default productSlice.reducer;




// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import {
//   fetchProductsByFilters,
//   fetchBrands,
//   fetchCategories,
//   fetchProductById,
//   createProduct,
//   updateProduct,
// } from './productAPI';

// const initialState = {
//   products: [],
//   brands: [],
//   categories: [],
//   status: 'idle',
//   nextCursor: null,
//   hasMore: true,
//   selectedProduct: null,
//   error: null,
//   // Track loaded product IDs to prevent duplicates
//   loadedProductIds: new Set(),
// };

// // ===== ASYNC THUNKS =====

// export const fetchProductByIdAsync = createAsyncThunk(
//   'product/fetchProductById',
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await fetchProductById(id);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchProductsByFiltersAsync = createAsyncThunk(
//   'product/fetchProductsByFilters',
//   async ({ filter, sort, cursor, admin }, { rejectWithValue, getState }) => {
//     try {
//       const response = await fetchProductsByFilters(filter, sort, cursor, admin);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchBrandsAsync = createAsyncThunk(
//   'product/fetchBrands',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetchBrands();
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const fetchCategoriesAsync = createAsyncThunk(
//   'product/fetchCategories',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetchCategories();
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const createProductAsync = createAsyncThunk(
//   'product/create',
//   async (product, { rejectWithValue }) => {
//     try {
//       const response = await createProduct(product);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const updateProductAsync = createAsyncThunk(
//   'product/update',
//   async (update, { rejectWithValue }) => {
//     try {
//       const response = await updateProduct(update);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // ===== SLICE =====

// export const productSlice = createSlice({
//   name: 'product',
//   initialState,
//   reducers: {
//     clearSelectedProduct: (state) => {
//       state.selectedProduct = null;
//     },
    
//     // Reset products when filters/sort change
//     resetProducts: (state) => {
//       state.products = [];
//       state.nextCursor = null;
//       state.hasMore = true;
//       state.loadedProductIds = new Set();
//       state.error = null;
//     },
    
//     // Clear all product data
//     clearProducts: (state) => {
//       state.products = [];
//       state.nextCursor = null;
//       state.hasMore = true;
//       state.loadedProductIds = new Set();
//     },
//   },
  
//   extraReducers: (builder) => {
//     builder
//       // ===== FETCH PRODUCTS BY FILTERS =====
//       .addCase(fetchProductsByFiltersAsync.pending, (state) => {
//         state.status = 'loading';
//         state.error = null;
//       })
//       .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
        
//         const { products, nextCursor, hasMore } = action.payload;

//         // ✅ PREVENT DUPLICATES - Filter out already loaded products
//         const newProducts = products.filter(
//           product => !state.loadedProductIds.has(product.id)
//         );

//         // Add new product IDs to tracking set
//         newProducts.forEach(product => {
//           state.loadedProductIds.add(product.id);
//         });

//         // ✅ APPEND new products (don't replace)
//         state.products.push(...newProducts);
        
//         // Update cursor and hasMore flag
//         state.nextCursor = nextCursor;
//         state.hasMore = hasMore !== undefined ? hasMore : (nextCursor !== null);
//       })
//       .addCase(fetchProductsByFiltersAsync.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload || 'Failed to fetch products';
//         state.hasMore = false;
//       })

//       // ===== FETCH BRANDS =====
//       .addCase(fetchBrandsAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.brands = action.payload;
//       })
//       .addCase(fetchBrandsAsync.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       // ===== FETCH CATEGORIES =====
//       .addCase(fetchCategoriesAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.categories = action.payload;
//       })
//       .addCase(fetchCategoriesAsync.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       // ===== FETCH PRODUCT BY ID =====
//       .addCase(fetchProductByIdAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.selectedProduct = action.payload;
//       })
//       .addCase(fetchProductByIdAsync.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       // ===== CREATE PRODUCT =====
//       .addCase(createProductAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(createProductAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
//         state.products.unshift(action.payload); // Add to beginning
//         state.loadedProductIds.add(action.payload.id);
//       })
//       .addCase(createProductAsync.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       // ===== UPDATE PRODUCT =====
//       .addCase(updateProductAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(updateProductAsync.fulfilled, (state, action) => {
//         state.status = 'idle';
//         const index = state.products.findIndex(
//           (product) => product.id === action.payload.id
//         );
//         if (index !== -1) {
//           state.products[index] = action.payload;
//         }
//         state.selectedProduct = action.payload;
//       })
//       .addCase(updateProductAsync.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       });
//   },
// });

// // ===== ACTIONS =====
// export const { clearSelectedProduct, resetProducts, clearProducts } = productSlice.actions;

// // ===== SELECTORS =====
// export const selectAllProducts = (state) => state.product.products;
// export const selectBrands = (state) => state.product.brands;
// export const selectCategories = (state) => state.product.categories;
// export const selectProductById = (state) => state.product.selectedProduct;
// export const selectProductListStatus = (state) => state.product.status;
// export const selectNextCursor = (state) => state.product.nextCursor;
// export const selectHasMore = (state) => state.product.hasMore;
// export const selectProductError = (state) => state.product.error;

// export default productSlice.reducer;



import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchProductsByFilters,
  fetchBrands,
  fetchCategories,
  fetchProductById,
  createProduct,
  updateProduct,
} from './productAPI';

const initialState = {
  products: [],
  brands: [],
  categories: [],
  status: 'idle',
  nextCursor: null,
  hasMore: true,
  selectedProduct: null,
  error: null,
  // ✅ FIXED: Use array instead of Set for Redux serialization
  loadedProductIds: [],
  // For backward compatibility with admin panel
  totalItems: 0,
};

// ===== ASYNC THUNKS =====

export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetchProductById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({ filter, sort, cursor, admin }, { rejectWithValue }) => {
    try {
      const response = await fetchProductsByFilters(filter, sort, cursor, admin);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchBrands();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCategories();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProductAsync = createAsyncThunk(
  'product/create',
  async (product, { rejectWithValue }) => {
    try {
      const response = await createProduct(product);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProductAsync = createAsyncThunk(
  'product/update',
  async (update, { rejectWithValue }) => {
    try {
      const response = await updateProduct(update);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ===== SLICE =====

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    
    // Reset products when filters/sort change
    resetProducts: (state) => {
      state.products = [];
      state.nextCursor = null;
      state.hasMore = true;
      state.loadedProductIds = [];
      state.error = null;
    },
    
    // Clear all product data
    clearProducts: (state) => {
      state.products = [];
      state.nextCursor = null;
      state.hasMore = true;
      state.loadedProductIds = [];
      state.totalItems = 0;
    },
  },
  
  extraReducers: (builder) => {
    builder
      // ===== FETCH PRODUCTS BY FILTERS =====
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        
        const { products, nextCursor, hasMore, totalCount } = action.payload;

        // ✅ PREVENT DUPLICATES using array includes (Redux-safe)
        const newProducts = products.filter(
          product => !state.loadedProductIds.includes(product.id)
        );

        // Add new product IDs to tracking array
        const newProductIds = newProducts.map(p => p.id);
        state.loadedProductIds.push(...newProductIds);

        // ✅ APPEND new products (don't replace)
        state.products.push(...newProducts);
        
        // Update cursor and hasMore flag
        state.nextCursor = nextCursor;
        state.hasMore = hasMore !== undefined ? hasMore : (nextCursor !== null);
        
        // ✅ BACKWARD COMPATIBILITY: Update totalItems if provided
        if (totalCount !== undefined) {
          state.totalItems = totalCount;
        } else {
          state.totalItems = state.products.length;
        }
      })
      .addCase(fetchProductsByFiltersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch products';
        state.hasMore = false;
      })

      // ===== FETCH BRANDS =====
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload;
      })
      .addCase(fetchBrandsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // ===== FETCH CATEGORIES =====
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // ===== FETCH PRODUCT BY ID =====
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductByIdAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // ===== CREATE PRODUCT =====
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.unshift(action.payload); // Add to beginning
        
        // Add to loaded IDs if not already present
        if (!state.loadedProductIds.includes(action.payload.id)) {
          state.loadedProductIds.push(action.payload.id);
        }
        
        state.totalItems = state.products.length;
      })
      .addCase(createProductAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // ===== UPDATE PRODUCT =====
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.selectedProduct = action.payload;
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// ===== ACTIONS =====
export const { clearSelectedProduct, resetProducts, clearProducts } = productSlice.actions;

// ===== SELECTORS =====
export const selectAllProducts = (state) => state.product.products;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectProductListStatus = (state) => state.product.status;
export const selectNextCursor = (state) => state.product.nextCursor;
export const selectHasMore = (state) => state.product.hasMore;
export const selectProductError = (state) => state.product.error;

// ✅ BACKWARD COMPATIBILITY: Export selectTotalItems for admin panel
export const selectTotalItems = (state) => state.product.totalItems;

export default productSlice.reducer;