// // // import React, { useState, Fragment, useEffect } from "react";
// // // import { useSelector, useDispatch } from "react-redux";
// // // import {
// // //   fetchBrandsAsync,
// // //   fetchCategoriesAsync,
// // //   fetchProductsByFiltersAsync,
// // //   selectAllProducts,
// // //   selectBrands,
// // //   selectCategories,
// // //   selectProductListStatus,
// // //   selectTotalItems,
// // // } from "../productSlice";
// // // import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
// // // import { XMarkIcon } from "@heroicons/react/24/outline";
// // // import {
// // //   ChevronLeftIcon,
// // //   ChevronRightIcon,
// // //   StarIcon,
// // // } from "@heroicons/react/20/solid";
// // // import { Link } from "react-router-dom";
// // // import {
// // //   ChevronDownIcon,
// // //   FunnelIcon,
// // //   MinusIcon,
// // //   PlusIcon,
// // //   Squares2X2Icon,
// // // } from "@heroicons/react/20/solid";
// // // import { ITEMS_PER_PAGE } from "../../../app/constants";
// // // import Pagination from "../../common/Pagination";
// // // import { Grid } from "react-loader-spinner";

// // // const sortOptions = [
// // //   { name: "Best Rating", sort: "rating", order: "desc", current: false },
// // //   {
// // //     name: "Price: Low to High",
// // //     sort: "discountPrice",
// // //     order: "asc",
// // //     current: false,
// // //   },
// // //   {
// // //     name: "Price: High to Low",
// // //     sort: "discountPrice",
// // //     order: "desc",
// // //     current: false,
// // //   },
// // // ];

// // // function classNames(...classes) {
// // //   return classes.filter(Boolean).join(" ");
// // // }

// // // export default function ProductList() {
// // //   const dispatch = useDispatch();
// // //   const products = useSelector(selectAllProducts);
// // //   const brands = useSelector(selectBrands);
// // //   const categories = useSelector(selectCategories);
// // //   const totalItems = useSelector(selectTotalItems);
// // //   const status = useSelector(selectProductListStatus);
// // //   const filters = [
// // //     {
// // //       id: "category",
// // //       name: "Category",
// // //       options: categories,
// // //     },
// // //     {
// // //       id: "brand",
// // //       name: "Brands",
// // //       options: brands,
// // //     },
// // //   ];

// // //   const [filter, setFilter] = useState({});
// // //   const [sort, setSort] = useState({});
// // //   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
// // //   const [page, setPage] = useState(1);

// // //   const handleFilter = (e, section, option) => {
// // //     const newFilter = { ...filter };
// // //     if (e.target.checked) {
// // //       if (newFilter[section.id]) {
// // //         newFilter[section.id].push(option.value);
// // //       } else {
// // //         newFilter[section.id] = [option.value];
// // //       }
// // //     } else {
// // //       const index = newFilter[section.id].findIndex(
// // //         (el) => el === option.value
// // //       );
// // //       newFilter[section.id].splice(index, 1);
// // //     }

// // //     setFilter(newFilter);
// // //   };

// // //   const handleSort = (e, option) => {
// // //     const sort = { _sort: option.sort, _order: option.order };

// // //     setSort(sort);
// // //   };

// // //   const handlePage = (page) => {
// // //     setPage(page);
// // //   };

// // //   useEffect(() => {
// // //     const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
// // //     dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
// // //   }, [dispatch, filter, sort, page]);

// // //   useEffect(() => {
// // //     setPage(1);
// // //   }, [totalItems, sort]);

// // //   useEffect(() => {
// // //     dispatch(fetchBrandsAsync());
// // //     dispatch(fetchCategoriesAsync());
// // //   }, []);

// // //   return (
// // //     <div className="bg-white">
// // //       <div>
// // //         <MobileFilter
// // //           handleFilter={handleFilter}
// // //           mobileFiltersOpen={mobileFiltersOpen}
// // //           setMobileFiltersOpen={setMobileFiltersOpen}
// // //           filters={filters}
// // //         ></MobileFilter>

// // //         <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
// // //           <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
// // //             <h1 className="text-4xl font-bold tracking-tight text-gray-900">
// // //               All Products
// // //             </h1>

// // //             <div className="flex items-center">
// // //               <Menu as="div" className="relative inline-block text-left">
// // //                 <div>
// // //                   <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
// // //                     Sort
// // //                     <ChevronDownIcon
// // //                       className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
// // //                       aria-hidden="true"
// // //                     />
// // //                   </Menu.Button>
// // //                 </div>

// // //                 <Transition
// // //                   as={Fragment}
// // //                   enter="transition ease-out duration-100"
// // //                   enterFrom="transform opacity-0 scale-95"
// // //                   enterTo="transform opacity-100 scale-100"
// // //                   leave="transition ease-in duration-75"
// // //                   leaveFrom="transform opacity-100 scale-100"
// // //                   leaveTo="transform opacity-0 scale-95"
// // //                 >
// // //                   <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
// // //                     <div className="py-1">
// // //                       {sortOptions.map((option) => (
// // //                         <Menu.Item key={option.name}>
// // //                           {({ active }) => (
// // //                             <p
// // //                               onClick={(e) => handleSort(e, option)}
// // //                               className={classNames(
// // //                                 option.current
// // //                                   ? "font-medium text-gray-900"
// // //                                   : "text-gray-500",
// // //                                 active ? "bg-gray-100" : "",
// // //                                 "block px-4 py-2 text-sm"
// // //                               )}
// // //                             >
// // //                               {option.name}
// // //                             </p>
// // //                           )}
// // //                         </Menu.Item>
// // //                       ))}
// // //                     </div>
// // //                   </Menu.Items>
// // //                 </Transition>
// // //               </Menu>

// // //               <button
// // //                 type="button"
// // //                 className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
// // //               >
// // //                 <span className="sr-only">View grid</span>
// // //                 <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
// // //               </button>
// // //               <button
// // //                 type="button"
// // //                 className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
// // //                 onClick={() => setMobileFiltersOpen(true)}
// // //               >
// // //                 <span className="sr-only">Filters</span>
// // //                 <FunnelIcon className="h-5 w-5" aria-hidden="true" />
// // //               </button>
// // //             </div>
// // //           </div>

// // //           <section aria-labelledby="products-heading" className="pb-24 pt-6">
// // //             <h2 id="products-heading" className="sr-only">
// // //               Products
// // //             </h2>

// // //             <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
// // //               <DesktopFilter
// // //                 handleFilter={handleFilter}
// // //                 filters={filters}
// // //               ></DesktopFilter>
// // //               {/* Product grid */}
// // //               <div className="lg:col-span-3">
// // //                 <ProductGrid products={products} status={status}></ProductGrid>
// // //               </div>
// // //               {/* Product grid end */}
// // //             </div>
// // //           </section>

// // //           {/* section of product and filters ends */}
// // //           <Pagination
// // //             page={page}
// // //             setPage={setPage}
// // //             handlePage={handlePage}
// // //             totalItems={totalItems}
// // //           ></Pagination>
// // //         </main>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function MobileFilter({
// // //   mobileFiltersOpen,
// // //   setMobileFiltersOpen,
// // //   handleFilter,
// // //   filters,
// // // }) {
// // //   return (
// // //     <Transition.Root show={mobileFiltersOpen} as={Fragment}>
// // //       <Dialog
// // //         as="div"
// // //         className="relative z-40 lg:hidden"
// // //         onClose={setMobileFiltersOpen}
// // //       >
// // //         <Transition.Child
// // //           as={Fragment}
// // //           enter="transition-opacity ease-linear duration-300"
// // //           enterFrom="opacity-0"
// // //           enterTo="opacity-100"
// // //           leave="transition-opacity ease-linear duration-300"
// // //           leaveFrom="opacity-100"
// // //           leaveTo="opacity-0"
// // //         >
// // //           <div className="fixed inset-0 bg-black bg-opacity-25" />
// // //         </Transition.Child>

// // //         <div className="fixed inset-0 z-40 flex">
// // //           <Transition.Child
// // //             as={Fragment}
// // //             enter="transition ease-in-out duration-300 transform"
// // //             enterFrom="translate-x-full"
// // //             enterTo="translate-x-0"
// // //             leave="transition ease-in-out duration-300 transform"
// // //             leaveFrom="translate-x-0"
// // //             leaveTo="translate-x-full"
// // //           >
// // //             <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
// // //               <div className="flex items-center justify-between px-4">
// // //                 <h2 className="text-lg font-medium text-gray-900">Filters</h2>
// // //                 <button
// // //                   type="button"
// // //                   className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
// // //                   onClick={() => setMobileFiltersOpen(false)}
// // //                 >
// // //                   <span className="sr-only">Close menu</span>
// // //                   <XMarkIcon className="h-6 w-6" aria-hidden="true" />
// // //                 </button>
// // //               </div>

// // //               {/* Filters */}
// // //               <form className="mt-4 border-t border-gray-200">
// // //                 {filters.map((section) => (
// // //                   <Disclosure
// // //                     as="div"
// // //                     key={section.id}
// // //                     className="border-t border-gray-200 px-4 py-6"
// // //                   >
// // //                     {({ open }) => (
// // //                       <>
// // //                         <h3 className="-mx-2 -my-3 flow-root">
// // //                           <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
// // //                             <span className="font-medium text-gray-900">
// // //                               {section.name}
// // //                             </span>
// // //                             <span className="ml-6 flex items-center">
// // //                               {open ? (
// // //                                 <MinusIcon
// // //                                   className="h-5 w-5"
// // //                                   aria-hidden="true"
// // //                                 />
// // //                               ) : (
// // //                                 <PlusIcon
// // //                                   className="h-5 w-5"
// // //                                   aria-hidden="true"
// // //                                 />
// // //                               )}
// // //                             </span>
// // //                           </Disclosure.Button>
// // //                         </h3>
// // //                         <Disclosure.Panel className="pt-6">
// // //                           <div className="space-y-6">
// // //                             {section.options.map((option, optionIdx) => (
// // //                               <div
// // //                                 key={option.value}
// // //                                 className="flex items-center"
// // //                               >
// // //                                 <input
// // //                                   id={`filter-mobile-${section.id}-${optionIdx}`}
// // //                                   name={`${section.id}[]`}
// // //                                   defaultValue={option.value}
// // //                                   type="checkbox"
// // //                                   defaultChecked={option.checked}
// // //                                   onChange={(e) =>
// // //                                     handleFilter(e, section, option)
// // //                                   }
// // //                                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
// // //                                 />
// // //                                 <label
// // //                                   htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
// // //                                   className="ml-3 min-w-0 flex-1 text-gray-500"
// // //                                 >
// // //                                   {option.label}
// // //                                 </label>
// // //                               </div>
// // //                             ))}
// // //                           </div>
// // //                         </Disclosure.Panel>
// // //                       </>
// // //                     )}
// // //                   </Disclosure>
// // //                 ))}
// // //               </form>
// // //             </Dialog.Panel>
// // //           </Transition.Child>
// // //         </div>
// // //       </Dialog>
// // //     </Transition.Root>
// // //   );
// // // }

