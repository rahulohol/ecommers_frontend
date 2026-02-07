
// import React, { useState, Fragment, useEffect, useRef, useMemo } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   fetchBrandsAsync,
//   fetchCategoriesAsync,
//   fetchProductsByFiltersAsync,
//   selectAllProducts,
//   selectBrands,
//   selectCategories,
//   selectProductListStatus,
//   selectNextCursor,
//   selectHasMore,
//   selectProductError,
//   resetProducts,
// } from "../productSlice";
// import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
// import { XMarkIcon } from "@heroicons/react/24/outline";
// import { ChevronRightIcon, StarIcon } from "@heroicons/react/20/solid";
// import { Link } from "react-router-dom";
// import {
//   ChevronDownIcon,
//   FunnelIcon,
//   MinusIcon,
//   PlusIcon,
//   Squares2X2Icon,
// } from "@heroicons/react/20/solid";
// import AdvertisingCarousel from "./AdvertisingCarousel";
// import SearchBar from "./Searchbar";

// const sortOptions = [
//   { name: "Best Rating", sort: "rating", order: "desc", current: false },
//   {
//     name: "Price: Low to High",
//     sort: "discountPrice",
//     order: "asc",
//     current: false,
//   },
//   {
//     name: "Price: High to Low",
//     sort: "discountPrice",
//     order: "desc",
//     current: false,
//   },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// // Convert USD to INR (approximate rate: 1 USD = 83 INR)
// function formatINRR(usdPrice) {
//   const inrPrice = Math.round(usdPrice * 83);
//   return inrPrice.toLocaleString("en-IN");
// }

// // ===== SKELETON LOADER COMPONENT =====
// function ProductSkeleton() {
//   return (
//     <div className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
//       <div className="relative w-full bg-gray-200 aspect-square" />
//       <div className="p-2 sm:p-3">
//         <div className="mb-2">
//           <div className="h-3 bg-gray-200 rounded w-full mb-1.5" />
//           <div className="h-3 bg-gray-200 rounded w-3/4" />
//         </div>
//         <div className="flex items-center gap-1 mb-2">
//           <div className="h-3 bg-gray-200 rounded w-8" />
//           <div className="h-3 bg-gray-200 rounded w-12" />
//         </div>
//         <div className="flex items-baseline gap-1">
//           <div className="h-4 bg-gray-200 rounded w-16" />
//           <div className="h-3 bg-gray-200 rounded w-12" />
//         </div>
//       </div>
//     </div>
//   );
// }

// // ===== LOADING SPINNER COMPONENT =====
// function LoadingSpinner() {
//   return (
//     <div className="flex items-center justify-center py-12">
//       <div className="relative w-16 h-16">
//         <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 rounded-full"></div>
//         <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
//       </div>
//     </div>
//   );
// }

// export default function ProductList() {
//   const dispatch = useDispatch();
//   const products = useSelector(selectAllProducts);
//   const brands = useSelector(selectBrands);
//   const categories = useSelector(selectCategories);
//   const status = useSelector(selectProductListStatus);
//   const nextCursor = useSelector(selectNextCursor);
//   const hasMore = useSelector(selectHasMore);
//   const error = useSelector(selectProductError);

//   const [filter, setFilter] = useState({});
//   const [sort, setSort] = useState({});
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
//   const [currentSortOption, setCurrentSortOption] = useState(null);
//   const [isScrolling, setIsScrolling] = useState(false);

//   const loaderRef = useRef(null);
//   const scrollTimeoutRef = useRef(null);

//   const filters = useMemo(
//     () => [
//       {
//         id: "category",
//         name: "Category",
//         options: categories,
//       },
//       {
//         id: "brand",
//         name: "Brands",
//         options: brands,
//       },
//     ],
//     [categories, brands]
//   );

//   // ===== INITIAL DATA FETCH =====
//   useEffect(() => {
//     dispatch(fetchBrandsAsync());
//     dispatch(fetchCategoriesAsync());
//   }, [dispatch]);

//   // ===== RESET & FIRST FETCH when filter/sort changes =====
//   useEffect(() => {
//     dispatch(resetProducts());
//     dispatch(
//       fetchProductsByFiltersAsync({
//         filter,
//         sort,
//         cursor: null,
//       })
//     );
//   }, [filter, sort, dispatch]);

//   // ===== SMOOTH SCROLL DETECTION =====
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolling(true);
      
//       if (scrollTimeoutRef.current) {
//         clearTimeout(scrollTimeoutRef.current);
//       }
      
