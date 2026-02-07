// // import { useSelector } from "react-redux";
// // import { Navigate } from "react-router-dom";
// // import { selectLoggedInUser } from "../authSlice";

// // function Protected({ children }) {
// //   const user = useSelector(selectLoggedInUser);

// //   if (!user) {
// //     return <Navigate to="/login" replace={true}></Navigate>;
// //   }

// //   return children;
// // }

// // export default Protected;



// import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { selectLoggedInUser } from '../authSlice';

// function ProtectedRoute({ adminOnly = false }) {


// // Instead of reading ONLY from Redux like:
// //   const user = useSelector(selectLoggedInUser);
// //   if (!user) return null;   ← THIS is your blank screen

// // Read from BOTH Redux AND localStorage as fallback:
// const reduxUser = useSelector(selectLoggedInUser);
// const user = reduxUser || JSON.parse(localStorage.getItem("profile"));
// console.log("ProtectedRoute user:", user, "Redux user:", reduxUser);

//   // const { user }  = useSelector((state) => state.auth);
//   // const userInfo  = useSelector((state) => state.user.userInfo);
  
//   const role      = user?.result?.role;
//   console.log("ProtectedRoute role:", role);

//   // not logged in at all
//   if (!user) return <Navigate to="/login" replace />;

//   // "/" route hit by an admin  →  bounce to /admin
//   // (wire this up on the route that renders "/")
//   if (role === 'admin' && window.location.pathname === '/') {
//     return <Navigate to="/admin" replace />;
//   }

//   // optional: block non-admins from /admin/*
//   if (adminOnly && role !== 'admin') {
//     console.log("ProtectedRoute: Access denied. User role:", role);
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// }
// export default ProtectedRoute;




// ProtectedRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../authSlice";

function ProtectedRoute({ adminOnly = false }) {
  const location = useLocation();
  const reduxUser = useSelector(selectLoggedInUser);
  const user = reduxUser || JSON.parse(localStorage.getItem("profile"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const role = user?.result?.role;

  // admin landing rule
  if ((role === "admin"  || role ==="superadmin") && location.pathname === "/") {
    return <Navigate to="/admin" replace />;
  }

  // admin-only pages
  if (adminOnly && role !== "admin" && role !== "superadmin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