// // // function DesktopFilter({ handleFilter, filters }) {
// // //   return (
// // //     <form className="hidden lg:block">
// // //       {filters.map((section) => (
// // //         <Disclosure
// // //           as="div"
// // //           key={section.id}
// // //           className="border-b border-gray-200 py-6"
// // //         >
// // //           {({ open }) => (
// // //             <>
// // //               <h3 className="-my-3 flow-root">
// // //                 <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
// // //                   <span className="font-medium text-gray-900">
// // //                     {section.name}
// // //                   </span>
// // //                   <span className="ml-6 flex items-center">
// // //                     {open ? (
// // //                       <MinusIcon className="h-5 w-5" aria-hidden="true" />
// // //                     ) : (
// // //                       <PlusIcon className="h-5 w-5" aria-hidden="true" />
// // //                     )}
// // //                   </span>
// // //                 </Disclosure.Button>
// // //               </h3>
// // //               <Disclosure.Panel className="pt-6">
// // //                 <div className="space-y-4">
// // //                   {section.options.map((option, optionIdx) => (
// // //                     <div key={option.value} className="flex items-center">
// // //                       <input
// // //                         id={`filter-${section.id}-${optionIdx}`}
// // //                         name={`${section.id}[]`}
// // //                         defaultValue={option.value}
// // //                         type="checkbox"
// // //                         defaultChecked={option.checked}
// // //                         onChange={(e) => handleFilter(e, section, option)}
// // //                         className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
// // //                       />
// // //                       <label
// // //                         htmlFor={`filter-${section.id}-${optionIdx}`}
// // //                         className="ml-3 text-sm text-gray-600"
// // //                       >
// // //                         {option.label}
// // //                       </label>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </Disclosure.Panel>
// // //             </>
// // //           )}
// // //         </Disclosure>
// // //       ))}
// // //     </form>
// // //   );
// // // }

// // // function ProductGrid({ products, status }) {
// // //   return (
// // //     <div className="bg-white">
// // //       <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
// // //         <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
// // //           {status === "loading" ? (
// // //             <Grid
// // //               height="80"
// // //               width="80"
// // //               color="rgb(79, 70, 229) "
// // //               ariaLabel="grid-loading"
// // //               radius="12.5"
// // //               wrapperStyle={{}}
// // //               wrapperClass=""
// // //               visible={true}
// // //             />
// // //           ) : null}
// // //           {products.map((product) => (
// // //             <Link to={`/product-detail/${product.id}`} key={product.id}>
// // //               <div className="group relative border-solid border-2 p-2 border-gray-200">
// // //                 <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
// // //                   <img
// // //                     src={product.thumbnail}
// // //                     alt={product.title}
// // //                     className="h-full w-full object-cover object-center lg:h-full lg:w-full"
// // //                   />
// // //                 </div>
// // //                 <div className="mt-4 flex justify-between">
// // //                   <div>
// // //                     <h3 className="text-sm text-gray-700">
// // //                       <div href={product.thumbnail}>
// // //                         <span aria-hidden="true" className="absolute inset-0" />
// // //                         {product.title}
// // //                       </div>
// // //                     </h3>
// // //                     <p className="mt-1 text-sm text-gray-500">
// // //                       <StarIcon className="w-6 h-6 inline"></StarIcon>
// // //                       <span className=" align-bottom">{product.rating}</span>
// // //                     </p>
// // //                   </div>
// // //                   <div>
// // //                     <p className="text-sm block font-medium text-gray-900">
// // //                       $
// // //                       {product?.discountPrice
// // //                         ? product?.discountPrice
// // //                         : Math.round(
// // //                             product?.price *
// // //                               (1 - product?.discountPercentage / 100)
// // //                           )}
// // //                     </p>
// // //                     <p className="text-sm block line-through font-medium text-gray-400">
// // //                       ${product.price}
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //                 {product.deleted && (
// // //                   <div>
// // //                     <p className="text-sm text-red-400">product deleted</p>
// // //                   </div>
// // //                 )}
// // //                 {product.stock <= 0 && (
// // //                   <div>
// // //                     <p className="text-sm text-red-400">out of stock</p>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </Link>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }





// // // import React, { useState, Fragment, useEffect } from "react";
// // // import { useSelector, useDispatch } from "react-redux";
// // // import {
// // //   fetchBrandsAsync,
// // //   fetchCategoriesAsync,
// // //   fetchProductsByFiltersAsync,
// // //   selectAllProducts,
// // //   selectBrands,
// // //   selectCategories,
// // //   selectProductListStatus,
// // //   selectTotalItems,
// // // } from "../productSlice";
// // // import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
// // // import { XMarkIcon } from "@heroicons/react/24/outline";
// // // import {
// // //   ChevronLeftIcon,
// // //   ChevronRightIcon,
// // //   StarIcon,
// // // } from "@heroicons/react/20/solid";
// // // import { Link } from "react-router-dom";
// // // import {
// // //   ChevronDownIcon,
// // //   FunnelIcon,
// // //   MinusIcon,
// // //   PlusIcon,
// // //   Squares2X2Icon,
// // // } from "@heroicons/react/20/solid";
// // // import { ITEMS_PER_PAGE } from "../../../app/constants";
// // // import Pagination from "../../common/Pagination";
// // // import { Grid } from "react-loader-spinner";

// // // const sortOptions = [
// // //   { name: "Best Rating", sort: "rating", order: "desc", current: false },
// // //   {
// // //     name: "Price: Low to High",
// // //     sort: "discountPrice",
// // //     order: "asc",
// // //     current: false,
// // //   },
// // //   {
// // //     name: "Price: High to Low",
// // //     sort: "discountPrice",
// // //     order: "desc",
// // //     current: false,
// // //   },
// // // ];

// // // function classNames(...classes) {
// // //   return classes.filter(Boolean).join(" ");
// // // }

// // // export default function ProductList() {
// // //   const dispatch = useDispatch();
// // //   const products = useSelector(selectAllProducts);
// // //   const brands = useSelector(selectBrands);
// // //   const categories = useSelector(selectCategories);
// // //   const totalItems = useSelector(selectTotalItems);
// // //   const status = useSelector(selectProductListStatus);
// // //   const filters = [
// // //     {
// // //       id: "category",
// // //       name: "Category",
// // //       options: categories,
// // //     },
// // //     {
// // //       id: "brand",
// // //       name: "Brands",
// // //       options: brands,
// // //     },
// // //   ];

// // //   const [filter, setFilter] = useState({});
// // //   const [sort, setSort] = useState({});
// // //   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
// // //   const [page, setPage] = useState(1);

// // //   const handleFilter = (e, section, option) => {
// // //     const newFilter = { ...filter };
// // //     if (e.target.checked) {
// // //       if (newFilter[section.id]) {
// // //         newFilter[section.id].push(option.value);
// // //       } else {
// // //         newFilter[section.id] = [option.value];
// // //       }
// // //     } else {
// // //       const index = newFilter[section.id].findIndex(
// // //         (el) => el === option.value
// // //       );
// // //       newFilter[section.id].splice(index, 1);
// // //     }

// // //     setFilter(newFilter);
// // //   };

// // //   const handleSort = (e, option) => {
// // //     const sort = { _sort: option.sort, _order: option.order };

// // //     setSort(sort);
// // //   };

// // //   const handlePage = (page) => {
// // //     setPage(page);
// // //   };

// // //   useEffect(() => {
// // //     const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
// // //     dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
// // //   }, [dispatch, filter, sort, page]);

// // //   useEffect(() => {
// // //     setPage(1);
// // //   }, [totalItems, sort]);

// // //   useEffect(() => {
// // //     dispatch(fetchBrandsAsync());
// // //     dispatch(fetchCategoriesAsync());
// // //   }, []);

// // //   return (
// // //     <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
// // //       <div>
// // //         <MobileFilter
// // //           handleFilter={handleFilter}
// // //           mobileFiltersOpen={mobileFiltersOpen}
// // //           setMobileFiltersOpen={setMobileFiltersOpen}
// // //           filters={filters}
// // //         ></MobileFilter>

// // //         <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
// // //           <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 sm:gap-0 border-b border-gray-200 pb-6 sm:pb-8 pt-8 sm:pt-12">
// // //             <div>
// // //               <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
// // //                 All Products
// // //               </h1>
// // //               <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
// // //                 Discover our curated collection of premium products
// // //               </p>
// // //             </div>

// // //             <div className="flex items-center gap-2 sm:gap-3">
// // //               <Menu as="div" className="relative inline-block text-left">
// // //                 <div>
// // //                   <Menu.Button className="group inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200">
// // //                     Sort
// // //                     <ChevronDownIcon
// // //                       className="-mr-1 ml-1.5 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-gray-500 transition-colors"
// // //                       aria-hidden="true"
// // //                     />
// // //                   </Menu.Button>
// // //                 </div>

