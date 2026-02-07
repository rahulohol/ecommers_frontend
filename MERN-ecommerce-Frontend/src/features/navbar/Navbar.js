// import { Fragment } from "react";
// import { Disclosure, Menu, Transition } from "@headlessui/react";
// import {
//   Bars3Icon,
//   ShoppingCartIcon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { selectItems } from "../cart/cartSlice";
// import { selectLoggedInUser, setLogout } from "../auth/authSlice";
// import { selectUserInfo } from "../user/Usermanagementslice";
// import decode from "jwt-decode";
// import { FaUserCircle } from "react-icons/fa";

// const navigation = [
//   { name: "Products", link: "/admin", admin: true },
//   { name: "Orders", link: "/admin/orders", admin: true },
// ];

// const userProductNavigation = [{ name: "Products", link: "/", user: true }];

// const userNavigation = [
//   { name: "My Profile", link: "/profile" },
//   { name: "My Orders", link: "/my-orders" },
//   { name: "Sign out", link: "/logout" },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// function NavBar({ children }) {
//   const items = useSelector(selectItems);
//   const userInfo = useSelector(selectUserInfo);

//   let renderProductRoutes =
//     userInfo?.role === "admin" ? navigation : userProductNavigation;

//   const { user } = useSelector((state) => ({ ...state.auth }));

//   console.log(user);

//   const dispatch = useDispatch();

//   const token = user?.token;
//   if (token) {
//     const decodedToken = decode(token);
//     if (decodedToken.exp * 1000 < new Date().getTime()) {
//       dispatch(setLogout());
//     }
//   }

//   const handleLogout = (index) => {
//     if (index === 2) {
//       dispatch(setLogout());
//     }
//   };

//   return (
//     <>
//       {userInfo && (
//         <div className="min-h-full">
//           <Disclosure as="nav" className="bg-gray-800">
//             {({ open }) => (
//               <>
//                 <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
//                   <div className="flex h-16 items-center justify-between">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0">
//                         <Link
//                           to="/"
//                           className="flex align-middle"
//                           style={{ display: "flex", alignItems: "center" }}
//                         >
//                           <img
//                             className=" mx-auto h-12"
//                             src="https://res.cloudinary.com/dl9paroz9/image/upload/v1696847749/download_mnox7s.webp"
//                             alt="StyleVista"
//                           />
//                           <Link
//                             to="/"
//                             className="text-3xl font-bold tracking-tight ml-1 text-gray-300"
//                           >
//                             <h1 className="text-center font-bold text-2xl tracking-tight">
//                               <span className="bg-gradient-to-r text-transparent from-yellow-500 via-orange-500  to-red-500 bg-clip-text">
//                                 StyleVista
//                               </span>
//                             </h1>
//                             {/* StyleVista */}
//                           </Link>
//                           {/* <img
//                             className="h-8 w-8"
//                             src="https://res.cloudinary.com/dl9paroz9/image/upload/v1696848218/download_1_wr8s3u.webp"
//                             alt="StyleVista"
//                           /> */}
//                         </Link>
//                       </div>
//                       <div className="hidden md:block">
//                         <div className="ml-10 flex items-baseline space-x-4">
//                           {renderProductRoutes?.map((item) =>
//                             item[userInfo.role] ? (
//                               <Link
//                                 key={item.name}
//                                 to={item.link}
//                                 className={classNames(
//                                   item.current
//                                     ? "bg-gray-900 text-white"
//                                     : "text-gray-300 hover:bg-gray-700 hover:text-white",
//                                   "rounded-md px-3 py-2 text-sm font-medium"
//                                 )}
//                                 aria-current={item.current ? "page" : undefined}
//                               >
//                                 {item.name}
//                               </Link>
//                             ) : null
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="hidden md:block">
//                       <div className="ml-4 flex items-center md:ml-6">
//                         <Link
//                           to="/cart"
//                           style={{ display: "flex", alignItems: "center" }}
//                         >
//                           <span className=" text-white">Cart</span>
//                           <button
//                             type="button"
//                             className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                           >
//                             <span className="sr-only">View notifications</span>

