// import { Counter } from "./features/counter/Counter";
// import "./App.css";
// import Home from "./pages/Home";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";

// import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";
// import CartPage from "./pages/CartPage";
// import Checkout from "./pages/Checkout";
// import ProductDetailPage from "./pages/ProductDetailPage";
// import Protected from "./features/auth/components/Protected";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   checkAuthAsync,
//   selectLoggedInUser,
//   selectUserChecked,
// } from "./features/auth/authSlice";

// import { setUser } from "./features/auth/authSlice";

// import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
// import PageNotFound from "./pages/404";
// import OrderSuccessPage from "./pages/OrderSuccessPage";
// import UserOrdersPage from "./pages/UserOrdersPage";
// import UserProfilePage from "./pages/UserProfilePage";
// import { fetchLoggedInUserAsync } from "./features/user/Usermanagementslice";
// import Logout from "./features/auth/components/Logout";
// import ForgotPasswordPage from "./pages/ForgotPasswordPage";
// import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
// import AdminHome from "./pages/AdminHome";
// import AdminProductDetailPage from "./pages/AdminProductDetailPage";
// import AdminProductFormPage from "./pages/AdminProductFormPage";
// import AdminOrdersPage from "./pages/AdminOrdersPage";
// import { positions, Provider } from "react-alert";
// import AlertTemplate from "react-alert-template-basic";
// import StripeCheckout from "./pages/StripeCheckout";
// import ResetPasswordPage from "./pages/ResetPasswordPage";
// import OrderSuccess from "./pages/Ordersuccess";
// import OrderFailed from "./pages/Orderfailed";
// import OrderTrackingPage from "./pages/Ordertrackingpage";
// import SearchResults from "./features/product/components/Searchresults";

// const options = {
//   timeout: 5000,
//   position: positions.BOTTOM_LEFT,
// };

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <Protected>
//         <Home></Home>
//       </Protected>
//     ),
//   },
//   {
//     path: "/admin",
//     element: (
//       <ProtectedAdmin>
//         <AdminHome></AdminHome>
//       </ProtectedAdmin>
//     ),
//   },
//   {
//     path: "/login",
//     element: <LoginPage></LoginPage>,
//   },
//   {
//     path: "/signup",
//     element: <SignupPage></SignupPage>,
//   },
//   {
//     path: "/cart",
//     element: (
//       <Protected>
//         <CartPage></CartPage>
//       </Protected>
//     ),
//   },
//   {
//     path: "/checkout",
//     element: (
//       <Protected>
//         <Checkout></Checkout>
//       </Protected>
//     ),
//   },
//   {
//     path: "/product-detail/:id",
//     element: (
//       <Protected>
//         <ProductDetailPage></ProductDetailPage>
//       </Protected>
//     ),
//   },
//   {
//     path: "/admin/product-detail/:id",
//     element: (
//       <ProtectedAdmin>
//         <AdminProductDetailPage></AdminProductDetailPage>
//       </ProtectedAdmin>
//     ),
//   },
//   {
//     path: "/admin/product-form",
//     element: (
//       <ProtectedAdmin>
//         <AdminProductFormPage></AdminProductFormPage>
//       </ProtectedAdmin>
//     ),
//   },
//   {
//     path: "/admin/orders",
//     element: (
//       <ProtectedAdmin>
//         <AdminOrdersPage></AdminOrdersPage>
//       </ProtectedAdmin>
//     ),
//   },
//   {
//     path: "/admin/product-form/edit/:id",
//     element: (
//       <ProtectedAdmin>
//         <AdminProductFormPage></AdminProductFormPage>
//       </ProtectedAdmin>
//     ),
//   },
//   {
//     path: "/order-success/:id",
//     element: (
//       <Protected>
//         <OrderSuccess></OrderSuccess>{" "}
//       </Protected>
//     ),
//   },
//   {
//     path: "/my-orders",
//     element: (
//       <Protected>
//         <UserOrdersPage></UserOrdersPage>{" "}
//       </Protected>
//     ),
//   },
//   {
//     path: "/order-tracking/:id",
//     element: (
//       <Protected>
//         <OrderTrackingPage />
//       </Protected>
//     ),
//   },
//   {
//     path: "/search",
//     element: (
//       <SearchResults />
//     )
//   },



//  {
//     path:"/admin/orders",
//     element:(
//       <ProtectedAdmin>
//         <AdminOrdersPage />
//       </ProtectedAdmin>
//     )
//   },