// // //                 <Transition
// // //                   as={Fragment}
// // //                   enter="transition ease-out duration-100"
// // //                   enterFrom="transform opacity-0 scale-95"
// // //                   enterTo="transform opacity-100 scale-100"
// // //                   leave="transition ease-in duration-75"
// // //                   leaveFrom="transform opacity-100 scale-100"
// // //                   leaveTo="transform opacity-0 scale-95"
// // //                 >
// // //                   <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
// // //                     <div className="py-1">
// // //                       {sortOptions.map((option) => (
// // //                         <Menu.Item key={option.name}>
// // //                           {({ active }) => (
// // //                             <p
// // //                               onClick={(e) => handleSort(e, option)}
// // //                               className={classNames(
// // //                                 option.current
// // //                                   ? "font-semibold text-indigo-600 bg-indigo-50"
// // //                                   : "text-gray-700",
// // //                                 active ? "bg-gray-50" : "",
// // //                                 "block px-4 py-3 text-sm cursor-pointer transition-colors duration-150"
// // //                               )}
// // //                             >
// // //                               {option.name}
// // //                             </p>
// // //                           )}
// // //                         </Menu.Item>
// // //                       ))}
// // //                     </div>
// // //                   </Menu.Items>
// // //                 </Transition>
// // //               </Menu>

// // //               <button
// // //                 type="button"
// // //                 className="p-2 sm:p-2.5 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-all duration-200"
// // //               >
// // //                 <span className="sr-only">View grid</span>
// // //                 <Squares2X2Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
// // //               </button>
// // //               <button
// // //                 type="button"
// // //                 className="lg:hidden p-2 sm:p-2.5 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-all duration-200"
// // //                 onClick={() => setMobileFiltersOpen(true)}
// // //               >
// // //                 <span className="sr-only">Filters</span>
// // //                 <FunnelIcon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
// // //               </button>
// // //             </div>
// // //           </div>

// // //           <section aria-labelledby="products-heading" className="pb-24 pt-8">
// // //             <h2 id="products-heading" className="sr-only">
// // //               Products
// // //             </h2>

// // //             <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
// // //               <DesktopFilter
// // //                 handleFilter={handleFilter}
// // //                 filters={filters}
// // //               ></DesktopFilter>
// // //               {/* Product grid */}
// // //               <div className="lg:col-span-3">
// // //                 <ProductGrid products={products} status={status}></ProductGrid>
// // //               </div>
// // //               {/* Product grid end */}
// // //             </div>
// // //           </section>

// // //           {/* section of product and filters ends */}
// // //           <Pagination
// // //             page={page}
// // //             setPage={setPage}
// // //             handlePage={handlePage}
// // //             totalItems={totalItems}
// // //           ></Pagination>
// // //         </main>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function MobileFilter({
// // //   mobileFiltersOpen,
// // //   setMobileFiltersOpen,
// // //   handleFilter,
// // //   filters,
// // // }) {
// // //   return (
// // //     <Transition.Root show={mobileFiltersOpen} as={Fragment}>
// // //       <Dialog
// // //         as="div"
// // //         className="relative z-40 lg:hidden"
// // //         onClose={setMobileFiltersOpen}
// // //       >
// // //         <Transition.Child
// // //           as={Fragment}
// // //           enter="transition-opacity ease-linear duration-300"
// // //           enterFrom="opacity-0"
// // //           enterTo="opacity-100"
// // //           leave="transition-opacity ease-linear duration-300"
// // //           leaveFrom="opacity-100"
// // //           leaveTo="opacity-0"
// // //         >
// // //           <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
// // //         </Transition.Child>

// // //         <div className="fixed inset-0 z-40 flex">
// // //           <Transition.Child
// // //             as={Fragment}
// // //             enter="transition ease-in-out duration-300 transform"
// // //             enterFrom="translate-x-full"
// // //             enterTo="translate-x-0"
// // //             leave="transition ease-in-out duration-300 transform"
// // //             leaveFrom="translate-x-0"
// // //             leaveTo="translate-x-full"
// // //           >
// // //             <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-6 pb-12 shadow-2xl">
// // //               <div className="flex items-center justify-between px-6">
// // //                 <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
// // //                 <button
// // //                   type="button"
// // //                   className="-mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors duration-200"
// // //                   onClick={() => setMobileFiltersOpen(false)}
// // //                 >
// // //                   <span className="sr-only">Close menu</span>
// // //                   <XMarkIcon className="h-6 w-6" aria-hidden="true" />
// // //                 </button>
// // //               </div>

// // //               {/* Filters */}
// // //               <form className="mt-6">
// // //                 {filters.map((section) => (
// // //                   <Disclosure
// // //                     as="div"
// // //                     key={section.id}
// // //                     className="border-t border-gray-200 px-6 py-6"
// // //                   >
// // //                     {({ open }) => (
// // //                       <>
// // //                         <h3 className="-mx-2 -my-3 flow-root">
// // //                           <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500 transition-colors duration-200">
// // //                             <span className="font-semibold text-gray-900">
// // //                               {section.name}
// // //                             </span>
// // //                             <span className="ml-6 flex items-center">
// // //                               {open ? (
// // //                                 <MinusIcon
// // //                                   className="h-5 w-5 text-indigo-600"
// // //                                   aria-hidden="true"
// // //                                 />
// // //                               ) : (
// // //                                 <PlusIcon
// // //                                   className="h-5 w-5"
// // //                                   aria-hidden="true"
// // //                                 />
// // //                               )}
// // //                             </span>
// // //                           </Disclosure.Button>
// // //                         </h3>
// // //                         <Disclosure.Panel className="pt-6">
// // //                           <div className="space-y-4">
// // //                             {section.options.map((option, optionIdx) => (
// // //                               <div
// // //                                 key={option.value}
// // //                                 className="flex items-center"
// // //                               >
// // //                                 <input
// // //                                   id={`filter-mobile-${section.id}-${optionIdx}`}
// // //                                   name={`${section.id}[]`}
// // //                                   defaultValue={option.value}
// // //                                   type="checkbox"
// // //                                   defaultChecked={option.checked}
// // //                                   onChange={(e) =>
// // //                                     handleFilter(e, section, option)
// // //                                   }
// // //                                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
// // //                                 />
// // //                                 <label
// // //                                   htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
// // //                                   className="ml-3 min-w-0 flex-1 text-gray-700 cursor-pointer"
// // //                                 >
// // //                                   {option.label}
// // //                                 </label>
// // //                               </div>
// // //                             ))}
// // //                           </div>
// // //                         </Disclosure.Panel>
// // //                       </>
// // //                     )}
// // //                   </Disclosure>
// // //                 ))}
// // //               </form>
// // //             </Dialog.Panel>
// // //           </Transition.Child>
// // //         </div>
// // //       </Dialog>
// // //     </Transition.Root>
// // //   );
// // // }

// // // function DesktopFilter({ handleFilter, filters }) {
// // //   return (
// // //     <form className="hidden lg:block">
// // //       <div className="sticky top-6 space-y-4">
// // //         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
// // //           <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
// // //             <h3 className="text-lg font-semibold text-gray-900 flex items-center">
// // //               <FunnelIcon className="h-5 w-5 mr-2 text-indigo-600" />
// // //               Filters
// // //             </h3>
// // //           </div>
// // //           {filters.map((section, idx) => (
// // //             <Disclosure
// // //               as="div"
// // //               key={section.id}
// // //               className={classNames(
// // //                 idx !== filters.length - 1 ? "border-b border-gray-200" : "",
// // //                 "py-6 px-6"
// // //               )}
// // //               defaultOpen={false}
// // //             >
// // //               {({ open }) => (
// // //                 <>
// // //                   <h3 className="-my-3 flow-root">
// // //                     <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500 transition-colors duration-200">
// // //                       <span className="font-semibold text-gray-900">
// // //                         {section.name}
// // //                       </span>
// // //                       <span className="ml-6 flex items-center">
// // //                         {open ? (
// // //                           <MinusIcon className="h-5 w-5 text-indigo-600" aria-hidden="true" />
// // //                         ) : (
// // //                           <PlusIcon className="h-5 w-5" aria-hidden="true" />
// // //                         )}
// // //                       </span>
// // //                     </Disclosure.Button>
// // //                   </h3>
// // //                   <Disclosure.Panel className="pt-6">
// // //                     <div className="space-y-4">
// // //                       {section.options.map((option, optionIdx) => (
// // //                         <div key={option.value} className="flex items-center group">
// // //                           <input
// // //                             id={`filter-${section.id}-${optionIdx}`}
// // //                             name={`${section.id}[]`}
// // //                             defaultValue={option.value}
// // //                             type="checkbox"
// // //                             defaultChecked={option.checked}
// // //                             onChange={(e) => handleFilter(e, section, option)}
// // //                             className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
// // //                           />
// // //                           <label
// // //                             htmlFor={`filter-${section.id}-${optionIdx}`}
// // //                             className="ml-3 text-sm text-gray-700 cursor-pointer group-hover:text-gray-900 transition-colors duration-150"
// // //                           >
// // //                             {option.label}
// // //                           </label>
// // //                         </div>
// // //                       ))}
// // //                     </div>
// // //                   </Disclosure.Panel>
// // //                 </>
// // //               )}
// // //             </Disclosure>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </form>
// // //   );
// // // }

