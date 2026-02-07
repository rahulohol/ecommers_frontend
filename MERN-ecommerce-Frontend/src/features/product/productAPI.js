// // export function fetchProductById(id) {
// //   return new Promise(async (resolve) => {
// //     const response = await fetch('/products/' + id);
// //     const data = await response.json();
// //     resolve({ data });
// //   });
// // }

// // export function createProduct(product) {
// //   return new Promise(async (resolve) => {
// //     const response = await fetch('/products/', {
// //       method: 'POST',
// //       body: JSON.stringify(product),
// //       headers: { 'content-type': 'application/json' },
// //     });
// //     const data = await response.json();
// //     resolve({ data });
// //   });
// // }

// // export function updateProduct(update) {
// //   return new Promise(async (resolve) => {
// //     const response = await fetch(
// //       '/products/' + update.id,
// //       {
// //         method: 'PATCH',
// //         body: JSON.stringify(update),
// //         headers: { 'content-type': 'application/json' },
// //       }
// //     );
// //     const data = await response.json();
// //     resolve({ data });
// //   });
// // }

// // export function fetchProductsByFilters(filter, sort, pagination, admin) {
// //   // filter = {"category":["smartphone","laptops"]}
// //   // sort = {_sort:"price",_order="desc"}
// //   // pagination = {_page:1,_limit=10}

// //   let queryString = '';
// //   for (let key in filter) {
// //     const categoryValues = filter[key];
// //     if (categoryValues.length) {
// //       queryString += `${key}=${categoryValues}&`;
// //     }
// //   }
// //   for (let key in sort) {
// //     queryString += `${key}=${sort[key]}&`;
// //   }
// //   for (let key in pagination) {
// //     queryString += `${key}=${pagination[key]}&`;
// //   }
// //   if(admin){
// //     queryString += `admin=true`;
// //   }

// //   return new Promise(async (resolve) => {
// //     const response = await fetch(
// //       '/products?' + queryString
// //     );
// //     const data = await response.json();
// //     const totalItems = await response.headers.get('X-Total-Count');
// //     resolve({ data: { products: data, totalItems: +totalItems } });
// //   });
// // }

// // export function fetchCategories() {
// //   return new Promise(async (resolve) => {
// //     const response = await fetch('/categories');
// //     const data = await response.json();
// //     resolve({ data });
// //   });
// // }

// // export function fetchBrands() {
// //   return new Promise(async (resolve) => {
// //     const response = await fetch('/brands');
// //     const data = await response.json();
// //     resolve({ data });
// //   });
// // }

// // const baseUrl = process.env.REACT_APP_BACKEND_URL;

// // export function fetchProductById(id) {
// //   return new Promise(async (resolve) => {
// //     const response = await fetch(`${baseUrl}/products/${id}`);
// //     const data = await response.json();
// //     resolve({ data });
// //   });
// // }

// // export function createProduct(product) {
// //   return new Promise(async (resolve) => {
// //     const response = await fetch(`${baseUrl}/products/`, {
// //       method: "POST",
// //       body: JSON.stringify(product),
// //       headers: { "content-type": "application/json" },
// //     });
// //     const data = await response.json();
// //     resolve({ data });
// //   });
// // }

// // export function updateProduct(update) {
// //   return new Promise(async (resolve) => {
// //     const response = await fetch(`${baseUrl}/products/${update.id}`, {
// //       method: "PATCH",
// //       body: JSON.stringify(update),
// //       headers: { "content-type": "application/json" },
// //     });
// //     const data = await response.json();
// //     resolve({ data });
// //   });
// // }

// // // export function fetchProductsByFilters(filter, sort, pagination, admin) {
// // //   let queryString = "";
// // //   for (let key in filter) {
// // //     const categoryValues = filter[key];
// // //     if (categoryValues.length) {
// // //       queryString += `${key}=${categoryValues}&`;
// // //     }
// // //   }
// // //   for (let key in sort) {
// // //     queryString += `${key}=${sort[key]}&`;
// // //   }
// // //   for (let key in pagination) {
// // //     queryString += `${key}=${pagination[key]}&`;
// // //   }
// // //   if (admin) {
// // //     queryString += `admin=true`;
// // //   }

// // //   return new Promise(async (resolve) => {
// // //     const response = await fetch(`${baseUrl}/products?${queryString}`);
// // //     const data = await response.json();
// // //     const totalItems = await response.headers.get("X-Total-Count");
// // //     resolve({ data: { products: data, totalItems: +totalItems } });
// // //   });
// // // }


// // export function fetchProductsByFilters(filter, sort, cursor, admin) {
// //   let queryString = "";

// //   for (let key in filter) {
// //     const values = filter[key];
// //     if (values?.length) {
// //       queryString += `${key}=${values.join(",")}&`;
// //     }
// //   }

// //   for (let key in sort) {
// //     queryString += `${key}=${sort[key]}&`;
// //   }

// //   if (cursor) {
// //     queryString += `cursor=${cursor}&`;
// //   }

// //   queryString += `_limit=12&`; // items per batch

// //   if (admin) queryString += `admin=true`;

// //   return new Promise(async (resolve) => {
// //     const response = await fetch(`${baseUrl}/products?${queryString}`);
// //     const data = await response.json();

// //     resolve({
// //       data, // { data: [], nextCursor }
// //     });
// //   });
// // }


// // export function fetchCategories() {
// //   return new Promise(async (resolve) => {
// //     const response = await fetch(`${baseUrl}/categories`);
// //     const data = await response.json();
// //     resolve({ data });
// //   });
// // }

// // export function fetchBrands() {
// //   return new Promise(async (resolve) => {
// //     const response = await fetch(`${baseUrl}/brands`);
// //     const data = await response.json();
// //     resolve({ data });
// //   });
// // }