//   {
//     path: "/profile",
//     element: (
//       <Protected>
//         <UserProfilePage></UserProfilePage>{" "}
//       </Protected>
//     ),
//   },
//   {
//     path: "/stripe-checkout/",
//     element: (
//       <Protected>
//         <StripeCheckout></StripeCheckout>
//       </Protected>
//     ),
//   },
//   {
//     path: "/logout",
//     element: <Logout></Logout>,
//   },
//   {
//     path: "/forgot-password",
//     element: <ForgotPasswordPage></ForgotPasswordPage>,
//   },
//   {
//     path: "/reset-password",
//     element: <ResetPasswordPage></ResetPasswordPage>,
//   },
//     {
//     path: "/order-success/:id",
//     element: (
//       <Protected>
//         <OrderSuccess></OrderSuccess>
//       </Protected>
//     ),
//   },
//   // Add this new route for order failure
//   {
//     path: "/order-failed",
//     element: (
//       <Protected>
//         <OrderFailed></OrderFailed>
//       </Protected>
//     ),
//   },
  
//   {
//     path: "*",
//     element: <PageNotFound></PageNotFound>,
//   },
// ]);

// function App() {
//   // const dispatch = useDispatch();
//   // const user = useSelector(selectLoggedInUser);
//   const userChecked = useSelector(selectUserChecked);

//   const dispatch = useDispatch();
//   const user = JSON.parse(localStorage.getItem("profile"));
//   useEffect(() => {
//     dispatch(setUser(user));
//   }, []);

//   // useEffect(() => {
//   //   dispatch(checkAuthAsync());
//   // }, [dispatch]);

//   useEffect(() => {
//     if (user) {
//       dispatch(fetchItemsByUserIdAsync());
//       // we can get req.user by token on backend so no need to give in front-end
//       dispatch(fetchLoggedInUserAsync());
//     }
//   }, [dispatch, user]);

//   return (
//     <>
//       <div className="App">
//         {/* {userChecked && ( */}
//         {true && (
//           <Provider template={AlertTemplate} {...options}>
//             <RouterProvider router={router} />
//           </Provider>
//         )}
//         {/* Link must be inside the Provider */}
//       </div>
//     </>
//   );
// }

// export default App;




import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserChecked } from "./features/auth/authSlice";
import { setUser } from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import PageNotFound from "./pages/404";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/Usermanagementslice";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import StripeCheckout from "./pages/StripeCheckout";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import OrderSuccess from "./pages/Ordersuccess";
import OrderFailed from "./pages/Orderfailed";
import OrderTrackingPage from "./pages/Ordertrackingpage";
import SearchResults from "./features/product/components/Searchresults";
import ProtectedRoute from "./features/auth/components/Protected";
import AdminProductEditPage from "./pages/AdminProductEditPage";
import AdminUserManagementPage from "./pages/AdminUserManagementPage";

/* ============================================================
   AdminRedirect — sits on the "/" route.
   If the logged-in user is an admin, it returns <Navigate to="/admin" />.
   Otherwise it renders <Home /> as normal.
   No hooks needed outside the router — Navigate works anywhere.
   ============================================================ */
function AdminRedirect() {
  const user = JSON.parse(localStorage.getItem("profile"));

  if (user && user.result.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Home />;
}

// /* ============================================================
//    Router config
//    ============================================================ */

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};

// const router = createBrowserRouter([
//   // ── "/" ── admin lands on /admin, everyone else sees Home
//   {
//     path: "/",
//     element: (
//       <Protected>
//         <AdminRedirect />
//       </Protected>
//     ),
//   },

//   // ── admin pages ──
//   {
//     path: "/admin",
//     element: (
//       <ProtectedAdmin>
//         <AdminHome />
//       </ProtectedAdmin>
//     ),
//   },
//   {
//     path: "/admin/product-detail/:id",
//     element: (
//       <ProtectedAdmin>
//         <AdminProductDetailPage />
//       </ProtectedAdmin>
//     ),
//   },
//   {
//     path: "/admin/product-form",
//     element: (
//       <ProtectedAdmin>
//         <AdminProductFormPage />
//       </ProtectedAdmin>
//     ),
//   },
//   {
//     path: "/admin/product-form/edit/:id",
//     element: (
//       <ProtectedAdmin>
//         <AdminProductFormPage />
//       </ProtectedAdmin>
//     ),
//   },
//   {
//     path: "/admin/orders",                          // ← was duplicated, kept once
//     element: (
//       <ProtectedAdmin>
//         <AdminOrdersPage />
//       </ProtectedAdmin>
//     ),
//   },