//                             <ShoppingCartIcon
//                               className="h-6 w-6"
//                               aria-hidden="true"
//                             />
//                           </button>
//                         </Link>
//                         {items.length > 0 && (
//                           <span className="inline-flex items-center rounded-md mb-7 -ml-3 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
//                             {items.length}
//                           </span>
//                         )}

//                         {/* Profile dropdown */}
//                         <Menu as="div" className="relative ml-3">
//                           <div>
//                             <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                               <span className="sr-only">Open user menu</span>
//                             { userInfo.imgpath ? <img
//                                 className="h-6 w-6 rounded-full"
//                                 src={userInfo.imgpath}
//                                 alt=""
//                               /> : <FaUserCircle className="h-6 w-6 text-white" />}
//                               <span className="text-white ml-1">
//                                 Hi, {userInfo.firstName}
//                               </span>
//                             </Menu.Button>
//                           </div>
//                           <Transition
//                             as={Fragment}
//                             enter="transition ease-out duration-100"
//                             enterFrom="transform opacity-0 scale-95"
//                             enterTo="transform opacity-100 scale-100"
//                             leave="transition ease-in duration-75"
//                             leaveFrom="transform opacity-100 scale-100"
//                             leaveTo="transform opacity-0 scale-95"
//                           >
//                             <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                               {userNavigation.map((item, index) => (
//                                 <Menu.Item key={item.name}>
//                                   {({ active }) => (
//                                     <Link
//                                       to={item.link}
//                                       className={classNames(
//                                         active ? "bg-gray-100" : "",
//                                         "block px-4 py-2 text-sm text-gray-700"
//                                       )}
//                                       onClick={() => handleLogout(index)}
//                                     >
//                                       {item.name}
//                                     </Link>
//                                   )}
//                                 </Menu.Item>
//                               ))}
//                             </Menu.Items>
//                           </Transition>
//                         </Menu>
//                       </div>
//                     </div>
//                     <div className="-mr-2 flex md:hidden">
//                       {/* Mobile menu button */}
//                       <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                         <span className="sr-only">Open main menu</span>
//                         {open ? (
//                           <XMarkIcon
//                             className="block h-6 w-6"
//                             aria-hidden="true"
//                           />
//                         ) : (
//                           <Bars3Icon
//                             className="block h-6 w-6"
//                             aria-hidden="true"
//                           />
//                         )}
//                       </Disclosure.Button>
//                     </div>
//                   </div>
//                 </div>

//                 <Disclosure.Panel className="md:hidden">
//                   <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
//                     {renderProductRoutes.map((item) => (
//                       <Disclosure.Button
//                         key={item.name}
//                         as="a"
//                         href={item.link}
//                         className={classNames(
//                           item.current
//                             ? "bg-gray-900 text-white"
//                             : "text-gray-300 hover:bg-gray-700 hover:text-white",
//                           "block rounded-md px-3 py-2 text-base font-medium"
//                         )}
//                         aria-current={item.current ? "page" : undefined}
//                       >
//                         {item.name}
//                       </Disclosure.Button>
//                     ))}
//                   </div>
//                   <div className="border-t border-gray-700 pb-3 pt-4">
//                     <div className="flex items-center px-5">
//                       <div className="flex-shrink-0">
//                         <img
//                           className="h-10 w-10 rounded-full"
//                           src={userInfo?.imgpath}
//                           alt=""
//                         />
//                       </div>
//                       <div className="ml-3">
//                         <div className="text-base font-medium leading-none text-white">
//                           {/* this should come from userInfo */}
//                           {userInfo.firstName} {userInfo.lastName}
//                         </div>
//                         {/* <div className="text-sm font-medium leading-none text-gray-400">
//                           {userInfo.email}
//                         </div> */}
//                       </div>
//                       <Link to="/cart">
//                         <button
//                           type="button"
//                           className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                         >
//                           <ShoppingCartIcon
//                             className="h-6 w-6"
//                             aria-hidden="true"
//                           />{" "}
//                         </button>
//                       </Link>
//                       {items.length > 0 && (
//                         <span className="inline-flex items-center rounded-md bg-red-50 mb-7 -ml-3 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
//                           {items.length}
//                         </span>
//                       )}
//                     </div>