// // // function ProductGrid({ products, status }) {
// // //   return (
// // //     <div className="bg-transparent">
// // //       <div className="mx-auto max-w-2xl px-0 py-0 sm:px-0 sm:py-0 lg:max-w-7xl lg:px-0">
// // //         {status === "loading" ? (
// // //           <div className="flex items-center justify-center py-24">
// // //             <Grid
// // //               height="80"
// // //               width="80"
// // //               color="rgb(79, 70, 229)"
// // //               ariaLabel="grid-loading"
// // //               radius="12.5"
// // //               wrapperStyle={{}}
// // //               wrapperClass=""
// // //               visible={true}
// // //             />
// // //           </div>
// // //         ) : (
// // //           <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
// // //             {products.map((product) => (
// // //               <Link to={`/product-detail/${product._id}`} key={product.id}>
// // //                 <div className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-300 hover:-translate-y-1">
// // //                   <div className="relative w-full overflow-hidden bg-gray-100 h-64 sm:h-72 md:h-80 lg:h-72">
// // //                     <img
// // //                       src={product.thumbnail}
// // //                       alt={product.title}
// // //                       className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
// // //                     />
// // //                     {product.deleted && (
// // //                       <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
// // //                         <span className="text-white font-semibold text-sm px-4 py-2 bg-red-500 rounded-lg">
// // //                           Product Deleted
// // //                         </span>
// // //                       </div>
// // //                     )}
// // //                     {product.stock <= 0 && !product.deleted && (
// // //                       <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
// // //                         <span className="text-white font-semibold text-sm px-4 py-2 bg-red-500 rounded-lg">
// // //                           Out of Stock
// // //                         </span>
// // //                       </div>
// // //                     )}
// // //                     <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg">
// // //                       <div className="flex items-center gap-0.5 sm:gap-1">
// // //                         <StarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
// // //                         <span className="text-xs sm:text-sm font-semibold text-gray-900">
// // //                           {product.rating}
// // //                         </span>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                   <div className="p-4 sm:p-5">
// // //                     <div className="mb-2 sm:mb-3">
// // //                       <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
// // //                         {product.title}
// // //                       </h3>
// // //                     </div>
// // //                     <div className="flex items-center justify-between">
// // //                       <div className="flex items-baseline gap-1.5 sm:gap-2">
// // //                         <p className="text-xl sm:text-2xl font-bold text-gray-900">
// // //                           $
// // //                           {product?.discountPrice
// // //                             ? product?.discountPrice
// // //                             : Math.round(
// // //                                 product?.price *
// // //                                   (1 - product?.discountPercentage / 100)
// // //                               )}
// // //                         </p>
// // //                         <p className="text-xs sm:text-sm line-through font-medium text-gray-400">
// // //                           ${product.price}
// // //                         </p>
// // //                       </div>
// // //                       <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-indigo-50 group-hover:bg-indigo-600 transition-colors duration-200">
// // //                         <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 group-hover:text-white transition-colors duration-200" />
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </Link>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // // import React, { useState, Fragment, useEffect } from "react";
// // // import { useSelector, useDispatch } from "react-redux";
// // // import {
// // //   fetchBrandsAsync,
// // //   fetchCategoriesAsync,
// // //   fetchProductsByFiltersAsync,
// // //   selectAllProducts,
// // //   selectBrands,
// // //   selectCategories,
// // //   selectProductListStatus,
// // //   selectTotalItems,
// // // } from "../productSlice";
// // // import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
// // // import { XMarkIcon } from "@heroicons/react/24/outline";
// // // import {
// // //   ChevronLeftIcon,
// // //   ChevronRightIcon,
// // //   StarIcon,
// // // } from "@heroicons/react/20/solid";
// // // import { Link } from "react-router-dom";
// // // import {
// // //   ChevronDownIcon,
// // //   FunnelIcon,
// // //   MinusIcon,
// // //   PlusIcon,
// // //   Squares2X2Icon,
// // // } from "@heroicons/react/20/solid";
// // // import { ITEMS_PER_PAGE } from "../../../app/constants";
// // // import Pagination from "../../common/Pagination";
// // // import { Grid } from "react-loader-spinner";
// // // import AdvertisingCarousel from "./AdvertisingCarousel";

// // // const sortOptions = [
// // //   { name: "Best Rating", sort: "rating", order: "desc", current: false },
// // //   {
// // //     name: "Price: Low to High",
// // //     sort: "discountPrice",
// // //     order: "asc",
// // //     current: false,
// // //   },
// // //   {
// // //     name: "Price: High to Low",
// // //     sort: "discountPrice",
// // //     order: "desc",
// // //     current: false,
// // //   },
// // // ];

// // // function classNames(...classes) {
// // //   return classes.filter(Boolean).join(" ");
// // // }
// // //   // Convert USD to INR (approximate rate: 1 USD = 83 INR)
// // // function formatINRR(usdPrice) {
// // //   const inrPrice = Math.round(usdPrice * 83);
// // //   return inrPrice.toLocaleString('en-IN');
// // // }


// // // export default function ProductList() {
// // //   const dispatch = useDispatch();
// // //   const products = useSelector(selectAllProducts);
// // //   const brands = useSelector(selectBrands);
// // //   const categories = useSelector(selectCategories);
// // //   const totalItems = useSelector(selectTotalItems);
// // //   const status = useSelector(selectProductListStatus);
// // //   const filters = [
// // //     {
// // //       id: "category",
// // //       name: "Category",
// // //       options: categories,
// // //     },
// // //     {
// // //       id: "brand",
// // //       name: "Brands",
// // //       options: brands,
// // //     },
// // //   ];

// // //   const [filter, setFilter] = useState({});
// // //   const [sort, setSort] = useState({});
// // //   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
// // //   const [page, setPage] = useState(1);

// // //   const handleFilter = (e, section, option) => {
// // //     const newFilter = { ...filter };
// // //     if (e.target.checked) {
// // //       if (newFilter[section.id]) {
// // //         newFilter[section.id].push(option.value);
// // //       } else {
// // //         newFilter[section.id] = [option.value];
// // //       }
// // //     } else {
// // //       const index = newFilter[section.id].findIndex(
// // //         (el) => el === option.value
// // //       );
// // //       newFilter[section.id].splice(index, 1);
// // //     }

// // //     setFilter(newFilter);
// // //   };

// // //   const handleSort = (e, option) => {
// // //     const sort = { _sort: option.sort, _order: option.order };

// // //     setSort(sort);
// // //   };

// // //   const handlePage = (page) => {
// // //     setPage(page);
// // //   };



// // //   useEffect(() => {
// // //     const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
// // //     dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
// // //   }, [dispatch, filter, sort, page]);

// // //   useEffect(() => {
// // //     setPage(1);
// // //   }, [totalItems, sort]);

// // //   useEffect(() => {
// // //     dispatch(fetchBrandsAsync());
// // //     dispatch(fetchCategoriesAsync());
// // //   }, []);

// // //   return (
// // //     <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
// // //       <div>
// // //         <MobileFilter
// // //           handleFilter={handleFilter}
// // //           mobileFiltersOpen={mobileFiltersOpen}
// // //           setMobileFiltersOpen={setMobileFiltersOpen}
// // //           filters={filters}
// // //         ></MobileFilter>

// // //         <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
// // //           {/* Advertising Carousel Section */}
// // //           <div className="pt-6 sm:pt-8 pb-8 sm:pb-10">
// // //             <AdvertisingCarousel />
// // //           </div>

// // //           <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-4 sm:gap-0 border-b border-gray-200 pb-6 sm:pb-8">
// // //             <div>
// // //               <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
// // //                 All Products
// // //               </h1>
// // //               <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
// // //                 Discover our curated collection of premium products
// // //               </p>
// // //             </div>

// // //             <div className="flex items-center gap-2 sm:gap-3">
// // //               <Menu as="div" className="relative inline-block text-left">
// // //                 <div>
// // //                   <Menu.Button className="group inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200">
// // //                     Sort
// // //                     <ChevronDownIcon
// // //                       className="-mr-1 ml-1.5 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-gray-500 transition-colors"
// // //                       aria-hidden="true"
// // //                     />
// // //                   </Menu.Button>
// // //                 </div>

// // //                 <Transition
// // //                   as={Fragment}
// // //                   enter="transition ease-out duration-100"
// // //                   enterFrom="transform opacity-0 scale-95"
// // //                   enterTo="transform opacity-100 scale-100"
// // //                   leave="transition ease-in duration-75"
// // //                   leaveFrom="transform opacity-100 scale-100"
// // //                   leaveTo="transform opacity-0 scale-95"
// // //                 >
// // //                   <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
// // //                     <div className="py-1">
// // //                       {sortOptions.map((option) => (
// // //                         <Menu.Item key={option.name}>
// // //                           {({ active }) => (
// // //                             <p
// // //                               onClick={(e) => handleSort(e, option)}
// // //                               className={classNames(
// // //                                 option.current
// // //                                   ? "font-semibold text-indigo-600 bg-indigo-50"
// // //                                   : "text-gray-700",
// // //                                 active ? "bg-gray-50" : "",
// // //                                 "block px-4 py-3 text-sm cursor-pointer transition-colors duration-150"
// // //                               )}
// // //                             >
// // //                               {option.name}
// // //                             </p>
// // //                           )}
// // //                         </Menu.Item>
// // //                       ))}
// // //                     </div>
// // //                   </Menu.Items>
// // //                 </Transition>
// // //               </Menu>

// // //               <button
// // //                 type="button"
// // //                 className="p-2 sm:p-2.5 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-all duration-200"
// // //               >
// // //                 <span className="sr-only">View grid</span>
// // //                 <Squares2X2Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
// // //               </button>
// // //               <button
// // //                 type="button"
// // //                 className="lg:hidden p-2 sm:p-2.5 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-all duration-200"
// // //                 onClick={() => setMobileFiltersOpen(true)}
// // //               >
// // //                 <span className="sr-only">Filters</span>
// // //                 <FunnelIcon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
// // //               </button>
// // //             </div>
// // //           </div>

// // //           <section aria-labelledby="products-heading" className="pb-24 pt-8">
// // //             <h2 id="products-heading" className="sr-only">
// // //               Products
// // //             </h2>

// // //             <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
// // //               <DesktopFilter
// // //                 handleFilter={handleFilter}
// // //                 filters={filters}
// // //               ></DesktopFilter>
// // //               {/* Product grid */}
// // //               <div className="lg:col-span-3">
// // //                 <ProductGrid products={products} status={status}></ProductGrid>
// // //               </div>
// // //               {/* Product grid end */}
// // //             </div>
// // //           </section>

// // //           {/* section of product and filters ends */}
// // //           <Pagination
// // //             page={page}
// // //             setPage={setPage}
// // //             handlePage={handlePage}
// // //             totalItems={totalItems}
// // //           ></Pagination>
// // //         </main>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function MobileFilter({
// // //   mobileFiltersOpen,
// // //   setMobileFiltersOpen,
// // //   handleFilter,
// // //   filters,
// // // }) {
// // //   return (
// // //     <Transition.Root show={mobileFiltersOpen} as={Fragment}>
// // //       <Dialog
// // //         as="div"
// // //         className="relative z-40 lg:hidden"
// // //         onClose={setMobileFiltersOpen}
// // //       >
// // //         <Transition.Child
// // //           as={Fragment}
// // //           enter="transition-opacity ease-linear duration-300"
// // //           enterFrom="opacity-0"
// // //           enterTo="opacity-100"
// // //           leave="transition-opacity ease-linear duration-300"
// // //           leaveFrom="opacity-100"
// // //           leaveTo="opacity-0"
// // //         >
// // //           <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
// // //         </Transition.Child>