// const baseUrl = process.env.REACT_APP_BACKEND_URL;

// export function fetchProductById(id) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await fetch(`${baseUrl}/products/${id}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch product');
//       }
//       const data = await response.json();
//       resolve({ data });
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

// export function createProduct(product) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await fetch(`${baseUrl}/products/`, {
//         method: 'POST',
//         body: JSON.stringify(product),
//         headers: { 'content-type': 'application/json' },
//       });
//       if (!response.ok) {
//         throw new Error('Failed to create product');
//       }
//       const data = await response.json();
//       resolve({ data });
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

// export function updateProduct(update) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await fetch(`${baseUrl}/products/${update.id}`, {
//         method: 'PATCH',
//         body: JSON.stringify(update),
//         headers: { 'content-type': 'application/json' },
//       });
//       if (!response.ok) {
//         throw new Error('Failed to update product');
//       }
//       const data = await response.json();
//       resolve({ data });
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

// /**
//  * Fetch products with infinite scroll support
//  * @param {Object} filter - Filter criteria (category, brand)
//  * @param {Object} sort - Sort criteria (_sort, _order)
//  * @param {string|null} cursor - Cursor for pagination
//  * @param {boolean} admin - Admin mode flag
//  * @returns {Promise} - Products with nextCursor
//  */
// export function fetchProductsByFilters(filter, sort, cursor, admin) {
//   let queryString = '';

//   // ===== FILTERS =====
//   for (let key in filter) {
//     const values = filter[key];
//     if (values?.length) {
//       queryString += `${key}=${values.join(',')}&`;
//     }
//   }

//   // ===== SORTING =====
//   for (let key in sort) {
//     queryString += `${key}=${sort[key]}&`;
//   }

//   // ===== CURSOR =====
//   if (cursor) {
//     queryString += `cursor=${encodeURIComponent(cursor)}&`;
//   }

//   // ===== LIMIT =====
//   queryString += `_limit=12&`; // 12 items per batch for optimal UX

//   // ===== ADMIN MODE =====
//   if (admin) {
//     queryString += `admin=true&`;
//   }

//   // Remove trailing '&'
//   queryString = queryString.slice(0, -1);

//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await fetch(`${baseUrl}/products?${queryString}`);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();

//       resolve({
//         data: {
//           products: data.products || [],
//           nextCursor: data.nextCursor || null,
//           hasMore: data.hasMore || false,
//           count: data.count || 0,
//         },
//       });
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       reject(error);
//     }
//   });
// }

// export function fetchCategories() {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await fetch(`${baseUrl}/categories`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch categories');
//       }
//       const data = await response.json();
//       resolve({ data });
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

// export function fetchBrands() {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await fetch(`${baseUrl}/brands`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch brands');
//       }
//       const data = await response.json();
//       resolve({ data });
//     } catch (error) {
//       reject(error);
//     }
//   });
// }







const baseUrl = process.env.REACT_APP_BACKEND_URL;

// Store session ID in sessionStorage for consistency within a session
const SESSION_KEY = 'product_session_id';

function getSessionId() {
  if (typeof window === 'undefined') return null;
  
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    // Generate new session ID
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

export function fetchProductById(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${baseUrl}/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function createProduct(product) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${baseUrl}/products/`, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: { 'content-type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Failed to create product');
      }
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${baseUrl}/products/${update.id}`, {
        method: 'PATCH',
        body: JSON.stringify(update),
        headers: { 'content-type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Fetch products with infinite scroll support and session-based randomization
 * @param {Object} filter - Filter criteria (category, brand)
 * @param {Object} sort - Sort criteria (_sort, _order)
 * @param {string|null} cursor - Cursor for pagination
 * @param {boolean} admin - Admin mode flag
 * @returns {Promise} - Products with nextCursor
 */
export function fetchProductsByFilters(filter, sort, cursor, admin) {
  let queryString = '';

  // ===== FILTERS =====
  for (let key in filter) {
    const values = filter[key];
    if (values?.length) {
      queryString += `${key}=${values.join(',')}&`;
    }
  }

  // ===== SORTING =====
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  // ===== SESSION ID (for consistent randomization within session) =====
  // Only add session ID if no specific sort is applied (default random feed)
  const isDefaultFeed = !sort._sort || sort._sort === 'feedScore' || sort._sort === 'random';
  if (isDefaultFeed) {
    const sessionId = getSessionId();
    queryString += `sessionId=${sessionId}&`;
  }

  // ===== CURSOR =====
  if (cursor) {
    queryString += `cursor=${encodeURIComponent(cursor)}&`;
  }

  // ===== LIMIT =====
  queryString += `_limit=12&`;

  // ===== ADMIN MODE =====
  if (admin) {
    queryString += `admin=true&`;
  }

  // Remove trailing '&'
  queryString = queryString.slice(0, -1);

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${baseUrl}/products?${queryString}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();

      // Update session ID if server provides a new one
      if (data.sessionId && isDefaultFeed) {
        sessionStorage.setItem(SESSION_KEY, data.sessionId);
      }

      resolve({
        data: {
          products: data.products || [],
          nextCursor: data.nextCursor || null,
          hasMore: data.hasMore || false,
          count: data.count || 0,
        },
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      reject(error);
    }
  });
}

export function fetchCategories() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${baseUrl}/categories`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

export function fetchBrands() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${baseUrl}/brands`);
      if (!response.ok) {
        throw new Error('Failed to fetch brands');
      }
      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Clear the session ID to get a completely new random order
 * Call this when you want to "refresh" the feed
 */
export function clearProductSession() {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(SESSION_KEY);
  }
}

/**
 * Get current session ID
 */
export function getCurrentSessionId() {
  return getSessionId();
}