//                     <div className="mt-3 space-y-1 px-2">
//                       {userNavigation.map((item, index) => (
//                         <Disclosure.Button
//                           key={item.name}
//                           as="a"
//                           // to={item.link}
//                           className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
//                         >
//                           {/* {item.name} */}

//                           <Link
//                             to={item.link}
//                             onClick={() => handleLogout(index)}
//                           >
//                             {item.name}
//                           </Link>
//                         </Disclosure.Button>
//                       ))}
//                     </div>
//                   </div>
//                 </Disclosure.Panel>
//               </>
//             )}
//           </Disclosure>

//           <main>
//             <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
//               {children}
//             </div>
//           </main>
//         </div>
//       )}
//     </>
//   );
// }

// export default NavBar;


// 'use client';

// import { Fragment, useEffect } from 'react';
// import { Disclosure, Menu, Transition } from '@headlessui/react';
// import {
//   Bars3Icon,
//   ShoppingCartIcon,
//   XMarkIcon,
// } from '@heroicons/react/24/outline';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import decode from 'jwt-decode';
// import { FaUserCircle } from 'react-icons/fa';

// import { selectItems } from '../cart/cartSlice';
// import { setLogout } from '../auth/authSlice';
// import {
//   selectUserInfo,
//   clearUserInfo,
//   fetchLoggedInUserAsync,
// } from '../user/Usermanagementslice';

// /* ==================== NAV CONFIG ==================== */

// const adminNavigation = [
//   { name: 'Products', link: '/admin' },
//   { name: 'Orders', link: '/admin/orders' },
// ];

// const userNavigationRoutes = [
//   { name: 'Products', link: '/' },
// ];

// const profileMenu = [
//   { name: 'My Profile', link: '/profile' },
//   { name: 'My Orders', link: '/my-orders' },
//   { name: 'Sign out', link: '/logout' },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// function NavBar({ children }) {
//   const dispatch = useDispatch();

//   const items = useSelector(selectItems);
//   const userInfo = useSelector(selectUserInfo);
//   const { user } = useSelector((state) => state.auth);

//   /* ==================== AUTH SAFETY ==================== */

//   useEffect(() => {
//     if (!user?.token) return;

//     const decoded = decode(user.token);
//     if (decoded.exp * 1000 < Date.now()) {
//       dispatch(setLogout());
//       dispatch(clearUserInfo());
//     }
//   }, [user?.token, dispatch]);

//   /* ==================== FETCH USER PROFILE ==================== */

//   useEffect(() => {
//     if (user?.token) {
//       dispatch(fetchLoggedInUserAsync());
//     }
//   }, [user?.token, dispatch]);

//   /* ==================== LOGOUT ==================== */

//   const handleLogout = () => {
//     dispatch(setLogout());
//     dispatch(clearUserInfo());
//   };

//   /* ==================== ROLE-BASED ROUTES ==================== */

//   const role = user?.role || userInfo?.role;

//   const productRoutes =
//     role === 'admin' ? adminNavigation : userNavigationRoutes;

//   if (!userInfo) return null;

//   return (
//     <div className="min-h-full">
//       <Disclosure as="nav" className="bg-gray-800">
//         {({ open }) => (
//           <>
//             <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
//               <div className="flex h-16 items-center justify-between">
//                 {/* LOGO */}
//                 <Link to="/" className="text-2xl font-bold text-white">
//                   StyleVista
//                 </Link>