// // //         <div className="fixed inset-0 z-40 flex">
// // //           <Transition.Child
// // //             as={Fragment}
// // //             enter="transition ease-in-out duration-300 transform"
// // //             enterFrom="translate-x-full"
// // //             enterTo="translate-x-0"
// // //             leave="transition ease-in-out duration-300 transform"
// // //             leaveFrom="translate-x-0"
// // //             leaveTo="translate-x-full"
// // //           >
// // //             <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-6 pb-12 shadow-2xl">
// // //               <div className="flex items-center justify-between px-6">
// // //                 <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
// // //                 <button
// // //                   type="button"
// // //                   className="-mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors duration-200"
// // //                   onClick={() => setMobileFiltersOpen(false)}
// // //                 >
// // //                   <span className="sr-only">Close menu</span>
// // //                   <XMarkIcon className="h-6 w-6" aria-hidden="true" />
// // //                 </button>
// // //               </div>

// // //               {/* Filters */}
// // //               <form className="mt-6">
// // //                 {filters.map((section) => (
// // //                   <Disclosure
// // //                     as="div"
// // //                     key={section.id}
// // //                     className="border-t border-gray-200 px-6 py-6"
// // //                   >
// // //                     {({ open }) => (
// // //                       <>
// // //                         <h3 className="-mx-2 -my-3 flow-root">
// // //                           <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500 transition-colors duration-200">
// // //                             <span className="font-semibold text-gray-900">
// // //                               {section.name}
// // //                             </span>
// // //                             <span className="ml-6 flex items-center">
// // //                               {open ? (
// // //                                 <MinusIcon
// // //                                   className="h-5 w-5 text-indigo-600"
// // //                                   aria-hidden="true"
// // //                                 />
// // //                               ) : (
// // //                                 <PlusIcon
// // //                                   className="h-5 w-5"
// // //                                   aria-hidden="true"
// // //                                 />
// // //                               )}
// // //                             </span>
// // //                           </Disclosure.Button>
// // //                         </h3>
// // //                         <Disclosure.Panel className="pt-6">
// // //                           <div className="space-y-4">
// // //                             {section.options.map((option, optionIdx) => (
// // //                               <div
// // //                                 key={option.value}
// // //                                 className="flex items-center"
// // //                               >
// // //                                 <input
// // //                                   id={`filter-mobile-${section.id}-${optionIdx}`}
// // //                                   name={`${section.id}[]`}
// // //                                   defaultValue={option.value}
// // //                                   type="checkbox"
// // //                                   defaultChecked={option.checked}
// // //                                   onChange={(e) =>
// // //                                     handleFilter(e, section, option)
// // //                                   }
// // //                                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
// // //                                 />
// // //                                 <label
// // //                                   htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
// // //                                   className="ml-3 min-w-0 flex-1 text-gray-700 cursor-pointer"
// // //                                 >
// // //                                   {option.label}
// // //                                 </label>
// // //                               </div>
// // //                             ))}
// // //                           </div>
// // //                         </Disclosure.Panel>
// // //                       </>
// // //                     )}
// // //                   </Disclosure>
// // //                 ))}
// // //               </form>
// // //             </Dialog.Panel>
// // //           </Transition.Child>
// // //         </div>
// // //       </Dialog>
// // //     </Transition.Root>
// // //   );
// // // }

// // // function DesktopFilter({ handleFilter, filters }) {
// // //   return (
// // //     <form className="hidden lg:block">
// // //       <div className="sticky top-6 space-y-4">
// // //         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
// // //           <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
// // //             <h3 className="text-lg font-semibold text-gray-900 flex items-center">
// // //               <FunnelIcon className="h-5 w-5 mr-2 text-indigo-600" />
// // //               Filters
// // //             </h3>
// // //           </div>
// // //           {filters.map((section, idx) => (
// // //             <Disclosure
// // //               as="div"
// // //               key={section.id}
// // //               className={classNames(
// // //                 idx !== filters.length - 1 ? "border-b border-gray-200" : "",
// // //                 "py-6 px-6"
// // //               )}
// // //               defaultOpen={false}
// // //             >
// // //               {({ open }) => (
// // //                 <>
// // //                   <h3 className="-my-3 flow-root">
// // //                     <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500 transition-colors duration-200">
// // //                       <span className="font-semibold text-gray-900">
// // //                         {section.name}
// // //                       </span>
// // //                       <span className="ml-6 flex items-center">
// // //                         {open ? (
// // //                           <MinusIcon className="h-5 w-5 text-indigo-600" aria-hidden="true" />
// // //                         ) : (
// // //                           <PlusIcon className="h-5 w-5" aria-hidden="true" />
// // //                         )}
// // //                       </span>
// // //                     </Disclosure.Button>
// // //                   </h3>
// // //                   <Disclosure.Panel className="pt-6">
// // //                     <div className="space-y-4">
// // //                       {section.options.map((option, optionIdx) => (
// // //                         <div key={option.value} className="flex items-center group">
// // //                           <input
// // //                             id={`filter-${section.id}-${optionIdx}`}
// // //                             name={`${section.id}[]`}
// // //                             defaultValue={option.value}
// // //                             type="checkbox"
// // //                             defaultChecked={option.checked}
// // //                             onChange={(e) => handleFilter(e, section, option)}
// // //                             className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
// // //                           />
// // //                           <label
// // //                             htmlFor={`filter-${section.id}-${optionIdx}`}
// // //                             className="ml-3 text-sm text-gray-700 cursor-pointer group-hover:text-gray-900 transition-colors duration-150"
// // //                           >
// // //                             {option.label}
// // //                           </label>
// // //                         </div>
// // //                       ))}
// // //                     </div>
// // //                   </Disclosure.Panel>
// // //                 </>
// // //               )}
// // //             </Disclosure>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     </form>
// // //   );
// // // }

// // // function ProductGrid({ products, status }) {
// // //   return (
// // //     <div className="bg-transparent">
// // //       <div className="mx-auto max-w-2xl px-0 py-0 sm:px-0 sm:py-0 lg:max-w-7xl lg:px-0">
// // //         {status === "loading" ? (
// // //           <div className="flex items-center justify-center py-24">
// // //             <Grid
// // //               height="80"
// // //               width="80"
// // //               color="rgb(79, 70, 229)"
// // //               ariaLabel="grid-loading"
// // //               radius="12.5"
// // //               wrapperStyle={{}}
// // //               wrapperClass=""
// // //               visible={true}
// // //             />
// // //           </div>
// // //         ) : (
// // //           <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
// // //             {products.map((product) => (
// // //               <Link to={`/product-detail/${product._id}`} key={product.id}>
// // //                 <div className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-300 hover:-translate-y-1">
// // //                   <div className="relative w-full overflow-hidden bg-gray-100 h-64 sm:h-72 md:h-80 lg:h-72">
// // //                     <img
// // //                       src={product.thumbnail}
// // //                       alt={product.title}
// // //                       className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
// // //                     />
// // //                     {product.deleted && (
// // //                       <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
// // //                         <span className="text-white font-semibold text-sm px-4 py-2 bg-red-500 rounded-lg">
// // //                           Product Deleted
// // //                         </span>
// // //                       </div>
// // //                     )}
// // //                     {product.stock <= 0 && !product.deleted && (
// // //                       <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
// // //                         <span className="text-white font-semibold text-sm px-4 py-2 bg-red-500 rounded-lg">
// // //                           Out of Stock
// // //                         </span>
// // //                       </div>
// // //                     )}
// // //                     <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg">
// // //                       <div className="flex items-center gap-0.5 sm:gap-1">
// // //                         <StarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
// // //                         <span className="text-xs sm:text-sm font-semibold text-gray-900">
// // //                           {product.rating}
// // //                         </span>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                   <div className="p-4 sm:p-5">
// // //                     <div className="mb-2 sm:mb-3">
// // //                       <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
// // //                         {product.title}
// // //                       </h3>
// // //                     </div>
// // //                     <div className="flex items-center justify-between">
// // //                       <div className="flex items-baseline gap-1.5 sm:gap-2">
// // //                         <p className="text-xl sm:text-2xl font-bold text-gray-900">
// // //                           {/* $
// // //                           {product?.discountPrice
// // //                             ? product?.discountPrice
// // //                             : Math.round(
// // //                                 product?.price *
// // //                                   (1 - product?.discountPercentage / 100)
// // //                               )} */}

// // //                                 ₹
// // //                       {formatINR(
// // //                         product?.discountPrice ||
// // //                         Math.round(
// // //                           product?.price * (1 - product?.discountPercentage / 100)
// // //                         )
// // //                       )}
// // //                         </p>
// // //                         <p className="text-xs sm:text-sm line-through font-medium text-gray-400">
// // //                           {/* ${product.price} */}
// // //                            ₹{formatINR(product?.price)}
// // //                         </p>
// // //                       </div>
// // //                       <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-indigo-50 group-hover:bg-indigo-600 transition-colors duration-200">
// // //                         <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 group-hover:text-white transition-colors duration-200" />
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </Link>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }











// // import React, { useState, Fragment, useEffect, useRef } from "react";
// // import { useSelector, useDispatch } from "react-redux";
// // import {
// //   fetchBrandsAsync,
// //   fetchCategoriesAsync,
// //   fetchProductsByFiltersAsync,
// //   selectAllProducts,
// //   selectBrands,
// //   selectCategories,
// //   selectProductListStatus,
// //   selectTotalItems,
// // } from "../productSlice";
// // import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
// // import { XMarkIcon } from "@heroicons/react/24/outline";
// // import {
// //   ChevronLeftIcon,
// //   ChevronRightIcon,
// //   StarIcon,
// // } from "@heroicons/react/20/solid";
// // import { Link } from "react-router-dom";
// // import {
// //   ChevronDownIcon,
// //   FunnelIcon,
// //   MinusIcon,
// //   PlusIcon,
// //   Squares2X2Icon,
// // } from "@heroicons/react/20/solid";
// // import { ITEMS_PER_PAGE } from "../../../app/constants";
// // import Pagination from "../../common/Pagination";
// // import { Grid } from "react-loader-spinner";
// // import AdvertisingCarousel from "./AdvertisingCarousel";