//       scrollTimeoutRef.current = setTimeout(() => {
//         setIsScrolling(false);
//       }, 150);
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       if (scrollTimeoutRef.current) {
//         clearTimeout(scrollTimeoutRef.current);
//       }
//     };
//   }, []);

//   // ===== INFINITE SCROLL OBSERVER =====
//   useEffect(() => {
//     if (!loaderRef.current) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (
//           entry.isIntersecting &&
//           hasMore &&
//           status !== "loading" &&
//           !error
//         ) {
//           dispatch(
//             fetchProductsByFiltersAsync({
//               filter,
//               sort,
//               cursor: nextCursor,
//             })
//           );
//         }
//       },
//       {
//         rootMargin: "600px",
//         threshold: 0.1,
//       }
//     );

//     observer.observe(loaderRef.current);
//     return () => observer.disconnect();
//   }, [nextCursor, hasMore, status, filter, sort, error, dispatch]);

//   // ===== FILTER HANDLER =====
//   const handleFilter = (e, section, option) => {
//     const newFilter = { ...filter };

//     if (e.target.checked) {
//       if (newFilter[section.id]) {
//         newFilter[section.id].push(option.value);
//       } else {
//         newFilter[section.id] = [option.value];
//       }
//     } else {
//       const index = newFilter[section.id].findIndex(
//         (el) => el === option.value
//       );
//       newFilter[section.id].splice(index, 1);

//       if (newFilter[section.id].length === 0) {
//         delete newFilter[section.id];
//       }
//     }

//     setFilter(newFilter);
//   };

//   // ===== SORT HANDLER =====
//   const handleSort = (option) => {
//     const newSort = { _sort: option.sort, _order: option.order };
//     setSort(newSort);
//     setCurrentSortOption(option.name);
//   };

//   // ===== SCROLL TO TOP =====
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
//       {/* <SearchBar /> */}
//       <div>
//         <MobileFilter
//           handleFilter={handleFilter}
//           mobileFiltersOpen={mobileFiltersOpen}
//           setMobileFiltersOpen={setMobileFiltersOpen}
//           filters={filters}
//         />

//         <main className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
//           {/* Advertising Carousel Section */}
//           <div className="pt-4 sm:pt-8 pb-4 sm:pb-10">
//             <AdvertisingCarousel />
//           </div>

//           <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 sm:gap-0 border-b border-gray-200 pb-4 sm:pb-8">
//             <div>
//               <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
//                 All Products
//               </h1>
//               <p className="mt-1 text-xs sm:text-sm text-gray-600">
//                 {products.length > 0 && `Showing ${products.length} products`}
//               </p>
//             </div>

//             <div className="flex items-center gap-2">
//               <Menu as="div" className="relative inline-block text-left flex-1 sm:flex-none">
//                 <div>
//                   <Menu.Button className="group inline-flex items-center justify-center w-full sm:w-auto rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200">
//                     <span className="truncate">{currentSortOption || "Sort"}</span>
//                     <ChevronDownIcon
//                       className="-mr-1 ml-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-500 transition-colors flex-shrink-0"
//                       aria-hidden="true"
//                     />
//                   </Menu.Button>
//                 </div>

//                 <Transition
//                   as={Fragment}
//                   enter="transition ease-out duration-100"
//                   enterFrom="transform opacity-0 scale-95"
//                   enterTo="transform opacity-100 scale-100"
//                   leave="transition ease-in duration-75"
//                   leaveFrom="transform opacity-100 scale-100"
//                   leaveTo="transform opacity-0 scale-95"
//                 >
//                   <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
//                     <div className="py-1">
//                       {sortOptions.map((option) => (
//                         <Menu.Item key={option.name}>
//                           {({ active }) => (
//                             <p
//                               onClick={() => handleSort(option)}
//                               className={classNames(
//                                 currentSortOption === option.name
//                                   ? "font-semibold text-indigo-600 bg-indigo-50"
//                                   : "text-gray-700",
//                                 active ? "bg-gray-50" : "",
//                                 "block px-4 py-3 text-sm cursor-pointer transition-colors duration-150"
//                               )}
//                             >
//                               {option.name}
//                             </p>
//                           )}
//                         </Menu.Item>
//                       ))}
//                     </div>
//                   </Menu.Items>
//                 </Transition>
//               </Menu>

//               <button
//                 type="button"
//                 className="lg:hidden p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-all duration-200 flex-shrink-0"
//                 onClick={() => setMobileFiltersOpen(true)}
//               >
//                 <span className="sr-only">Filters</span>
//                 <FunnelIcon
//                   className="h-5 w-5"
//                   aria-hidden="true"
//                 />
//               </button>
//             </div>
//           </div>

//           <section aria-labelledby="products-heading" className="pb-20 pt-4 sm:pt-8">
//             <h2 id="products-heading" className="sr-only">
//               Products
//             </h2>

//             <div className="grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-4">
//               <DesktopFilter handleFilter={handleFilter} filters={filters} />

//               {/* Product grid */}
//               <div className="lg:col-span-3">
//                 {error && (
//                   <div className="rounded-lg bg-red-50 p-4 mb-6">
//                     <p className="text-sm text-red-800">
//                       Error loading products: {error}
//                     </p>
//                   </div>
//                 )}

//                 <ProductGrid
//                   products={products}
//                   status={status}
//                   hasMore={hasMore}
//                   loaderRef={loaderRef}
//                   isScrolling={isScrolling}
//                 />

//                 {/* Scroll to top button */}
//                 {products.length > 12 && (
//                   <button
//                     onClick={scrollToTop}
//                     className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 bg-indigo-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-200 z-50 hover:scale-110"
//                     aria-label="Scroll to top"
//                   >
//                     <svg
//                       className="w-5 h-5 sm:w-6 sm:h-6"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M5 10l7-7m0 0l7 7m-7-7v18"
//                       />
//                     </svg>
//                   </button>
//                 )}
//               </div>
//             </div>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// }

// // ===== MOBILE FILTER COMPONENT =====
// function MobileFilter({
//   mobileFiltersOpen,
//   setMobileFiltersOpen,
//   handleFilter,
//   filters,
// }) {
//   return (
//     <Transition.Root show={mobileFiltersOpen} as={Fragment}>
//       <Dialog
//         as="div"
//         className="relative z-40 lg:hidden"
//         onClose={setMobileFiltersOpen}
//       >
//         <Transition.Child
//           as={Fragment}
//           enter="transition-opacity ease-linear duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="transition-opacity ease-linear duration-300"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
//         </Transition.Child>

//         <div className="fixed inset-0 z-40 flex">
//           <Transition.Child
//             as={Fragment}
//             enter="transition ease-in-out duration-300 transform"
//             enterFrom="translate-x-full"
//             enterTo="translate-x-0"
//             leave="transition ease-in-out duration-300 transform"
//             leaveFrom="translate-x-0"
//             leaveTo="translate-x-full"
//           >
//             <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-6 pb-12 shadow-2xl">
//               <div className="flex items-center justify-between px-6">
//                 <h2 className="text-xl font-semibold text-gray-900">
//                   Filters
//                 </h2>
//                 <button
//                   type="button"
//                   className="-mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors duration-200"
//                   onClick={() => setMobileFiltersOpen(false)}
//                 >
//                   <span className="sr-only">Close menu</span>
//                   <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//                 </button>
//               </div>

//               <form className="mt-6">
//                 {filters.map((section) => (
//                   <Disclosure
//                     as="div"
//                     key={section.id}
//                     className="border-t border-gray-200 px-6 py-6"
//                   >
//                     {({ open }) => (
//                       <>
//                         <h3 className="-mx-2 -my-3 flow-root">
//                           <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500 transition-colors duration-200">
//                             <span className="font-semibold text-gray-900">
//                               {section.name}
//                             </span>
//                             <span className="ml-6 flex items-center">
//                               {open ? (
//                                 <MinusIcon
//                                   className="h-5 w-5 text-indigo-600"
//                                   aria-hidden="true"
//                                 />
//                               ) : (
//                                 <PlusIcon
//                                   className="h-5 w-5"
//                                   aria-hidden="true"
//                                 />
//                               )}
//                             </span>
//                           </Disclosure.Button>
//                         </h3>
//                         <Disclosure.Panel className="pt-6">
//                           <div className="space-y-4">
//                             {section.options.map((option, optionIdx) => (
//                               <div
//                                 key={option.value}
//                                 className="flex items-center"
//                               >
//                                 <input
//                                   id={`filter-mobile-${section.id}-${optionIdx}`}
//                                   name={`${section.id}[]`}
//                                   defaultValue={option.value}
//                                   type="checkbox"
//                                   defaultChecked={option.checked}
//                                   onChange={(e) =>
//                                     handleFilter(e, section, option)
//                                   }
//                                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
//                                 />
//                                 <label
//                                   htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
//                                   className="ml-3 min-w-0 flex-1 text-gray-700 cursor-pointer"
//                                 >
//                                   {option.label}
//                                 </label>
//                               </div>
//                             ))}
//                           </div>
//                         </Disclosure.Panel>
//                       </>
//                     )}
//                   </Disclosure>
//                 ))}
//               </form>
//             </Dialog.Panel>
//           </Transition.Child>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// }

// // ===== DESKTOP FILTER COMPONENT =====
// const DesktopFilter = React.memo(function DesktopFilter({ handleFilter, filters }) {
//   return (
//     <form className="hidden lg:block">
//       <div className="sticky top-6 space-y-4">
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//               <FunnelIcon className="h-5 w-5 mr-2 text-indigo-600" />
//               Filters
//             </h3>
//           </div>
//           {filters.map((section, idx) => (
//             <Disclosure
//               as="div"
//               key={section.id}
//               className={classNames(
//                 idx !== filters.length - 1 ? "border-b border-gray-200" : "",
//                 "py-6 px-6"
//               )}
//               defaultOpen={false}
//             >
//               {({ open }) => (
//                 <>
//                   <h3 className="-my-3 flow-root">
//                     <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500 transition-colors duration-200">
//                       <span className="font-semibold text-gray-900">
//                         {section.name}
//                       </span>
//                       <span className="ml-6 flex items-center">
//                         {open ? (
//                           <MinusIcon
//                             className="h-5 w-5 text-indigo-600"
//                             aria-hidden="true"
//                           />
//                         ) : (
//                           <PlusIcon className="h-5 w-5" aria-hidden="true" />
//                         )}
//                       </span>
//                     </Disclosure.Button>
//                   </h3>
//                   <Disclosure.Panel className="pt-6">
//                     <div className="space-y-4">
//                       {section.options.map((option, optionIdx) => (
//                         <div
//                           key={option.value}
//                           className="flex items-center group"
//                         >
//                           <input
//                             id={`filter-${section.id}-${optionIdx}`}
//                             name={`${section.id}[]`}
//                             defaultValue={option.value}
//                             type="checkbox"
//                             defaultChecked={option.checked}
//                             onChange={(e) => handleFilter(e, section, option)}
//                             className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
//                           />
//                           <label
//                             htmlFor={`filter-${section.id}-${optionIdx}`}
//                             className="ml-3 text-sm text-gray-700 cursor-pointer group-hover:text-gray-900 transition-colors duration-150"
//                           >
//                             {option.label}
//                           </label>
//                         </div>
//                       ))}
//                     </div>
//                   </Disclosure.Panel>
//                 </>
//               )}
//             </Disclosure>
//           ))}
//         </div>
//       </div>
//     </form>
//   );
// });

// // ===== OPTIMIZED PRODUCT CARD =====
// const ProductCard = React.memo(function ProductCard({ product }) {
//   return (
//     <Link 
//       to={`/product-detail/${product._id}`} 
//       className="block will-change-transform"
//     >
//       <div className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-indigo-100/50 hover:-translate-y-0.5">
//         {/* Image Container with aspect-square for consistent sizing */}
//         <div className="relative w-full overflow-hidden bg-gray-100 aspect-square">
//           <img
//             src={product.thumbnail}
//             alt={product.title}
//             loading="lazy"
//             decoding="async"
//             className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
//             style={{ contentVisibility: 'auto' }}
//           />
//           {product.deleted && (
//             <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
//               <span className="text-white font-semibold text-xs px-3 py-1.5 bg-red-500 rounded-lg">
//                 Deleted
//               </span>
//             </div>
//           )}
//           {product.stock <= 0 && !product.deleted && (
//             <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
//               <span className="text-white font-semibold text-xs px-3 py-1.5 bg-red-500 rounded-lg">
//                 Out of Stock
//               </span>
//             </div>
//           )}
//           {/* Rating Badge */}
//           <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-md">
//             <div className="flex items-center gap-0.5">
//               <StarIcon className="w-3 h-3 text-yellow-400 fill-yellow-400" />
//               <span className="text-xs font-semibold text-gray-900">
//                 {product.rating}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Product Info - Compact Mobile Design */}
//         <div className="p-2 sm:p-3">
//           {/* Title */}
//           <h3 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2 mb-1 sm:mb-2 group-hover:text-indigo-600 transition-colors duration-200 leading-tight">
//             {product.title}
//           </h3>

//           {/* Price Section */}
//           <div className="flex items-center justify-between">
//             <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
//               <p className="text-base sm:text-lg font-bold text-gray-900">
//                 ₹{
//                   product?.discountPrice ||
//                     Math.round(
//                       product?.price *
//                         (1 - product?.discountPercentage / 100)
//                     )
//                 }
//               </p>
//               <p className="text-xs line-through font-medium text-gray-400">
//                 ₹{product?.price}
//               </p>
//             </div>
//             {/* Discount Badge (optional, shows on larger screens) */}
//             {product?.discountPercentage > 0 && (
//               <div className="hidden sm:flex items-center justify-center px-2 py-0.5 rounded bg-green-100">
//                 <span className="text-xs font-semibold text-green-700">
//                   {Math.round(product.discountPercentage)}% off
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// });

// // ===== PRODUCT GRID COMPONENT =====
// function ProductGrid({ products, status, hasMore, loaderRef, isScrolling }) {
//   const isInitialLoading = status === "loading" && products.length === 0;
//   const isLoadingMore = status === "loading" && products.length > 0;

//   return (
//     <div className="bg-transparent">
//       <div className="mx-auto max-w-2xl px-0 py-0 sm:px-0 sm:py-0 lg:max-w-7xl lg:px-0">
//         {isInitialLoading ? (
//           <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 xl:gap-6">
//             {[...Array(6)].map((_, index) => (
//               <ProductSkeleton key={index} />
//             ))}
//           </div>
//         ) : (
//           <>
//             {products.length > 0 ? (
//               <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 xl:gap-6">
//                 {products.map((product) => (
//                   <ProductCard key={product.id} product={product} />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <p className="text-gray-500 text-lg">No products found</p>
//                 <p className="text-gray-400 text-sm mt-2">
//                   Try adjusting your filters
//                 </p>
//               </div>
//             )}

//             {isLoadingMore && (
//               <div className="mt-8">
//                 <LoadingSpinner />
//               </div>
//             )}

//             {!hasMore && products.length > 0 && (
//               <div className="text-center py-12">
//                 <p className="text-gray-500 text-sm">
//                   You've reached the end of the list
//                 </p>
//               </div>
//             )}

//             <div ref={loaderRef} className="h-10" />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useState, Fragment, useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBrandsAsync,
  fetchCategoriesAsync,
  fetchProductsByFiltersAsync,
  selectAllProducts,
  selectBrands,
  selectCategories,
  selectProductListStatus,
  selectNextCursor,
  selectHasMore,
  selectProductError,
  resetProducts,
} from "../productSlice";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { 
  ChevronRightIcon, 
  StarIcon,
  TruckIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  ChatBubbleLeftRightIcon
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  SparklesIcon,
  FireIcon,
  BoltIcon,
  TagIcon
} from "@heroicons/react/20/solid";
import AdvertisingCarousel from "./AdvertisingCarousel";
import SearchBar from "./Searchbar";
import "./filterstyles.css"

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  {
    name: "Price: Low to High",
    sort: "discountPrice",
    order: "asc",
    current: false,
  },
  {
    name: "Price: High to Low",
    sort: "discountPrice",
    order: "desc",
    current: false,
  },
];