//                 {/* DESKTOP NAV */}
//                 <div className="hidden md:flex space-x-4">
//                   {productRoutes.map((item) => (
//                     <Link
//                       key={item.name}
//                       to={item.link}
//                       className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm"
//                     >
//                       {item.name}
//                     </Link>
//                   ))}
//                 </div>

//                 {/* RIGHT MENU */}
//                 <div className="flex items-center space-x-4">
//                   <Link to="/cart" className="relative text-white">
//                     <ShoppingCartIcon className="h-6 w-6" />
//                     {items.length > 0 && (
//                       <span className="absolute -top-2 -right-2 bg-red-600 text-xs px-2 rounded-full">
//                         {items.length}
//                       </span>
//                     )}
//                   </Link>

//                   <Menu as="div" className="relative">
//                     <Menu.Button className="flex items-center text-white">
//                       {userInfo.imgpath ? (
//                         <img
//                           src={userInfo.imgpath}
//                           className="h-6 w-6 rounded-full"
//                           alt=""
//                         />
//                       ) : (
//                         <FaUserCircle className="h-6 w-6" />
//                       )}
//                       <span className="ml-2">Hi, {userInfo.firstName}</span>
//                     </Menu.Button>

//                     <Transition
//                       as={Fragment}
//                       enter="transition ease-out duration-100"
//                       enterFrom="opacity-0 scale-95"
//                       enterTo="opacity-100 scale-100"
//                       leave="transition ease-in duration-75"
//                       leaveFrom="opacity-100 scale-100"
//                       leaveTo="opacity-0 scale-95"
//                     >
//                       <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
//                         {profileMenu.map((item) => (
//                           <Menu.Item key={item.name}>
//                             {({ active }) => (
//                               <Link
//                                 to={item.link}
//                                 onClick={
//                                   item.name === 'Sign out'
//                                     ? handleLogout
//                                     : undefined
//                                 }
//                                 className={classNames(
//                                   active && 'bg-gray-100',
//                                   'block px-4 py-2 text-sm text-gray-700'
//                                 )}
//                               >
//                                 {item.name}
//                               </Link>
//                             )}
//                           </Menu.Item>
//                         ))}
//                       </Menu.Items>
//                     </Transition>
//                   </Menu>
//                 </div>

//                 {/* MOBILE BUTTON */}
//                 <Disclosure.Button className="md:hidden text-gray-300">
//                   {open ? (
//                     <XMarkIcon className="h-6 w-6" />
//                   ) : (
//                     <Bars3Icon className="h-6 w-6" />
//                   )}
//                 </Disclosure.Button>
//               </div>
//             </div>
//           </>
//         )}
//       </Disclosure>

//       <main className="mx-auto max-w-7xl py-6 px-4">{children}</main>
//     </div>
//   );
// }

// export default NavBar;



'use client';

import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
  ChevronDownIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode';
import { FaUserCircle } from 'react-icons/fa';

import { selectItems } from '../cart/cartSlice';
import { setLogout } from '../auth/authSlice';
import {
  selectUserInfo,
  clearUserInfo,
  fetchLoggedInUserAsync,
} from '../user/Usermanagementslice';
// import SearchBar from '../search/components/SearchBar';
import SearchBar from '../product/components/Searchbar';
import LocationModal from './LocationModal';
import Footer from '../common/Footer';

/* ==================== NAV CONFIG ==================== */

const adminNavigation = [
  { name: 'Products', link: '/admin' },
  { name: 'Orders', link: '/admin/orders' },
  { name: 'User Management', link: '/admin/user-management' }
];

const userNavigationRoutes = [
  { name: 'Products', link: '/' },
];

const profileMenu = [
  { name: 'My Profile', link: '/profile' },
  { name: 'My Orders', link: '/my-orders' },
  { name: 'Sign out', link: '/logout' },
];