// // const sortOptions = [
// //   { name: "Best Rating", sort: "rating", order: "desc", current: false },
// //   {
// //     name: "Price: Low to High",
// //     sort: "discountPrice",
// //     order: "asc",
// //     current: false,
// //   },
// //   {
// //     name: "Price: High to Low",
// //     sort: "discountPrice",
// //     order: "desc",
// //     current: false,
// //   },
// // ];

// // function classNames(...classes) {
// //   return classes.filter(Boolean).join(" ");
// // }
// //   // Convert USD to INR (approximate rate: 1 USD = 83 INR)
// // function formatINRR(usdPrice) {
// //   const inrPrice = Math.round(usdPrice * 83);
// //   return inrPrice.toLocaleString('en-IN');
// // }


// // export default function ProductList() {
// //   const dispatch = useDispatch();
// //   const products = useSelector(selectAllProducts);
// //   const brands = useSelector(selectBrands);
// //   const categories = useSelector(selectCategories);
// //   const totalItems = useSelector(selectTotalItems);
// //   const status = useSelector(selectProductListStatus);
// //   const [filter, setFilter] = useState({});
// //   const [sort, setSort] = useState({});
// //   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
// //   const [page, setPage] = useState(1);

// // //   const products = useSelector(selectAllProducts);
// // // const status = useSelector(selectProductListStatus);
// // const nextCursor = useSelector((state) => state.product.nextCursor);

// // const loaderRef = useRef(null);

// //   // 🔁 Reset & first fetch
// //   useEffect(() => {
// //     dispatch({ type: "product/resetProducts" });
// //     dispatch(fetchProductsByFiltersAsync({ filter, sort, cursor: null }));
// //   }, [filter, sort, dispatch]);

// //   // 🔥 Infinite Scroll (BEST PRACTICE)
// //   useEffect(() => {
// //     if (!loaderRef.current) return;

// //     const observer = new IntersectionObserver(
// //       ([entry]) => {
// //         if (entry.isIntersecting && nextCursor && status !== "loading") {
// //           dispatch(
// //             fetchProductsByFiltersAsync({
// //               filter,
// //               sort,
// //               cursor: nextCursor,
// //             })
// //           );
// //         }
// //       },
// //       { rootMargin: "200px" }
// //     );

// //     observer.observe(loaderRef.current);
// //     return () => observer.disconnect();
// //   }, [nextCursor, status, filter, sort, dispatch]);



// //   const filters = [
// //     {
// //       id: "category",
// //       name: "Category",
// //       options: categories,
// //     },
// //     {
// //       id: "brand",
// //       name: "Brands",
// //       options: brands,
// //     },
// //   ];


// //   const handleFilter = (e, section, option) => {
// //     const newFilter = { ...filter };
// //     if (e.target.checked) {
// //       if (newFilter[section.id]) {
// //         newFilter[section.id].push(option.value);
// //       } else {
// //         newFilter[section.id] = [option.value];
// //       }
// //     } else {
// //       const index = newFilter[section.id].findIndex(
// //         (el) => el === option.value
// //       );
// //       newFilter[section.id].splice(index, 1);
// //     }

// //     setFilter(newFilter);
// //   };

// //   const handleSort = (e, option) => {
// //     const sort = { _sort: option.sort, _order: option.order };

// //     setSort(sort);
// //   };

// //   const handlePage = (page) => {
// //     setPage(page);
// //   };



// //   useEffect(() => {
// //     const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
// //     dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
// //   }, [dispatch, filter, sort, page]);

// //   useEffect(() => {
// //     setPage(1);
// //   }, [totalItems, sort]);

// //   useEffect(() => {
// //     dispatch(fetchBrandsAsync());
// //     dispatch(fetchCategoriesAsync());
// //   }, []);

// //   return (
// //     <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
// //       <div>
// //         <MobileFilter
// //           handleFilter={handleFilter}
// //           mobileFiltersOpen={mobileFiltersOpen}
// //           setMobileFiltersOpen={setMobileFiltersOpen}
// //           filters={filters}
// //         ></MobileFilter>

// //         <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
// //           {/* Advertising Carousel Section */}
// //           <div className="pt-6 sm:pt-8 pb-8 sm:pb-10">
// //             <AdvertisingCarousel />
// //           </div>

// //           <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-4 sm:gap-0 border-b border-gray-200 pb-6 sm:pb-8">
// //             <div>
// //               <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
// //                 All Products
// //               </h1>
// //               <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
// //                 Discover our curated collection of premium products
// //               </p>
// //             </div>

// //             <div className="flex items-center gap-2 sm:gap-3">
// //               <Menu as="div" className="relative inline-block text-left">
// //                 <div>
// //                   <Menu.Button className="group inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200">
// //                     Sort
// //                     <ChevronDownIcon
// //                       className="-mr-1 ml-1.5 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-gray-500 transition-colors"
// //                       aria-hidden="true"
// //                     />
// //                   </Menu.Button>
// //                 </div>

// //                 <Transition
// //                   as={Fragment}
// //                   enter="transition ease-out duration-100"
// //                   enterFrom="transform opacity-0 scale-95"
// //                   enterTo="transform opacity-100 scale-100"
// //                   leave="transition ease-in duration-75"
// //                   leaveFrom="transform opacity-100 scale-100"
// //                   leaveTo="transform opacity-0 scale-95"
// //                 >
// //                   <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
// //                     <div className="py-1">
// //                       {sortOptions.map((option) => (
// //                         <Menu.Item key={option.name}>
// //                           {({ active }) => (
// //                             <p
// //                               onClick={(e) => handleSort(e, option)}
// //                               className={classNames(
// //                                 option.current
// //                                   ? "font-semibold text-indigo-600 bg-indigo-50"
// //                                   : "text-gray-700",
// //                                 active ? "bg-gray-50" : "",
// //                                 "block px-4 py-3 text-sm cursor-pointer transition-colors duration-150"
// //                               )}
// //                             >
// //                               {option.name}
// //                             </p>
// //                           )}
// //                         </Menu.Item>
// //                       ))}
// //                     </div>
// //                   </Menu.Items>
// //                 </Transition>
// //               </Menu>

// //               <button
// //                 type="button"
// //                 className="p-2 sm:p-2.5 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-all duration-200"
// //               >
// //                 <span className="sr-only">View grid</span>
// //                 <Squares2X2Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
// //               </button>
// //               <button
// //                 type="button"
// //                 className="lg:hidden p-2 sm:p-2.5 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-all duration-200"
// //                 onClick={() => setMobileFiltersOpen(true)}
// //               >
// //                 <span className="sr-only">Filters</span>
// //                 <FunnelIcon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
// //               </button>
// //             </div>
// //           </div>

// //           <section aria-labelledby="products-heading" className="pb-24 pt-8">
// //             <h2 id="products-heading" className="sr-only">
// //               Products
// //             </h2>

// //             <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
// //               <DesktopFilter
// //                 handleFilter={handleFilter}
// //                 filters={filters}
// //               ></DesktopFilter>
// //               {/* Product grid */}
// //               <div className="lg:col-span-3">
// //                 <ProductGrid products={products} status={status} loaderRef={loaderRef}></ProductGrid>
// //               </div>
// //               {/* Product grid end */}
// //             </div>
// //           </section>

// //           {/* section of product and filters ends */}
// //           <Pagination
// //             page={page}
// //             setPage={setPage}
// //             handlePage={handlePage}
// //             totalItems={totalItems}
// //           ></Pagination>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }

// // function MobileFilter({
// //   mobileFiltersOpen,
// //   setMobileFiltersOpen,
// //   handleFilter,
// //   filters,
// // }) {
// //   return (
// //     <Transition.Root show={mobileFiltersOpen} as={Fragment}>
// //       <Dialog
// //         as="div"
// //         className="relative z-40 lg:hidden"
// //         onClose={setMobileFiltersOpen}
// //       >
// //         <Transition.Child
// //           as={Fragment}
// //           enter="transition-opacity ease-linear duration-300"
// //           enterFrom="opacity-0"
// //           enterTo="opacity-100"
// //           leave="transition-opacity ease-linear duration-300"
// //           leaveFrom="opacity-100"
// //           leaveTo="opacity-0"
// //         >
// //           <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
// //         </Transition.Child>

// //         <div className="fixed inset-0 z-40 flex">
// //           <Transition.Child
// //             as={Fragment}
// //             enter="transition ease-in-out duration-300 transform"
// //             enterFrom="translate-x-full"
// //             enterTo="translate-x-0"
// //             leave="transition ease-in-out duration-300 transform"
// //             leaveFrom="translate-x-0"
// //             leaveTo="translate-x-full"
// //           >
// //             <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-6 pb-12 shadow-2xl">
// //               <div className="flex items-center justify-between px-6">
// //                 <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
// //                 <button
// //                   type="button"
// //                   className="-mr-2 flex h-10 w-10 items-center justify-center rounded-lg bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors duration-200"
// //                   onClick={() => setMobileFiltersOpen(false)}
// //                 >
// //                   <span className="sr-only">Close menu</span>
// //                   <XMarkIcon className="h-6 w-6" aria-hidden="true" />
// //                 </button>
// //               </div>