//   // ── auth pages ──
//   {
//     path: "/login",
//     element: <LoginPage />,
//   },
//   {
//     path: "/signup",
//     element: <SignupPage />,
//   },
//   {
//     path: "/logout",
//     element: <Logout />,
//   },
//   {
//     path: "/forgot-password",
//     element: <ForgotPasswordPage />,
//   },
//   {
//     path: "/reset-password",
//     element: <ResetPasswordPage />,
//   },

//   // ── user pages ──
//   {
//     path: "/cart",
//     element: (
//       <Protected>
//         <CartPage />
//       </Protected>
//     ),
//   },
//   {
//     path: "/checkout",
//     element: (
//       <Protected>
//         <Checkout />
//       </Protected>
//     ),
//   },
//   {
//     path: "/product-detail/:id",
//     element: (
//       <Protected>
//         <ProductDetailPage />
//       </Protected>
//     ),
//   },
//   {
//     path: "/my-orders",
//     element: (
//       <Protected>
//         <UserOrdersPage />
//       </Protected>
//     ),
//   },
//   {
//     path: "/order-success/:id",                     // ← was duplicated, kept once
//     element: (
//       <Protected>
//         <OrderSuccess />
//       </Protected>
//     ),
//   },
//   {
//     path: "/order-failed",
//     element: (
//       <Protected>
//         <OrderFailed />
//       </Protected>
//     ),
//   },
//   {
//     path: "/order-tracking/:id",
//     element: (
//       <Protected>
//         <OrderTrackingPage />
//       </Protected>
//     ),
//   },
//   {
//     path: "/profile",
//     element: (
//       <Protected>
//         <UserProfilePage />
//       </Protected>
//     ),
//   },
//   {
//     path: "/stripe-checkout/",
//     element: (
//       <Protected>
//         <StripeCheckout />
//       </Protected>
//     ),
//   },

//   // ── search ──
//   {
//     path: "/search",
//     element: <SearchResults />,
//   },

//   // ── fallback ──
//   {
//     path: "*",
//     element: <PageNotFound />,
//   },
// ]);

// /* ============================================================
//    App
//    ============================================================ */

// function App() {
//   const userChecked = useSelector(selectUserChecked);
//   const dispatch    = useDispatch();
//   const user        = JSON.parse(localStorage.getItem("profile"));

//   useEffect(() => {
//     dispatch(setUser(user));
//   }, []);

//   useEffect(() => {
//     if (user) {
//       dispatch(fetchItemsByUserIdAsync());
//       dispatch(fetchLoggedInUserAsync());
//     }
//   }, [dispatch, user]);

//   return (
//     <div className="App">
//       <Provider template={AlertTemplate} {...options}>
//         <RouterProvider router={router} />
//       </Provider>
//     </div>
//   );
// }

// export default App;



const router = createBrowserRouter([
  // ───────────────── USER AREA ─────────────────
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/product-detail/:id", element: <ProductDetailPage /> },
      { path: "/my-orders", element: <UserOrdersPage /> },
      { path: "/profile", element: <UserProfilePage /> },
      { path: "/stripe-checkout", element: <StripeCheckout /> },
      { path: "/order-success/:id", element: <OrderSuccess /> },
      { path: "/order-failed", element: <OrderFailed /> },
      { path: "/order-tracking/:id", element: <OrderTrackingPage /> },
    ],
  },

  // ───────────────── ADMIN AREA ─────────────────
  {
    element: <ProtectedRoute adminOnly />,
    children: [
      { path: "/admin", element: <AdminHome /> },
      { path: "/admin/product-detail/:id", element: <AdminProductDetailPage /> },
      { path: "/admin/product-form", element: <AdminProductFormPage /> },
      { path: "/admin/product-form/edit/:id", element: <AdminProductEditPage /> },
      { path: "/admin/orders", element: <AdminOrdersPage /> },
      {path: "/admin/user-management", element: <AdminUserManagementPage />},
      // { path: "/admin/products/edit/:id", element: <EditProduct /> }
    ],
  },

  // ───────────────── PUBLIC ─────────────────
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/logout", element: <Logout /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },
  { path: "/search", element: <SearchResults /> },

  { path: "*", element: <PageNotFound /> },
]);



function App() {
  const userChecked = useSelector(selectUserChecked);
  const dispatch    = useDispatch();
  const user        = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user));
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      <Provider template={AlertTemplate} {...options}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