const categoryTabs = [
  { name: 'All', link: '/' },
  { name: 'Electronics', link: '/?category=Electronics' },
  { name: 'Clothing', link: '/?category=Clothing' },
  { name: 'Home & Garden', link: '/?category=Home%20%26%20Garden' },
  { name: 'Sports', link: '/?category=Sports' },
  { name: 'Books', link: '/?category=Books' },
  { name: 'Toys', link: '/?category=Toys' },
  { name: 'Deals', link: '/deals' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

/* ==================== MAIN NAVBAR ==================== */

function NavBar({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector(selectItems);
  const userInfo = useSelector(selectUserInfo);
  const { user } = useSelector((state) => state.auth);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState('All');

 const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState({
  city: "",
  pincode: "",
});

  // Persist location (Amazon-like)
  useEffect(() => {
    const saved = localStorage.getItem("location");
    if (saved) setLocation(JSON.parse(saved));
    if(!saved) setShowModal(true);
  }, []);

  const handleApply = (loc) => {
    setLocation(loc);
    localStorage.setItem("location", JSON.stringify(loc));
  };



  /* ==================== AUTH SAFETY ==================== */

  useEffect(() => {
    if (!user?.token) return;

    const decoded = decode(user.token);
    if (decoded.exp * 1000 < Date.now()) {
      dispatch(setLogout());
      dispatch(clearUserInfo());
    }
  }, [user?.token, dispatch]);

  /* ==================== FETCH USER PROFILE ==================== */

  useEffect(() => {
    if (user?.token) {
      dispatch(fetchLoggedInUserAsync());
    }
  }, [user?.token, dispatch]);

  /* ==================== LOGOUT ==================== */

  const handleLogout = () => {
    dispatch(setLogout());
    dispatch(clearUserInfo());
  };

  /* ==================== ROLE-BASED ROUTES ==================== */

  const role = user?.role || userInfo?.role;
  const productRoutes = role === 'admin' || role === 'superadmin' ? adminNavigation : userNavigationRoutes;
  const isAdmin = role === 'admin' || role === 'superadmin';

  if (!userInfo) return null;

  /* ==================== CART TOTAL ITEMS ==================== */
  const cartCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  /* ==================== RENDER ==================== */

  return (
    <div className="min-h-full flex flex-col" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* ============================================================
           TOP UTILITY BAR — tiny strip (Amazon-style)
          ============================================================ */}
      <div className="bg-[#111827] text-[#d1d5db] text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-7">
            <span className="hidden sm:inline text-[#9ca3af] hover:text-white cursor-pointer transition-colors">
              🚚 Free delivery on orders above ₹499
            </span>
            <div className="flex items-center gap-4 ml-auto">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-[#f59e0b] font-semibold hover:underline transition-colors"
                >
                  Admin Panel
                </Link>
              )}
              <span className="text-[#9ca3af]">|</span>
              <span className="text-[#9ca3af] hover:text-white cursor-pointer transition-colors">
                Help
              </span>
              <span className="text-[#9ca3af]">|</span>
              <span className="text-[#9ca3af] hover:text-white cursor-pointer transition-colors">
                EN
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
           MAIN NAVBAR ROW — logo | deliver-to | search | account | cart
          ============================================================ */}
      <div className="bg-[#1a1a2e] sticky top-0 z-50 shadow-md">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="flex items-center h-14 gap-2 sm:gap-4">

            {/* --- LOGO --- */}
            <Link
              to="/"
              className="flex-shrink-0 flex items-center gap-1.5 group"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                   style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>
                <span className="text-white font-extrabold text-sm">S</span>
              </div>
              <span className="text-white font-bold text-lg tracking-tight hidden sm:inline group-hover:text-[#f59e0b] transition-colors">
                Style<span className="text-[#f59e0b]">Vista</span>
              </span>
            </Link>
   {showModal && (
        <LocationModal
          onClose={() => setShowModal(false)}
          onApply={handleApply}
        />
      )}
            {/* --- DELIVER TO (desktop only) --- */}
            <div onClick={()=>setShowModal(true)} className="hidden lg:flex items-center gap-1.5 ml-2 cursor-pointer group">
              <MapPinIcon className="w-4 h-4 text-[#d1d5db] group-hover:text-[#f59e0b] transition-colors" />
              <div>
                <p className="text-[#9ca3af] text-[10px] leading-none">Deliver to</p>
                <p className="text-white text-xs font-semibold leading-tight group-hover:text-[#f59e0b] transition-colors">
                  {location.city} {location.pincode}
                </p>
              </div>
              <ChevronDownIcon className="w-3 h-3 text-[#9ca3af] mt-0.5" />
            </div>

            {/* --- SEARCH BAR (flex-grow) --- */}
            <div className="flex-1 min-w-0">
              <SearchBar placeholder="Search products, brands, categories…" />
            </div>

            {/* --- ACCOUNT (desktop) --- */}
            <Menu as="div" className="relative flex-shrink-0">
              <Menu.Button className="hidden sm:flex items-center gap-1.5 group">
                <div className="flex flex-col items-start">
                  <span className="text-[#9ca3af] text-[10px] leading-none">
                    Hello, {userInfo.firstName || 'User'}
                  </span>
                  <span className="text-white text-xs font-semibold leading-tight group-hover:text-[#f59e0b] transition-colors flex items-center gap-0.5">
                    Account & Lists
                    <ChevronDownIcon className="w-3 h-3" />
                  </span>
                </div>
                <div className="w-7 h-7 rounded-full overflow-hidden border border-[#444] flex-shrink-0">
                  {userInfo.imgpath ? (
                    <img src={userInfo.imgpath} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <div className="w-full h-full bg-[#333] flex items-center justify-center">
                      <FaUserCircle className="w-5 h-5 text-[#9ca3af]" />
                    </div>
                  )}
                </div>
              </Menu.Button>

              {/* Mobile: just the avatar icon visible */}
              <Menu.Button className="sm:hidden flex-shrink-0">
                <div className="w-7 h-7 rounded-full overflow-hidden border border-[#444]">
                  {userInfo.imgpath ? (
                    <img src={userInfo.imgpath} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <div className="w-full h-full bg-[#333] flex items-center justify-center">
                      <FaUserCircle className="w-5 h-5 text-[#9ca3af]" />
                    </div>
                  )}
                </div>
              </Menu.Button>

              {/* Dropdown */}
              <Transition
                as={Fragment}
                enter="transition ease-out duration-150"
                enterFrom="opacity-0 -translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-2"
              >
                <Menu.Items className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50">
                  {/* Greeting header */}
                  <div className="px-4 py-3 bg-[#f9fafb] border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">
                      Hello, {userInfo.firstName}
                    </p>
                    <p className="text-xs text-gray-500">{userInfo.email || ''}</p>
                  </div>
                  {profileMenu.map((item, i) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <Link
                          to={item.link}
                          onClick={item.name === 'Sign out' ? handleLogout : undefined}
                          className={classNames(
                            'block px-4 py-2.5 text-sm transition-colors',
                            item.name === 'Sign out'
                              ? 'text-red-600 hover:bg-red-50'
                              : active
                                ? 'bg-[#fff3cd] text-gray-800'
                                : 'text-gray-700 hover:bg-gray-50'
                          )}
                        >
                          {item.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>

            {/* --- CART --- */}
            <Link
              to="/cart"
              className="relative flex-shrink-0 flex items-center gap-1 group"
            >
              <div className="relative">
                <ShoppingCartIcon className="h-6 w-6 text-white group-hover:text-[#f59e0b] transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-[#ef4444] text-white text-[10px] font-bold rounded-full min-w-[17px] h-[17px] flex items-center justify-center leading-none">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline text-white text-xs font-semibold group-hover:text-[#f59e0b] transition-colors">
                Cart
              </span>
            </Link>

            {/* --- MOBILE HAMBURGER --- */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex-shrink-0 text-white"
            >
              {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* ============================================================
           CATEGORY TABS BAR — scrollable horizontal strip
          ============================================================ */}
      {!isAdmin && (
        <div className="bg-[#16162a] sticky top-14 z-40 shadow-sm">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            <div className="flex gap-1 overflow-x-auto scrollbar-hide py-2" style={{ scrollbarWidth: 'none' }}>
              {categoryTabs.map((cat) => (
                <Link
                  key={cat.name}
                  to={cat.link}
                  onClick={() => setActiveCategoryTab(cat.name)}
                  className={classNames(
                    'flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap',
                    cat.name === 'Deals'
                      ? 'text-[#f59e0b] border border-[#f59e0b] hover:bg-[#f59e0b] hover:text-[#1a1a2e] font-bold'
                      : activeCategoryTab === cat.name
                        ? 'bg-white text-[#1a1a2e] font-semibold'
                        : 'text-[#d1d5db] border border-[#333] hover:border-[#f59e0b] hover:text-white'
                  )}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Admin category tabs — simpler nav links */}
      {isAdmin && (
        <div className="bg-[#16162a] sticky top-14 z-40 shadow-sm">
          <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            <div className="flex gap-4 py-2.5">
              {productRoutes.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  className="text-[#d1d5db] text-sm font-medium hover:text-[#f59e0b] transition-colors border-b-2 border-transparent hover:border-[#f59e0b] pb-0.5"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
           MOBILE SLIDE-DOWN MENU
          ============================================================ */}
      <Transition
        show={mobileOpen}
        enter="transition-all ease-out duration-300"
        enterFrom="opacity-0 -translate-y-4 max-h-0"
        enterTo="opacity-100 translate-y-0 max-h-screen"
        leave="transition-all ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 max-h-screen"
        leaveTo="opacity-0 -translate-y-4 max-h-0"
      >
        <div className="bg-[#1a1a2e] border-t border-[#333] overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 py-3 space-y-1">
            {/* Nav links */}
            {productRoutes.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                onClick={() => setMobileOpen(false)}
                className="block text-[#d1d5db] hover:text-white hover:bg-[#16162a] px-3 py-2 rounded-lg text-sm transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <hr className="border-[#333] my-2" />
            {/* Profile links */}
            {profileMenu.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                onClick={() => {
                  if (item.name === 'Sign out') handleLogout();
                  setMobileOpen(false);
                }}
                className={classNames(
                  'block px-3 py-2 rounded-lg text-sm transition-colors',
                  item.name === 'Sign out'
                    ? 'text-red-400 hover:bg-red-900/30'
                    : 'text-[#d1d5db] hover:text-white hover:bg-[#16162a]'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </Transition>

      {/* ============================================================
           PAGE CONTENT
          ============================================================ */}
      <main className="flex-1 mx-auto w-full max-w-7xl py-6 px-4">
        {children}
      </main>

      {/* ============================================================
           FOOTER — minimal
          ============================================================ */}
      <footer className="bg-[#111827] text-[#6b7280] text-xs mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5 border-t border-[#222]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md flex items-center justify-center"
                   style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>
                <span className="text-white font-extrabold text-[10px]">S</span>
              </div>
              <span className="text-[#9ca3af] font-semibold text-sm">
                Style<span className="text-[#f59e0b]">Vista</span>
              </span>
            </div>
            <p className="text-center">© 2025 StyleVista. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="hover:text-[#f59e0b] cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-[#f59e0b] cursor-pointer transition-colors">Terms</span>
              <span className="hover:text-[#f59e0b] cursor-pointer transition-colors">Contact</span>
            </div>
          </div>
        </div>
      </footer>
      <Footer />
    </div>
  );
}

export default NavBar;