// //               {/* Filters */}
// //               <form className="mt-6">
// //                 {filters.map((section) => (
// //                   <Disclosure
// //                     as="div"
// //                     key={section.id}
// //                     className="border-t border-gray-200 px-6 py-6"
// //                   >
// //                     {({ open }) => (
// //                       <>
// //                         <h3 className="-mx-2 -my-3 flow-root">
// //                           <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500 transition-colors duration-200">
// //                             <span className="font-semibold text-gray-900">
// //                               {section.name}
// //                             </span>
// //                             <span className="ml-6 flex items-center">
// //                               {open ? (
// //                                 <MinusIcon
// //                                   className="h-5 w-5 text-indigo-600"
// //                                   aria-hidden="true"
// //                                 />
// //                               ) : (
// //                                 <PlusIcon
// //                                   className="h-5 w-5"
// //                                   aria-hidden="true"
// //                                 />
// //                               )}
// //                             </span>
// //                           </Disclosure.Button>
// //                         </h3>
// //                         <Disclosure.Panel className="pt-6">
// //                           <div className="space-y-4">
// //                             {section.options.map((option, optionIdx) => (
// //                               <div
// //                                 key={option.value}
// //                                 className="flex items-center"
// //                               >
// //                                 <input
// //                                   id={`filter-mobile-${section.id}-${optionIdx}`}
// //                                   name={`${section.id}[]`}
// //                                   defaultValue={option.value}
// //                                   type="checkbox"
// //                                   defaultChecked={option.checked}
// //                                   onChange={(e) =>
// //                                     handleFilter(e, section, option)
// //                                   }
// //                                   className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
// //                                 />
// //                                 <label
// //                                   htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
// //                                   className="ml-3 min-w-0 flex-1 text-gray-700 cursor-pointer"
// //                                 >
// //                                   {option.label}
// //                                 </label>
// //                               </div>
// //                             ))}
// //                           </div>
// //                         </Disclosure.Panel>
// //                       </>
// //                     )}
// //                   </Disclosure>
// //                 ))}
// //               </form>
// //             </Dialog.Panel>
// //           </Transition.Child>
// //         </div>
// //       </Dialog>
// //     </Transition.Root>
// //   );
// // }

// // function DesktopFilter({ handleFilter, filters }) {
// //   return (
// //     <form className="hidden lg:block">
// //       <div className="sticky top-6 space-y-4">
// //         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
// //           <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
// //             <h3 className="text-lg font-semibold text-gray-900 flex items-center">
// //               <FunnelIcon className="h-5 w-5 mr-2 text-indigo-600" />
// //               Filters
// //             </h3>
// //           </div>
// //           {filters.map((section, idx) => (
// //             <Disclosure
// //               as="div"
// //               key={section.id}
// //               className={classNames(
// //                 idx !== filters.length - 1 ? "border-b border-gray-200" : "",
// //                 "py-6 px-6"
// //               )}
// //               defaultOpen={false}
// //             >
// //               {({ open }) => (
// //                 <>
// //                   <h3 className="-my-3 flow-root">
// //                     <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500 transition-colors duration-200">
// //                       <span className="font-semibold text-gray-900">
// //                         {section.name}
// //                       </span>
// //                       <span className="ml-6 flex items-center">
// //                         {open ? (
// //                           <MinusIcon className="h-5 w-5 text-indigo-600" aria-hidden="true" />
// //                         ) : (
// //                           <PlusIcon className="h-5 w-5" aria-hidden="true" />
// //                         )}
// //                       </span>
// //                     </Disclosure.Button>
// //                   </h3>
// //                   <Disclosure.Panel className="pt-6">
// //                     <div className="space-y-4">
// //                       {section.options.map((option, optionIdx) => (
// //                         <div key={option.value} className="flex items-center group">
// //                           <input
// //                             id={`filter-${section.id}-${optionIdx}`}
// //                             name={`${section.id}[]`}
// //                             defaultValue={option.value}
// //                             type="checkbox"
// //                             defaultChecked={option.checked}
// //                             onChange={(e) => handleFilter(e, section, option)}
// //                             className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
// //                           />
// //                           <label
// //                             htmlFor={`filter-${section.id}-${optionIdx}`}
// //                             className="ml-3 text-sm text-gray-700 cursor-pointer group-hover:text-gray-900 transition-colors duration-150"
// //                           >
// //                             {option.label}
// //                           </label>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </Disclosure.Panel>
// //                 </>
// //               )}
// //             </Disclosure>
// //           ))}
// //         </div>
// //       </div>
// //     </form>
// //   );
// // }

// // function ProductGrid({ products, status,loaderRef }) {
// //   return (
// //     <div className="bg-transparent">
// //       <div className="mx-auto max-w-2xl px-0 py-0 sm:px-0 sm:py-0 lg:max-w-7xl lg:px-0">
// //         {status === "loading" ? (
// //           <div className="flex items-center justify-center py-24">
// //             <Grid
// //               height="80"
// //               width="80"
// //               color="rgb(79, 70, 229)"
// //               ariaLabel="grid-loading"
// //               radius="12.5"
// //               wrapperStyle={{}}
// //               wrapperClass=""
// //               visible={true}
// //             />
// //           </div>
// //         ) : (
// //           <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
// //             {products.map((product) => (
// //               <Link to={`/product-detail/${product._id}`} key={product.id}>
// //                 <div className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-300 hover:-translate-y-1">
// //                   <div className="relative w-full overflow-hidden bg-gray-100 h-64 sm:h-72 md:h-80 lg:h-72">
// //                     <img
// //                       src={product.thumbnail}
// //                       alt={product.title}
// //                       className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
// //                     />
// //                     {product.deleted && (
// //                       <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
// //                         <span className="text-white font-semibold text-sm px-4 py-2 bg-red-500 rounded-lg">
// //                           Product Deleted
// //                         </span>
// //                       </div>
// //                     )}
// //                     {product.stock <= 0 && !product.deleted && (
// //                       <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
// //                         <span className="text-white font-semibold text-sm px-4 py-2 bg-red-500 rounded-lg">
// //                           Out of Stock
// //                         </span>
// //                       </div>
// //                     )}
// //                     <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg">
// //                       <div className="flex items-center gap-0.5 sm:gap-1">
// //                         <StarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
// //                         <span className="text-xs sm:text-sm font-semibold text-gray-900">
// //                           {product.rating}
// //                         </span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <div className="p-4 sm:p-5">
// //                     <div className="mb-2 sm:mb-3">
// //                       <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
// //                         {product.title}
// //                       </h3>
// //                     </div>
// //                     <div className="flex items-center justify-between">
// //                       <div className="flex items-baseline gap-1.5 sm:gap-2">
// //                         <p className="text-xl sm:text-2xl font-bold text-gray-900">
// //                           {/* $
// //                           {product?.discountPrice
// //                             ? product?.discountPrice
// //                             : Math.round(
// //                                 product?.price *
// //                                   (1 - product?.discountPercentage / 100)
// //                               )} */}

// //                                 ₹
// //                       {formatINR(
// //                         product?.discountPrice ||
// //                         Math.round(
// //                           product?.price * (1 - product?.discountPercentage / 100)
// //                         )
// //                       )}
// //                         </p>
// //                         <p className="text-xs sm:text-sm line-through font-medium text-gray-400">
// //                           {/* ${product.price} */}
// //                            ₹{formatINR(product?.price)}
// //                         </p>
// //                       </div>
// //                       <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-indigo-50 group-hover:bg-indigo-600 transition-colors duration-200">
// //                         <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 group-hover:text-white transition-colors duration-200" />
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </Link>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //       <div ref={loaderRef} className="h-10" />
// //     </div>
// //   );
// // }





// import React, { useState, Fragment, useEffect, useRef } from "react";
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
// import { Grid } from "react-loader-spinner";
// import AdvertisingCarousel from "./AdvertisingCarousel";

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

//   const loaderRef = useRef(null);
//   const isFirstLoad = useRef(true);

//   const filters = [
//     {
//       id: "category",
//       name: "Category",
//       options: categories,
//     },
//     {
//       id: "brand",
//       name: "Brands",
//       options: brands,
//     },
//   ];

//   // ===== INITIAL DATA FETCH =====
//   useEffect(() => {
//     dispatch(fetchBrandsAsync());
//     dispatch(fetchCategoriesAsync());
//   }, [dispatch]);

//   // ===== RESET & FIRST FETCH when filter/sort changes =====
//   useEffect(() => {
//     // Reset products and fetch first batch
//     dispatch(resetProducts());
//     dispatch(
//       fetchProductsByFiltersAsync({
//         filter,
//         sort,
//         cursor: null,
//       })
//     );
//   }, [filter, sort, dispatch]);

//   // ===== INFINITE SCROLL OBSERVER =====
//   useEffect(() => {
//     if (!loaderRef.current) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         // Trigger when:
//         // 1. Loader is visible
//         // 2. Has more products to load
//         // 3. Not currently loading
//         // 4. No errors
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
//         rootMargin: "400px", // Load products 400px before reaching bottom
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
      
//       // Remove empty arrays
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
//   console.log("Rendered ProductList with products:", products);

//   return (
//     <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
//       <div>
//         <MobileFilter
//           handleFilter={handleFilter}
//           mobileFiltersOpen={mobileFiltersOpen}
//           setMobileFiltersOpen={setMobileFiltersOpen}
//           filters={filters}
//         />

//         <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           {/* Advertising Carousel Section */}
//           <div className="pt-6 sm:pt-8 pb-8 sm:pb-10">
//             <AdvertisingCarousel />
//           </div>

//           <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-4 sm:gap-0 border-b border-gray-200 pb-6 sm:pb-8">
//             <div>
//               <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
//                 All Products
//               </h1>
//               <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
//                 {products.length > 0 && `Showing ${products.length} products`}
//               </p>
//             </div>

//             <div className="flex items-center gap-2 sm:gap-3">
//               <Menu as="div" className="relative inline-block text-left">
//                 <div>
//                   <Menu.Button className="group inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200">
//                     {currentSortOption || "Sort"}
//                     <ChevronDownIcon
//                       className="-mr-1 ml-1.5 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-gray-500 transition-colors"
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
//                 className="p-2 sm:p-2.5 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-all duration-200"
//               >
//                 <span className="sr-only">View grid</span>
//                 <Squares2X2Icon
//                   className="h-5 w-5 sm:h-6 sm:w-6"
//                   aria-hidden="true"
//                 />
//               </button>
//               <button
//                 type="button"
//                 className="lg:hidden p-2 sm:p-2.5 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-all duration-200"
//                 onClick={() => setMobileFiltersOpen(true)}
//               >
//                 <span className="sr-only">Filters</span>
//                 <FunnelIcon
//                   className="h-5 w-5 sm:h-6 sm:w-6"
//                   aria-hidden="true"
//                 />
//               </button>
//             </div>
//           </div>

//           <section aria-labelledby="products-heading" className="pb-24 pt-8">
//             <h2 id="products-heading" className="sr-only">
//               Products
//             </h2>

//             <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
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
//                 />