// Trust badges data
const trustBadges = [
  {
    icon: TruckIcon,
    title: "Free Shipping",
    description: "On orders over ₹999",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure Payment",
    description: "100% protected",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    icon: CreditCardIcon,
    title: "Easy Returns",
    description: "30-day return policy",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: "24/7 Support",
    description: "Dedicated support",
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// ===== DEALS OF THE DAY BANNER =====
function DealsOfTheDay() {
  return (
    <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 py-4 sm:py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-white p-2 sm:p-3 rounded-lg">
              <BoltIcon className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Deals of the Day
              </h3>
              <p className="text-xs sm:text-sm text-white/90">
                Limited time offers • Expires in 12h 45m
              </p>
            </div>
          </div>
          <ChevronRightIcon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
}

// ===== BRAND SHOWCASE =====
function BrandShowcase({ brands }) {
  const displayBrands = brands.slice(0, 8);
  
  if (displayBrands.length === 0) return null;

  return (
    <div className="bg-white py-6 sm:py-8 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Top Brands
          </h2>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            View All
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4">
          {displayBrands.map((brand, index) => (
            <button
              key={brand.value}
              className="group flex flex-col items-center justify-center p-3 sm:p-4 bg-gray-50 hover:bg-white rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center mb-2 border border-gray-100 group-hover:border-indigo-200 transition-colors">
                <span className="text-lg sm:text-xl font-bold text-gray-700 group-hover:text-indigo-600">
                  {brand.label.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-xs font-medium text-gray-700 text-center line-clamp-1">
                {brand.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== SKELETON LOADER COMPONENT =====
function ProductSkeleton() {
  return (
    <div className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
      <div className="relative w-full bg-gray-200 aspect-square" />
      <div className="p-2 sm:p-3">
        <div className="mb-2">
          <div className="h-3 bg-gray-200 rounded w-full mb-1.5" />
          <div className="h-3 bg-gray-200 rounded w-3/4" />
        </div>
        <div className="flex items-center gap-1 mb-2">
          <div className="h-3 bg-gray-200 rounded w-8" />
          <div className="h-3 bg-gray-200 rounded w-12" />
        </div>
        <div className="flex items-baseline gap-1">
          <div className="h-4 bg-gray-200 rounded w-16" />
          <div className="h-3 bg-gray-200 rounded w-12" />
        </div>
      </div>
    </div>
  );
}

// ===== LOADING SPINNER COMPONENT =====
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
}

// ===== TRUST BADGES COMPONENT =====
function TrustBadges() {
  return (
    <div className="bg-white border-y border-gray-100 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-6">
          {trustBadges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className={`${badge.bgColor} p-2 rounded-lg flex-shrink-0`}>
                <badge.icon className={`h-5 w-5 ${badge.color}`} />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                  {badge.title}
                </h3>
                <p className="text-xs text-gray-500 truncate">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== CATEGORY QUICK LINKS =====
function CategoryQuickLinks({ categories, onCategoryClick }) {
  // Sample category images - replace with your actual category images
  const categoryImages = {
    smartphones: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    laptops: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
    fragrances: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
    skincare: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
    groceries: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    "home-decoration": "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=400&fit=crop",
    furniture: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    tops: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop",
    "womens-dresses": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
    "womens-shoes": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
    "mens-shirts": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=400&fit=crop",
    "mens-shoes": "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    "mens-watches": "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
    "womens-watches": "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=400&h=400&fit=crop",
    "womens-bags": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    "womens-jewellery": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
    sunglasses: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop",
    automotive: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=400&fit=crop",
    motorcycle: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400&h=400&fit=crop",
    lighting: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop",
  };

  const displayCategories = categories.slice(0, 8);
  
  return (
    <div className="bg-white py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Shop by Category
          </h2>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            View All
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
          {displayCategories.map((category, index) => {
            const imageUrl = categoryImages[category.value] || categoryImages.smartphones;
            
            return (
              <button
                key={category.value}
                onClick={() => onCategoryClick(category)}
                className="group relative overflow-hidden rounded-xl bg-gray-50 hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-indigo-300"
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={imageUrl}
                    alt={category.label}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Category Name Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent p-3">
                  <h3 className="text-sm sm:text-base font-semibold text-white text-left">
                    {category.label}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ===== FEATURED SECTION TABS =====
function FeaturedTabs({ products }) {
  const [activeTab, setActiveTab] = useState('trending');
  
  const tabs = [
    { id: 'trending', name: 'Trending Now', icon: FireIcon },
    { id: 'new', name: 'New Arrivals', icon: SparklesIcon },
    { id: 'deals', name: 'Best Deals', icon: TagIcon },
  ];

  const getFilteredProducts = () => {
    if (!products || products.length === 0) return [];
    
    switch(activeTab) {
      case 'trending':
        return products.filter(p => p.rating >= 4.5).slice(0, 6);
      case 'new':
        return products.slice(0, 6);
      case 'deals':
        return products.filter(p => p.discountPercentage >= 20).slice(0, 6);
      default:
        return products.slice(0, 6);
    }
  };

  const featuredProducts = getFilteredProducts();

  if (featuredProducts.length === 0) return null;

  return (
    <div className="bg-white py-6 sm:py-8 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Tabs */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={classNames(
                  'inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 whitespace-nowrap',
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.name}
              </button>
            ))}
          </div>
          <button className="hidden sm:flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700">
            View All
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} featured />
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== PROMOTIONAL BANNER =====
function PromoBanner() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold text-white">
              Special Offer! Get 20% Off Your First Order
              <span className="ml-2 text-sm font-normal text-indigo-100">
                Use code: <span className="font-semibold text-white bg-white/20 px-2 py-0.5 rounded">WELCOME20</span>
              </span>
            </h3>
          </div>
          <button className="bg-white text-indigo-600 px-5 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors duration-300 whitespace-nowrap text-sm">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}

// ===== STATS SECTION =====
function StatsSection() {
  const stats = [
    { value: '10K+', label: 'Products' },
    { value: '50K+', label: 'Happy Customers' },
    { value: '100+', label: 'Brands' },
    { value: '4.8/5', label: 'Average Rating' },
  ];

  return (
    <div className="w-full rounded-xl bg-gray-900 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const status = useSelector(selectProductListStatus);
  const nextCursor = useSelector(selectNextCursor);
  const hasMore = useSelector(selectHasMore);
  const error = useSelector(selectProductError);

  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentSortOption, setCurrentSortOption] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const loaderRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  const filters = useMemo(
    () => [
      {
        id: "category",
        name: "Category",
        options: categories,
      },
      {
        id: "brand",
        name: "Brands",
        options: brands,
      },
    ],
    [categories, brands]
  );

  // ===== INITIAL DATA FETCH =====
  useEffect(() => {
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  // ===== RESET & FIRST FETCH when filter/sort changes =====
  useEffect(() => {
    dispatch(resetProducts());
    dispatch(
      fetchProductsByFiltersAsync({
        filter,
        sort,
        cursor: null,
      })
    );
  }, [filter, sort, dispatch]);

  // ===== SMOOTH SCROLL DETECTION =====
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      setShowScrollTop(window.scrollY > 500);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // ===== INFINITE SCROLL OBSERVER =====
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          hasMore &&
          status !== "loading" &&
          !error
        ) {
          dispatch(
            fetchProductsByFiltersAsync({
              filter,
              sort,
              cursor: nextCursor,
            })
          );
        }
      },
      {
        rootMargin: "600px",
        threshold: 0.1,
      }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [nextCursor, hasMore, status, filter, sort, error, dispatch]);

  // ===== FILTER HANDLER =====
  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };

    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.value);
      } else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);

      if (newFilter[section.id].length === 0) {
        delete newFilter[section.id];
      }
    }

    setFilter(newFilter);
  };

  // ===== CATEGORY CLICK HANDLER =====
  const handleCategoryClick = (category) => {
    const newFilter = { category: [category.value] };
    setFilter(newFilter);
    
    // Scroll to products section
    const productsSection = document.getElementById('products-heading');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // ===== SORT HANDLER =====
  const handleSort = (option) => {
    const newSort = { _sort: option.sort, _order: option.order };
    setSort(newSort);
    setCurrentSortOption(option.name);
  };

  // ===== SCROLL TO TOP =====
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Check if filters are active
  const hasActiveFilters = Object.keys(filter).length > 0;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* <SearchBar /> */}
      <div>
        <MobileFilter
          handleFilter={handleFilter}
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          filters={filters}
        />

        <main className="mx-auto max-w-7xl">
          {/* Hero Carousel Section */}
          <div className="px-3 sm:px-6 lg:px-8 pt-4 sm:pt-4 pb-0">
            <AdvertisingCarousel />
          </div>

          {/* Trust Badges */}
          <TrustBadges />

          {/* Deals of the Day - Only show when no filters active */}
          {!hasActiveFilters && <DealsOfTheDay />}

          {/* Category Quick Links - Only show when no filters active */}
          {!hasActiveFilters && categories.length > 0 && (
            <CategoryQuickLinks 
              categories={categories} 
              onCategoryClick={handleCategoryClick}
            />
          )}

          {/* Brand Showcase - Only show when no filters active */}
          {/* {!hasActiveFilters && brands.length > 0 && (
            <BrandShowcase brands={brands} />
          )} */}

          {/* Featured Products Tabs - Only show when no filters active */}
          {!hasActiveFilters && products.length > 0 && (
            <FeaturedTabs products={products} />
          )}

          {/* Promo Banner */}
          {!hasActiveFilters && <PromoBanner />}

          {/* Main Products Section */}
          <div className="px-3 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 sm:gap-0 border-b border-gray-200 pb-4 sm:pb-8 pt-8">
              <div>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                  {hasActiveFilters ? "Filtered Products" : "All Products"}
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-gray-600">
                  {products.length > 0 && `Showing ${products.length} products`}
                </p>
                
                {/* Active Filters Display */}
                {hasActiveFilters && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {Object.entries(filter).map(([key, values]) => (
                      values.map((value) => (
                        <span
                          key={`${key}-${value}`}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700"
                        >
                          {value}
                          <button
                            onClick={() => {
                              const newFilter = { ...filter };
                              newFilter[key] = newFilter[key].filter(v => v !== value);
                              if (newFilter[key].length === 0) delete newFilter[key];
                              setFilter(newFilter);
                            }}
                            className="ml-1 hover:text-indigo-900"
                          >
                            <XMarkIcon className="h-3 w-3" />
                          </button>
                        </span>
                      ))
                    ))}
                    <button
                      onClick={() => setFilter({})}
                      className="text-xs text-gray-600 hover:text-gray-900 underline"
                    >
                      Clear all
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Menu as="div" className="relative inline-block text-left flex-1 sm:flex-none">
                  <div>
                    <Menu.Button className="group inline-flex items-center justify-center w-full sm:w-auto rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200">
                      <span className="truncate">{currentSortOption || "Sort"}</span>
                      <ChevronDownIcon
                        className="-mr-1 ml-1.5 h-4 w-4 text-gray-400 group-hover:text-gray-500 transition-colors flex-shrink-0"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <p
                                onClick={() => handleSort(option)}
                                className={classNames(
                                  currentSortOption === option.name
                                    ? "font-semibold text-indigo-600 bg-indigo-50"
                                    : "text-gray-700",
                                  active ? "bg-gray-50" : "",
                                  "block px-4 py-3 text-sm cursor-pointer transition-colors duration-150"
                                )}
                              >
                                {option.name}
                              </p>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="lg:hidden p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-all duration-200 flex-shrink-0"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-10 pt-4 sm:pt-8">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-4">
                <DesktopFilter handleFilter={handleFilter} filters={filters} />

                {/* Product grid */}
                <div className="lg:col-span-3">
                  {error && (
                    <div className="rounded-lg bg-red-50 p-4 mb-6">
                      <p className="text-sm text-red-800">
                        Error loading products: {error}
                      </p>
                    </div>
                  )}

                  <ProductGrid
                    products={products}
                    status={status}
                    hasMore={hasMore}
                    loaderRef={loaderRef}
                    isScrolling={isScrolling}
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Stats Section */}
          {!hasActiveFilters && <StatsSection />}
        </main>

        {/* Scroll to top button - Enhanced with show/hide */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 bg-indigo-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-200 z-50 hover:scale-110 animate-bounce"
            aria-label="Scroll to top"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

// ===== MOBILE FILTER COMPONENT =====
function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
}) {
  const [searchTerms, setSearchTerms] = useState({});

  const handleSearchChange = (sectionId, term) => {
    setSearchTerms(prev => ({
      ...prev,
      [sectionId]: term
    }));
  };

  const getFilteredOptions = (section) => {
    const searchTerm = searchTerms[section.id] || '';
    if (!searchTerm) return section.options;
    
    return section.options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-6 pb-12 shadow-2xl">
              <div className="flex items-center justify-between px-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Filters
                </h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors duration-200"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <form className="mt-6">
                {filters.map((section) => {
                  const filteredOptions = getFilteredOptions(section);
                  
                  return (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-6 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500 transition-colors duration-200">
                              <span className="font-semibold text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5 text-indigo-600"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            {/* Search Input for Mobile */}
                            {section.options.length > 5 && (
                              <div className="mb-4">
                                <div className="relative">
                                  <input
                                    type="text"
                                    placeholder={`Search ${section.name.toLowerCase()}...`}
                                    value={searchTerms[section.id] || ''}
                                    onChange={(e) => handleSearchChange(section.id, e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                  />
                                  <svg
                                    className="absolute right-3 top-2.5 h-4 w-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                  </svg>
                                </div>
                              </div>
                            )}
                            
                            {/* Options List */}
                            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                              {filteredOptions.length > 0 ? (
                                filteredOptions.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      onChange={(e) =>
                                        handleFilter(e, section, option)
                                      }
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-700 cursor-pointer"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-gray-500 text-center py-2">
                                  No results found
                                </p>
                              )}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  );
                })}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

// ===== DESKTOP FILTER COMPONENT =====
const DesktopFilter = React.memo(function DesktopFilter({ handleFilter, filters }) {
  const [searchTerms, setSearchTerms] = useState({});

  const handleSearchChange = (sectionId, term) => {
    setSearchTerms(prev => ({
      ...prev,
      [sectionId]: term
    }));
  };

  const getFilteredOptions = (section) => {
    const searchTerm = searchTerms[section.id] || '';
    if (!searchTerm) return section.options;
    
    return section.options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <form className="hidden lg:block">
      <div className="sticky top-6 space-y-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FunnelIcon className="h-5 w-5 mr-2 text-indigo-600" />
              Filters
            </h3>
          </div>
          {filters.map((section, idx) => {
            const filteredOptions = getFilteredOptions(section);
            
            return (
              <Disclosure
                as="div"
                key={section.id}
                className={classNames(
                  idx !== filters.length - 1 ? "border-b border-gray-200" : "",
                  "py-6 px-6"
                )}
                defaultOpen={false}
              >
                {({ open }) => (
                  <>
                    <h3 className="-my-3 flow-root">
                      <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500 transition-colors duration-200">
                        <span className="font-semibold text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <MinusIcon
                              className="h-5 w-5 text-indigo-600"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel className="pt-6">
                      {/* Search Input */}
                      {section.options.length > 5 && (
                        <div className="mb-4">
                          <div className="relative">
                            <input
                              type="text"
                              placeholder={`Search ${section.name.toLowerCase()}...`}
                              value={searchTerms[section.id] || ''}
                              onChange={(e) => handleSearchChange(section.id, e.target.value)}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            />
                            <svg
                              className="absolute right-3 top-2.5 h-4 w-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                      
                      {/* Options List */}
                      <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                        {filteredOptions.length > 0 ? (
                          filteredOptions.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center group"
                            >
                              <input
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type="checkbox"
                                defaultChecked={option.checked}
                                onChange={(e) => handleFilter(e, section, option)}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                              />
                              <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-700 cursor-pointer group-hover:text-gray-900 transition-colors duration-150"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500 text-center py-2">
                            No results found
                          </p>
                        )}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            );
          })}
        </div>
      </div>
    </form>
  );
});

// ===== OPTIMIZED PRODUCT CARD =====
const ProductCard = React.memo(function ProductCard({ product, featured = false }) {
  return (
    <Link 
      to={`/product-detail/${product._id}`} 
      className="block will-change-transform"
    >
      <div className={classNames(
        "group relative bg-white rounded-lg border overflow-hidden transition-all duration-300",
        featured 
          ? "border-indigo-200 shadow-md hover:shadow-2xl hover:shadow-indigo-200/50 hover:-translate-y-1" 
          : "border-gray-200 hover:shadow-lg hover:shadow-indigo-100/50 hover:-translate-y-0.5"
      )}>
        {/* Image Container with aspect-square for consistent sizing */}
        <div className="relative w-full overflow-hidden bg-gray-100 aspect-square">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            style={{ contentVisibility: 'auto' }}
          />
          {product.deleted && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <span className="text-white font-semibold text-xs px-3 py-1.5 bg-red-500 rounded-lg">
                Deleted
              </span>
            </div>
          )}
          {product.stock <= 0 && !product.deleted && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <span className="text-white font-semibold text-xs px-3 py-1.5 bg-red-500 rounded-lg">
                Out of Stock
              </span>
            </div>
          )}
          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-2 left-2 bg-indigo-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <SparklesIcon className="h-3 w-3" />
              Featured
            </div>
          )}
          {/* Rating Badge */}
          <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-md">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-semibold text-gray-900">
                {product.rating}
              </span>
            </div>
          </div>
        </div>

        {/* Product Info - Compact Mobile Design */}
        <div className="p-2 sm:p-3">
          {/* Title */}
          <h3 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2 mb-1 sm:mb-2 group-hover:text-indigo-600 transition-colors duration-200 leading-tight">
            {product.title}
          </h3>

          {/* Price Section */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
              <p className="text-base sm:text-lg font-bold text-gray-900">
                ₹{
                  product?.discountPrice ||
                    Math.round(
                      product?.price *
                        (1 - product?.discountPercentage / 100)
                    )
                }
              </p>
              <p className="text-xs line-through font-medium text-gray-400">
                ₹{product?.price}
              </p>
            </div>
            {/* Discount Badge */}
            {product?.discountPercentage > 0 && (
              <div className="flex items-center justify-center px-2 py-0.5 rounded bg-green-100">
                <span className="text-xs font-semibold text-green-700">
                  {Math.round(product.discountPercentage)}% off
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
});

// ===== PRODUCT GRID COMPONENT =====
function ProductGrid({ products, status, hasMore, loaderRef, isScrolling }) {
  const isInitialLoading = status === "loading" && products.length === 0;
  const isLoadingMore = status === "loading" && products.length > 0;

  return (
    <div className="bg-transparent">
      <div className="mx-auto max-w-2xl px-0 py-0 sm:px-0 sm:py-0 lg:max-w-7xl lg:px-0">
        {isInitialLoading ? (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 xl:gap-6">
            {[...Array(6)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            {products.length > 0 ? (
              <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 xl:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg font-medium mb-2">No products found</p>
                <p className="text-gray-400 text-sm">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            )}

            {isLoadingMore && (
              <div className="mt-8">
                <LoadingSpinner />
              </div>
            )}

            {!hasMore && products.length > 0 && (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
                  <div className="h-px w-16 bg-gray-300"></div>
                  <span>You've reached the end</span>
                  <div className="h-px w-16 bg-gray-300"></div>
                </div>
              </div>
            )}

            <div ref={loaderRef} className="h-10" />
          </>
        )}
      </div>
    </div>
  );
}