//                 {/* Scroll to top button */}
//                 {products.length > 12 && (
//                   <button
//                     onClick={scrollToTop}
//                     className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-200 z-50"
//                     aria-label="Scroll to top"
//                   >
//                     <svg
//                       className="w-6 h-6"
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
// function DesktopFilter({ handleFilter, filters }) {
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
// }

// // ===== PRODUCT GRID COMPONENT =====
// function ProductGrid({ products, status, hasMore, loaderRef }) {
//   const isInitialLoading = status === "loading" && products.length === 0;
//   const isLoadingMore = status === "loading" && products.length > 0;

//   return (
//     <div className="bg-transparent">
//       <div className="mx-auto max-w-2xl px-0 py-0 sm:px-0 sm:py-0 lg:max-w-7xl lg:px-0">
//         {/* Initial loading state */}
//         {isInitialLoading ? (
//           <div className="flex items-center justify-center py-24">
//             <Grid
//               height="80"
//               width="80"
//               color="rgb(79, 70, 229)"
//               ariaLabel="grid-loading"
//               radius="12.5"
//               visible={true}
//             />
//           </div>
//         ) : (
//           <>
//             {/* Products grid */}
//             {products.length > 0 ? (
//               <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
//                 {products.map((product) => (
//                   <Link to={`/product-detail/${product._id}`} key={product.id}>
//                     <div className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-300 hover:-translate-y-1">
//                       <div className="relative w-full overflow-hidden bg-gray-100 h-64 sm:h-72 md:h-80 lg:h-72">
//                         <img
//                           src={product.thumbnail}
//                           alt={product.title}
//                           className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
//                         />
//                         {product.deleted && (
//                           <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
//                             <span className="text-white font-semibold text-sm px-4 py-2 bg-red-500 rounded-lg">
//                               Product Deleted
//                             </span>
//                           </div>
//                         )}
//                         {product.stock <= 0 && !product.deleted && (
//                           <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
//                             <span className="text-white font-semibold text-sm px-4 py-2 bg-red-500 rounded-lg">
//                               Out of Stock
//                             </span>
//                           </div>
//                         )}
//                         <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg">
//                           <div className="flex items-center gap-0.5 sm:gap-1">
//                             <StarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
//                             <span className="text-xs sm:text-sm font-semibold text-gray-900">
//                               {product.rating}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="p-4 sm:p-5">
//                         <div className="mb-2 sm:mb-3">
//                           <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
//                             {product.title}
//                           </h3>
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-baseline gap-1.5 sm:gap-2">
//                             <p className="text-xl sm:text-2xl font-bold text-gray-900">
//                               ₹
//                               {formatINR(
//                                 product?.discountPrice ||
//                                   Math.round(
//                                     product?.price *
//                                       (1 - product?.discountPercentage / 100)
//                                   )
//                               )}
//                             </p>
//                             <p className="text-xs sm:text-sm line-through font-medium text-gray-400">
//                               ₹{formatINR(product?.price)}
//                             </p>
//                           </div>
//                           <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-indigo-50 group-hover:bg-indigo-600 transition-colors duration-200">
//                             <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 group-hover:text-white transition-colors duration-200" />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
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

//             {/* Loading more indicator */}
//             {isLoadingMore && (
//               <div className="flex items-center justify-center py-12">
//                 <Grid
//                   height="60"
//                   width="60"
//                   color="rgb(79, 70, 229)"
//                   ariaLabel="grid-loading"
//                   radius="12.5"
//                   visible={true}
//                 />
//               </div>
//             )}

//             {/* End of results message */}
//             {!hasMore && products.length > 0 && (
//               <div className="text-center py-12">
//                 <p className="text-gray-500 text-sm">
//                   You've reached the end of the list
//                 </p>
//               </div>
//             )}

//             {/* Infinite scroll trigger */}
//             <div ref={loaderRef} className="h-10" />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


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
//     <div className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
//       <div className="relative w-full bg-gray-200 h-64 sm:h-72 md:h-80 lg:h-72" />
//       <div className="p-4 sm:p-5">
//         <div className="mb-2 sm:mb-3">
//           <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
//           <div className="h-4 bg-gray-200 rounded w-1/2" />
//         </div>
//         <div className="flex items-center justify-between">
//           <div className="flex items-baseline gap-1.5 sm:gap-2">
//             <div className="h-6 bg-gray-200 rounded w-20" />
//             <div className="h-4 bg-gray-200 rounded w-16" />
//           </div>
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

//         <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           {/* Advertising Carousel Section */}
//           <div className="pt-6 sm:pt-8 pb-8 sm:pb-10">
//             <AdvertisingCarousel />
//           </div>

//           <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-4 sm:gap-0 border-b border-gray-200 pb-6 sm:pb-8">
//             <div>
//               <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
//                 All Products
//               </h1>
//               <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
//                 {products.length > 0 && `Showing ${products.length} products`}
//               </p>
//             </div>

//             <div className="flex items-center gap-2 sm:gap-3">
//               <Menu as="div" className="relative inline-block text-left">
//                 <div>
//                   <Menu.Button className="group inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200">
//                     {currentSortOption || "Sort"}
//                     <ChevronDownIcon
//                       className="-mr-1 ml-1.5 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-gray-500 transition-colors"
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
//                 className="p-2 sm:p-2.5 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-all duration-200"
//               >
//                 <span className="sr-only">View grid</span>
//                 <Squares2X2Icon
//                   className="h-5 w-5 sm:h-6 sm:w-6"
//                   aria-hidden="true"
//                 />
//               </button>
//               <button
//                 type="button"
//                 className="lg:hidden p-2 sm:p-2.5 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition-all duration-200"
//                 onClick={() => setMobileFiltersOpen(true)}
//               >
//                 <span className="sr-only">Filters</span>
//                 <FunnelIcon
//                   className="h-5 w-5 sm:h-6 sm:w-6"
//                   aria-hidden="true"
//                 />
//               </button>
//             </div>
//           </div>

//           <section aria-labelledby="products-heading" className="pb-24 pt-8">
//             <h2 id="products-heading" className="sr-only">
//               Products
//             </h2>

//             <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
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
//                     className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-200 z-50 hover:scale-110"
//                     aria-label="Scroll to top"
//                   >
//                     <svg
//                       className="w-6 h-6"
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
//       <div className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-1">
//         <div className="relative w-full overflow-hidden bg-gray-100 h-64 sm:h-72 md:h-80 lg:h-72">
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
//               <span className="text-white font-semibold text-sm px-4 py-2 bg-red-500 rounded-lg">
//                 Product Deleted
//               </span>
//             </div>
//           )}
//           {product.stock <= 0 && !product.deleted && (
//             <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
//               <span className="text-white font-semibold text-sm px-4 py-2 bg-red-500 rounded-lg">
//                 Out of Stock
//               </span>
//             </div>
//           )}
//           <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg">
//             <div className="flex items-center gap-0.5 sm:gap-1">
//               <StarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
//               <span className="text-xs sm:text-sm font-semibold text-gray-900">
//                 {product.rating}
//               </span>
//             </div>
//           </div>
//         </div>
//         <div className="p-4 sm:p-5">
//           <div className="mb-2 sm:mb-3">
//             <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
//               {product.title}
//             </h3>
//           </div>
//           <div className="flex items-center justify-between">
//             <div className="flex items-baseline gap-1.5 sm:gap-2">
//               <p className="text-xl sm:text-2xl font-bold text-gray-900">
//                 ₹
//                 {formatINR(
//                   product?.discountPrice ||
//                     Math.round(
//                       product?.price *
//                         (1 - product?.discountPercentage / 100)
//                     )
//                 )}
//               </p>
//               <p className="text-xs sm:text-sm line-through font-medium text-gray-400">
//                 ₹{formatINR(product?.price)}
//               </p>
//             </div>
//             <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-indigo-50 group-hover:bg-indigo-600 transition-all duration-200">
//               <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 group-hover:text-white transition-colors duration-200" />
//             </div>
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
//           <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
//             {[...Array(6)].map((_, index) => (
//               <ProductSkeleton key={index} />
//             ))}
//           </div>
//         ) : (
//           <>
//             {products.length > 0 ? (
//               <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
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
import { ChevronRightIcon, StarIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import AdvertisingCarousel from "./AdvertisingCarousel";
import SearchBar from "./Searchbar";

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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Convert USD to INR (approximate rate: 1 USD = 83 INR)
function formatINRR(usdPrice) {
  const inrPrice = Math.round(usdPrice * 83);
  return inrPrice.toLocaleString("en-IN");
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

        <main className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          {/* Advertising Carousel Section */}
          <div className="pt-4 sm:pt-8 pb-4 sm:pb-10">
            <AdvertisingCarousel />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3 sm:gap-0 border-b border-gray-200 pb-4 sm:pb-8">
            <div>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                All Products
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-gray-600">
                {products.length > 0 && `Showing ${products.length} products`}
              </p>
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

          <section aria-labelledby="products-heading" className="pb-20 pt-4 sm:pt-8">
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

                {/* Scroll to top button */}
                {products.length > 12 && (
                  <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 bg-indigo-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-200 z-50 hover:scale-110"
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
          </section>
        </main>
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
                {filters.map((section) => (
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
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
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
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
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
          {filters.map((section, idx) => (
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
                    <div className="space-y-4">
                      {section.options.map((option, optionIdx) => (
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
                      ))}
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </form>
  );
});

// ===== OPTIMIZED PRODUCT CARD =====
const ProductCard = React.memo(function ProductCard({ product }) {
  return (
    <Link 
      to={`/product-detail/${product._id}`} 
      className="block will-change-transform"
    >
      <div className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-indigo-100/50 hover:-translate-y-0.5">
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
            {/* Discount Badge (optional, shows on larger screens) */}
            {product?.discountPercentage > 0 && (
              <div className="hidden sm:flex items-center justify-center px-2 py-0.5 rounded bg-green-100">
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
                <p className="text-gray-500 text-lg">No products found</p>
                <p className="text-gray-400 text-sm mt-2">
                  Try adjusting your filters
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
                <p className="text-gray-500 text-sm">
                  You've reached the end of the list
                </p>
              </div>
            )}

            <div ref={loaderRef} className="h-10" />
          </>
        )}
      </div>
    </div>
  );
}