// // import { useState, useEffect } from "react";
// // import { StarIcon } from "@heroicons/react/20/solid";
// // import { RadioGroup } from "@headlessui/react";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   fetchProductByIdAsync,
// //   selectProductById,
// //   selectProductListStatus,
// // } from "../productSlice";
// // import { useParams } from "react-router-dom";
// // import { addToCartAsync, selectItems } from "../../cart/cartSlice";
// // import { selectLoggedInUser } from "../../auth/authSlice";
// // import { useAlert } from "react-alert";
// // import { Grid } from "react-loader-spinner";

// // function classNames(...classes) {
// //   return classes.filter(Boolean).join(" ");
// // }

// // export default function ProductDetail() {
// //   const [selectedColor, setSelectedColor] = useState();
// //   const [selectedSize, setSelectedSize] = useState();
// //   const items = useSelector(selectItems);
// //   const product = useSelector(selectProductById);
// //   const dispatch = useDispatch();
// //   const params = useParams();
// //   const alert = useAlert();
// //   const status = useSelector(selectProductListStatus);

// //   const handleCart = (e) => {
// //     e.preventDefault();
// //     if (items.findIndex((item) => item.product.id === product.id) < 0) {

// //       const newItem = {
// //         product: product.id,
// //         quantity: 1,
// //       };
// //       if (selectedColor) {
// //         newItem.color = selectedColor;
// //       }
// //       if (selectedSize) {
// //         newItem.size = selectedSize;
// //       }
// //       dispatch(addToCartAsync({ item: newItem, alert }));
// //     } else {
// //       alert.error("Item Already added");
// //     }
// //   };

// //   useEffect(() => {
// //     dispatch(fetchProductByIdAsync(params.id));
// //   }, [dispatch, params.id]);

// //   return (
// //     <div className="bg-white">
// //       {status === "loading" ? (
// //         <Grid
// //           height="80"
// //           width="80"
// //           color="rgb(79, 70, 229) "
// //           ariaLabel="grid-loading"
// //           radius="12.5"
// //           wrapperStyle={{}}
// //           wrapperClass=""
// //           visible={true}
// //         />
// //       ) : null}
// //       {product && (
// //         <div className="pt-6">
// //           <nav aria-label="Breadcrumb">
// //             <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
// //               {product.breadcrumbs &&
// //                 product.breadcrumbs.map((breadcrumb) => (
// //                   <li key={breadcrumb.id}>
// //                     <div className="flex items-center">
// //                       <a
// //                         href={breadcrumb.href}
// //                         className="mr-2 text-sm font-medium text-gray-900"
// //                       >
// //                         {breadcrumb?.name}
// //                       </a>
// //                       <svg
// //                         width={16}
// //                         height={20}
// //                         viewBox="0 0 16 20"
// //                         fill="currentColor"
// //                         aria-hidden="true"
// //                         className="h-5 w-4 text-gray-300"
// //                       >
// //                         <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
// //                       </svg>
// //                     </div>
// //                   </li>
// //                 ))}
// //               <li className="text-sm">
// //                 <a
// //                   href={product.href}
// //                   aria-current="page"
// //                   className="font-medium text-gray-500 hover:text-gray-600"
// //                 >
// //                   {product?.title}
// //                 </a>
// //               </li>
// //             </ol>
// //           </nav>

// //           {/* Image gallery */}
// //           <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
// //             <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
// //               <img
// //                 src={product?.images[0]}
// //                 alt={product?.title}
// //                 className="h-full w-full object-cover object-center"
// //               />
// //             </div>
// //             <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
// //               <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
// //                 <img
// //                   src={product?.images[1]}
// //                   alt={product?.title}
// //                   className="h-full w-full object-cover object-center"
// //                 />
// //               </div>
// //               <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
// //                 <img
// //                   src={product?.images[2]}
// //                   alt={product?.title}
// //                   className="h-full w-full object-cover object-center"
// //                 />
// //               </div>
// //             </div>
// //             <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
// //               <img
// //                 src={product?.images[3]}
// //                 alt={product?.title}
// //                 className="h-full w-full object-cover object-center"
// //               />
// //             </div>
// //           </div>

// //           {/* Product info */}
// //           <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
// //             <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
// //               <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
// //                 {product?.title}
// //               </h1>
// //             </div>

// //             {/* Options */}
// //             <div className="mt-4 lg:row-span-3 lg:mt-0">
// //               <h2 className="sr-only">Product information</h2>
// //               <p className="text-xl line-through tracking-tight text-gray-900">
// //                 ${product?.price}
// //               </p>
// //               <p className="text-3xl tracking-tight text-gray-900">
// //                 ${product?.discountPrice}
// //               </p>

// //               {/* Reviews */}
// //               <div className="mt-6">
// //                 <h3 className="sr-only">Reviews</h3>
// //                 <div className="flex items-center">
// //                   <div className="flex items-center">
// //                     {[0, 1, 2, 3, 4].map((rating) => (
// //                       <StarIcon
// //                         key={rating}
// //                         className={classNames(
// //                           product?.rating > rating
// //                             ? "text-gray-900"
// //                             : "text-gray-200",
// //                           "h-5 w-5 flex-shrink-0"
// //                         )}
// //                         aria-hidden="true"
// //                       />
// //                     ))}
// //                   </div>
// //                   <p className="sr-only">{product?.rating} out of 5 stars</p>
// //                 </div>
// //               </div>

// //               <form className="mt-10">
// //                 {/* Colors */}
// //                 {product.colors && product.colors.length > 0 && (
// //                   <div>
// //                     <h3 className="text-sm font-medium text-gray-900">Color</h3>

// //                     <RadioGroup
// //                       value={selectedColor}
// //                       onChange={setSelectedColor}
// //                       className="mt-4"
// //                     >
// //                       <RadioGroup.Label className="sr-only">
// //                         Choose a color
// //                       </RadioGroup.Label>
// //                       <div className="flex items-center space-x-3">
// //                         {product.colors.length &&
// //                           product.colors.map(
// //                             (color) =>
// //                               color !== null && (
// //                                 <RadioGroup.Option
// //                                   key={color?.name}
// //                                   value={color}
// //                                   className={({ active, checked }) =>
// //                                     classNames(
// //                                       color.selectedClass,
// //                                       active && checked
// //                                         ? "ring ring-offset-1"
// //                                         : "",
// //                                       !active && checked ? "ring-2" : "",
// //                                       "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
// //                                     )
// //                                   }
// //                                 >
// //                                   <RadioGroup.Label
// //                                     as="span"
// //                                     className="sr-only"
// //                                   >
// //                                     {color !== null && color?.name}
// //                                   </RadioGroup.Label>
// //                                   <span
// //                                     aria-hidden="true"
// //                                     className={classNames(
// //                                       color?.class,
// //                                       "h-8 w-8 rounded-full border border-black border-opacity-10"
// //                                     )}
// //                                   />
// //                                 </RadioGroup.Option>
// //                               )
// //                           )}
// //                       </div>
// //                     </RadioGroup>
// //                   </div>
// //                 )}

// //                 {/* Sizes */}
// //                 {product.sizes && product.sizes.length > 0 && (
// //                   <div className="mt-10">
// //                     <div className="flex items-center justify-between">
// //                       <h3 className="text-sm font-medium text-gray-900">
// //                         Size
// //                       </h3>
// //                       <a
// //                         href="#"
// //                         className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
// //                       >
// //                         Size guide
// //                       </a>
// //                     </div>

// //                     <RadioGroup
// //                       value={selectedSize}
// //                       onChange={setSelectedSize}
// //                       className="mt-4"
// //                     >
// //                       <RadioGroup.Label className="sr-only">
// //                         Choose a size
// //                       </RadioGroup.Label>
// //                       <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
// //                         {product.sizes.length &&
// //                           product.sizes.map(
// //                             (size) =>
// //                               size !== null && (
// //                                 <RadioGroup.Option
// //                                   key={size.name}
// //                                   value={size}
// //                                   disabled={!size.inStock}
// //                                   className={({ active }) =>
// //                                     classNames(
// //                                       size.inStock
// //                                         ? "cursor-pointer bg-white text-gray-900 shadow-sm"
// //                                         : "cursor-not-allowed bg-gray-50 text-gray-200",
// //                                       active ? "ring-2 ring-indigo-500" : "",
// //                                       "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
// //                                     )
// //                                   }
// //                                 >
// //                                   {({ active, checked }) => (
// //                                     <>
// //                                       <RadioGroup.Label as="span">
// //                                         {size.name}
// //                                       </RadioGroup.Label>
// //                                       {size.inStock ? (
// //                                         <span
// //                                           className={classNames(
// //                                             active ? "border" : "border-2",
// //                                             checked
// //                                               ? "border-indigo-500"
// //                                               : "border-transparent",
// //                                             "pointer-events-none absolute -inset-px rounded-md"
// //                                           )}
// //                                           aria-hidden="true"
// //                                         />
// //                                       ) : (
// //                                         <span
// //                                           aria-hidden="true"
// //                                           className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
// //                                         >
// //                                           <svg
// //                                             className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
// //                                             viewBox="0 0 100 100"
// //                                             preserveAspectRatio="none"
// //                                             stroke="currentColor"
// //                                           >
// //                                             <line
// //                                               x1={0}
// //                                               y1={100}
// //                                               x2={100}
// //                                               y2={0}
// //                                               vectorEffect="non-scaling-stroke"
// //                                             />
// //                                           </svg>
// //                                         </span>
// //                                       )}
// //                                     </>
// //                                   )}
// //                                 </RadioGroup.Option>
// //                               )
// //                           )}
// //                       </div>
// //                     </RadioGroup>
// //                   </div>
// //                 )}

// //                 <button
// //                   onClick={handleCart}
// //                   type="submit"
// //                   className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
// //                 >
// //                   Add to Cart
// //                 </button>
// //               </form>
// //             </div>

// //             <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
// //               {/* Description and details */}
// //               <div>
// //                 <h3 className="sr-only">Description</h3>

// //                 <div className="space-y-6">
// //                   <p className="text-base text-gray-900">
// //                     {product.description}
// //                   </p>
// //                 </div>
// //               </div>

// //               {product.highlights && (
// //                 <div className="mt-10">
// //                   <h3 className="text-sm font-medium text-gray-900">
// //                     Highlights
// //                   </h3>

// //                   <div className="mt-4">
// //                     <ul
// //                       role="list"
// //                       className="list-disc space-y-2 pl-4 text-sm"
// //                     >
// //                       {product.highlights.map((highlight) => (
// //                         <li key={highlight} className="text-gray-400">
// //                           <span className="text-gray-600">{highlight}</span>
// //                         </li>
// //                       ))}
// //                     </ul>
// //                   </div>
// //                 </div>
// //               )}

// //               <div className="mt-10">
// //                 <h2 className="text-sm font-medium text-gray-900">Details</h2>

// //                 <div className="mt-4 space-y-6">
// //                   <p className="text-sm text-gray-600">{product.description}</p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }








// // import { useState, useEffect } from "react";
// // import { StarIcon } from "@heroicons/react/20/solid";
// // import { RadioGroup } from "@headlessui/react";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   fetchProductByIdAsync,
// //   selectProductById,
// //   selectProductListStatus,
// // } from "../productSlice";
// // import { useParams } from "react-router-dom";
// // import { addToCartAsync, selectItems } from "../../cart/cartSlice";
// // import { selectLoggedInUser } from "../../auth/authSlice";
// // import { useAlert } from "react-alert";
// // import { Grid } from "react-loader-spinner";

// // function classNames(...classes) {
// //   return classes.filter(Boolean).join(" ");
// // }

// // export default function ProductDetail() {
// //   const [selectedColor, setSelectedColor] = useState();
// //   const [selectedSize, setSelectedSize] = useState();
// //   const items = useSelector(selectItems);
// //   const product = useSelector(selectProductById);
// //   const dispatch = useDispatch();
// //   const params = useParams();
// //   const alert = useAlert();
// //   const status = useSelector(selectProductListStatus);

// //   const [currentImageIndex, setCurrentImageIndex] = useState(0);

// //   const handleCart = (e) => {
// //     e.preventDefault();
// //     if (items.findIndex((item) => item.product?.id === product?.id) < 0) {
// //       const newItem = {
// //         product: product.id,
// //         quantity: 1,
// //       };
// //       if (selectedColor) {
// //         newItem.color = selectedColor;
// //       }
// //       if (selectedSize) {
// //         newItem.size = selectedSize;
// //       }
// //       dispatch(addToCartAsync({ item: newItem, alert }));
// //     } else {
// //       alert.error("Item Already added");
// //     }
// //   };

// //   useEffect(() => {
// //     dispatch(fetchProductByIdAsync(params.id));
// //   }, [dispatch, params.id]);

// //   const [activeImg, setActiveImage] = useState(null);

// //   useEffect(() => {
// //     if (product) {
// //       setActiveImage(null);
// //     }
// //   }, []);

// //   const features = [
// //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
// //     "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
// //     "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
// //     "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
// //   ];

// //   // const [amount, setAmount] = useState(1);
// //   const [highlights, setHighlights] = useState(null);
// //   // let highlights = [];
// //   useEffect(() => {
// //     if (product) {
// //       setHighlights(null);
// //     }
// //   }, [product]);

// //   return (
// //     <div className="bg-white">
// //       {status === "loading" ? (
// //         <Grid
// //           height="80"
// //           width="80"
// //           color="rgb(79, 70, 229) "
// //           ariaLabel="grid-loading"
// //           radius="12.5"
// //           wrapperStyle={{}}
// //           wrapperClass=""
// //           visible={true}
// //         />
// //       ) : null}
// //       {product && (
// //         <div className="pt-6">
// //           <nav aria-label="Breadcrumb">
// //             <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
// //               {product.breadcrumbs &&
// //                 product.breadcrumbs.map((breadcrumb) => (
// //                   <li key={breadcrumb.id}>
// //                     <div className="flex items-center">
// //                       <a
// //                         href={breadcrumb.href}
// //                         className="mr-2 text-sm font-medium text-gray-900"
// //                       >
// //                         {breadcrumb?.name}
// //                       </a>
// //                       <svg
// //                         width={16}
// //                         height={20}
// //                         viewBox="0 0 16 20"
// //                         fill="currentColor"
// //                         aria-hidden="true"
// //                         className="h-5 w-4 text-gray-300"
// //                       >
// //                         <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
// //                       </svg>
// //                     </div>
// //                   </li>
// //                 ))}
// //               <li className="text-sm">
// //                 <a
// //                   href={product.href}
// //                   aria-current="page"
// //                   className="font-medium text-gray-500 hover:text-gray-600"
// //                 >
// //                   {product?.title}
// //                 </a>
// //               </li>
// //             </ol>
// //           </nav>

// //           {/* Image gallery */}

// //           {/* <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'> */}
// //           {/* {!activeImg ? setActiveImage(product?.images?.[0]) : ""} */}
// //           <div className="flex p-5 center">
// //             <div className="flex flex-col gap-6 w-full lg:w-2/4 ">
// //               <div className="p-2 border-black-100">
// //                 <img
// //                   src={activeImg ? activeImg : product?.images[0]}
// //                   alt=""
// //                   className="w-full h-full aspect-square object-cover rounded-xl"
// //                 />
// //               </div>
// //               {/* {!activeImg ? product?.images[0] : null} */}

// //               <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 justify-center items-center m-auto">
// //                 {product?.images.map((image, index) => (
// //                   <img
// //                     src={image}
// //                     alt=""
// //                     className="w-24 h-24 rounded-md cursor-pointer border-red"
// //                     onClick={() => setActiveImage(image)}
// //                     key={index}
// //                   />
// //                 ))}
// //               </div>

// //               {/* <div className="flex flex-row justify-around h-24 pl-1 pr-1 overflow-hidden">
// //               {product?.images.map((image, index) => (
// //                 <img
// //                   src={image}
// //                   alt=""
// //                   className="w-24 h-24   rounded-md cursor-pointer"
// //                   onClick={() => setActiveImage(image)}
// //                   key={index}
// //                 />
// //               ))} */}
// //               {/* <img
// //                 src={images.img1}
// //                 alt=""
// //                 className="w-24 h-24 rounded-md cursor-pointer"
// //                 onClick={() => setActiveImage(images.img1)}
// //               />
// //               <img
// //                 src={images.img2}
// //                 alt=""
// //                 className="w-24 h-24 rounded-md cursor-pointer"
// //                 onClick={() => setActiveImage(images.img2)}
// //               />
// //               <img
// //                 src={images.img3}
// //                 alt=""
// //                 className="w-24 h-24 rounded-md cursor-pointer"
// //                 onClick={() => setActiveImage(images.img3)}
// //               />
// //               <img
// //                 src={images.img4}
// //                 alt=""
// //                 className="w-24 h-24 rounded-md cursor-pointer"
// //                 onClick={() => setActiveImage(images.img4)}
// //               /> */}
// //               {/* </div> */}
// //             </div>

// //             <div className="mt-4 lg:row-span-3 lg:mt-0 pl-3 pt-5 hidden lg:block">
// //               <h2 className="sr-only">Product information</h2>
// //               <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
// //                 {product?.title}
// //               </h1>

// //               <p className="text-xl line-through tracking-tight text-gray-900 mt-2">
// //                 ${product?.price}
// //               </p>
// //               <p className="text-3xl tracking-tight text-gray-900">
// //                 $
// //                 {product?.discountPrice
// //                   ? product?.discountPrice
// //                   : Math.round(
// //                       product?.price * (1 - product?.discountPercentage / 100)
// //                     )}
// //               </p>

// //               {/* offers */}
// //               <p className="font-semibold tracking-tight">Available offers</p>

// //               <div className="flex items-start">
// //                 <img
// //                   src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
// //                   alt=""
// //                   className="w-5 h-5 mt-1 mr-1"
// //                 />
// //                 <p className="tracking-tight">
// //                   Bank Offer 10% off on ICICI Bank Credit Card, up to ₹1250 on
// //                   orders of ₹5,000 and above T&C
// //                 </p>
// //               </div>
// //               <div className="flex items-start">
// //                 <img
// //                   src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
// //                   alt=""
// //                   className="w-5 h-5 mt-1 mr-1"
// //                 />
// //                 <p className="tracking-tight">
// //                   Bank Offer 10% off on Axis Bank and Citi Credit Card, up to
// //                   ₹1250 on orders of ₹5,000 and above T&C
// //                 </p>
// //               </div>

// //               {/* Reviews */}
// //               <div className="mt-6">
// //                 <h3 className="sr-only">Reviews</h3>
// //                 <div
// //                   className="flex items-center"
// //                   style={{ display: "flex", alignItems: "center" }}
// //                 >
// //                   <div className="flex items-center">
// //                     <span className="mr-1">{product?.rating}</span>
// //                     {[0, 1, 2, 3, 4].map((rating) => (
// //                       <StarIcon
// //                         key={rating}
// //                         className={classNames(
// //                           product?.rating > rating
// //                             ? "text-orange-400"
// //                             : "text-gray-200",
// //                           "h-5 w-5 flex-shrink-0"
// //                         )}
// //                         aria-hidden="true"
// //                       />
// //                     ))}
// //                   </div>
// //                   <p className="sr-only">{product?.rating} out of 5 stars</p>
// //                 </div>
// //               </div>

// //               <form className="mt-10">
// //                 {/* Colors */}
// //                 {product.colors && product.colors.length > 0 && (
// //                   <div>
// //                     <h3 className="text-sm font-medium text-gray-900">Color</h3>

// //                     <RadioGroup
// //                       value={selectedColor}
// //                       onChange={setSelectedColor}
// //                       className="mt-4"
// //                     >
// //                       <RadioGroup.Label className="sr-only">
// //                         Choose a color
// //                       </RadioGroup.Label>
// //                       <div className="flex items-center space-x-3">
// //                         {product.colors.length &&
// //                           product.colors.map(
// //                             (color) =>
// //                               color !== null && (
// //                                 <RadioGroup.Option
// //                                   key={color?.name}
// //                                   value={color}
// //                                   className={({ active, checked }) =>
// //                                     classNames(
// //                                       color.selectedClass,
// //                                       active && checked
// //                                         ? "ring ring-offset-1"
// //                                         : "",
// //                                       !active && checked ? "ring-2" : "",
// //                                       "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
// //                                     )
// //                                   }
// //                                 >
// //                                   <RadioGroup.Label
// //                                     as="span"
// //                                     className="sr-only"
// //                                   >
// //                                     {color !== null && color?.name}
// //                                   </RadioGroup.Label>
// //                                   <span
// //                                     aria-hidden="true"
// //                                     className={classNames(
// //                                       color?.class,
// //                                       "h-8 w-8 rounded-full border border-black border-opacity-10"
// //                                     )}
// //                                   />
// //                                 </RadioGroup.Option>
// //                               )
// //                           )}
// //                       </div>
// //                     </RadioGroup>
// //                   </div>
// //                 )}

// //                 {/* Sizes */}
// //                 {product.sizes && product.sizes.length > 0 && (
// //                   <div className="mt-10">
// //                     <div className="flex items-center justify-between">
// //                       <h3 className="text-sm font-medium text-gray-900">
// //                         Size
// //                       </h3>
// //                       <a
// //                         href="#"
// //                         className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
// //                       >
// //                         Size guide
// //                       </a>
// //                     </div>

// //                     <RadioGroup
// //                       value={selectedSize}
// //                       onChange={setSelectedSize}
// //                       className="mt-4"
// //                     >
// //                       <RadioGroup.Label className="sr-only">
// //                         Choose a size
// //                       </RadioGroup.Label>
// //                       <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
// //                         {product.sizes.length &&
// //                           product.sizes.map(
// //                             (size) =>
// //                               size !== null && (
// //                                 <RadioGroup.Option
// //                                   key={size.name}
// //                                   value={size}
// //                                   disabled={!size.inStock}
// //                                   className={({ active }) =>
// //                                     classNames(
// //                                       size.inStock
// //                                         ? "cursor-pointer bg-white text-gray-900 shadow-sm"
// //                                         : "cursor-not-allowed bg-gray-50 text-gray-200",
// //                                       active ? "ring-2 ring-indigo-500" : "",
// //                                       "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
// //                                     )
// //                                   }
// //                                 >
// //                                   {({ active, checked }) => (
// //                                     <>
// //                                       <RadioGroup.Label as="span">
// //                                         {size.name}
// //                                       </RadioGroup.Label>
// //                                       {size.inStock ? (
// //                                         <span
// //                                           className={classNames(
// //                                             active ? "border" : "border-2",
// //                                             checked
// //                                               ? "border-indigo-500"
// //                                               : "border-transparent",
// //                                             "pointer-events-none absolute -inset-px rounded-md"
// //                                           )}
// //                                           aria-hidden="true"
// //                                         />
// //                                       ) : (
// //                                         <span
// //                                           aria-hidden="true"
// //                                           className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
// //                                         >
// //                                           <svg
// //                                             className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
// //                                             viewBox="0 0 100 100"
// //                                             preserveAspectRatio="none"
// //                                             stroke="currentColor"
// //                                           >
// //                                             <line
// //                                               x1={0}
// //                                               y1={100}
// //                                               x2={100}
// //                                               y2={0}
// //                                               vectorEffect="non-scaling-stroke"
// //                                             />
// //                                           </svg>
// //                                         </span>
// //                                       )}
// //                                     </>
// //                                   )}
// //                                 </RadioGroup.Option>
// //                               )
// //                           )}
// //                       </div>
// //                     </RadioGroup>
// //                   </div>
// //                 )}

// //                {product.stock > 0 ? (
// //                 <button
// //                   onClick={handleCart}
// //                   type="submit"
// //                   className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
// //                 >
// //                   Add to Cart
// //                   </button> ): (
// //                   <button
// //                     disabled
// //                     className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-400 px-8 py-3 text-base font-medium text-white cursor-not-allowed"
// //                   >
// //                     Out of Stock
// //                   </button> )
// //                }
// //               </form>
// //             </div>
// //           </div>

// //           {/* Product info */}
// //           <div className="mx-auto  max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16 pl-5">
// //             <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
// //               <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
// //                 {product?.title}
// //               </h1>
// //             </div>

// //             {/* Options */}
// //             <div className="mt-4 lg:row-span-3 lg:mt-0 lg:hidden">
// //               <h2 className="sr-only">Product information</h2>
// //               <p className="text-xl line-through tracking-tight text-gray-900">
// //                 ${product?.price}
// //               </p>
// //                 <p className="text-3xl tracking-tight text-gray-900">
// //                 $
// //                 {product?.discountPrice
// //                   ? product?.discountPrice
// //                   : Math.round(
// //                       product?.price * (1 - product?.discountPercentage / 100)
// //                     )}
// //               </p>
// //               {/* <p className="text-3xl tracking-tight text-gray-900">
// //                 ${product?.discountPrice}
// //               </p> */}

// //               {/* offers */}
// //               <p className="font-semibold tracking-tight">Available offers</p>

// //               <div className="flex items-start">
// //                 <img
// //                   src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
// //                   alt=""
// //                   className="w-5 h-5 mt-1 mr-1"
// //                 />
// //                 <p className="tracking-tight">
// //                   Bank Offer 10% off on ICICI Bank Credit Card, up to ₹1250 on
// //                   orders of ₹5,000 and above T&C
// //                 </p>
// //               </div>
// //               <div className="flex items-start">
// //                 <img
// //                   src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
// //                   alt=""
// //                   className="w-5 h-5 mt-1 mr-1"
// //                 />
// //                 <p className="tracking-tight">
// //                   Bank Offer 10% off on Axis Bank and Citi Credit Card, up to
// //                   ₹1250 on orders of ₹5,000 and above T&C
// //                 </p>
// //               </div>

// //               {/* Reviews */}
// //               <div className="mt-4">
// //                 <h3 className="sr-only">Reviews</h3>
// //                 <div className="flex items-center">
// //                   <div className="flex items-center">
// //                     <span className="mr-1">{product?.rating}.0</span>
// //                     {[0, 1, 2, 3, 4].map((rating) => (
// //                       <StarIcon
// //                         key={rating}
// //                         className={classNames(
// //                           product?.rating > rating
// //                             ? "text-orange-400"
// //                             : "text-gray-200",
// //                           "h-5 w-5 flex-shrink-0"
// //                         )}
// //                         aria-hidden="true"
// //                       />
// //                     ))}
// //                   </div>
// //                   <p className="sr-only">{product?.rating} out of 5 stars</p>
// //                 </div>
// //               </div>

// //               <form className="mt-10">
// //                 {/* Colors */}
// //                 {product.colors && product.colors.length > 0 && (
// //                   <div>
// //                     <h3 className="text-sm font-medium text-gray-900">Color</h3>

// //                     <RadioGroup
// //                       value={selectedColor}
// //                       onChange={setSelectedColor}
// //                       className="mt-4"
// //                     >
// //                       <RadioGroup.Label className="sr-only">
// //                         Choose a color
// //                       </RadioGroup.Label>
// //                       <div className="flex items-center space-x-3">
// //                         {product.colors.length &&
// //                           product.colors.map(
// //                             (color) =>
// //                               color !== null && (
// //                                 <RadioGroup.Option
// //                                   key={color?.name}
// //                                   value={color}
// //                                   className={({ active, checked }) =>
// //                                     classNames(
// //                                       color.selectedClass,
// //                                       active && checked
// //                                         ? "ring ring-offset-1"
// //                                         : "",
// //                                       !active && checked ? "ring-2" : "",
// //                                       "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
// //                                     )
// //                                   }
// //                                 >
// //                                   <RadioGroup.Label
// //                                     as="span"
// //                                     className="sr-only"
// //                                   >
// //                                     {color !== null && color?.name}
// //                                   </RadioGroup.Label>
// //                                   <span
// //                                     aria-hidden="true"
// //                                     className={classNames(
// //                                       color?.class,
// //                                       "h-8 w-8 rounded-full border border-black border-opacity-10"
// //                                     )}
// //                                   />
// //                                 </RadioGroup.Option>
// //                               )
// //                           )}
// //                       </div>
// //                     </RadioGroup>
// //                   </div>
// //                 )}

// //                 {/* Sizes */}
// //                 {product.sizes && product.sizes.length > 0 && (
// //                   <div className="mt-10">
// //                     <div className="flex items-center justify-between">
// //                       <h3 className="text-sm font-medium text-gray-900">
// //                         Size
// //                       </h3>
// //                       <a
// //                         href="#"
// //                         className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
// //                       >
// //                         Size guide
// //                       </a>
// //                     </div>

// //                     <RadioGroup
// //                       value={selectedSize}
// //                       onChange={setSelectedSize}
// //                       className="mt-4"
// //                     >
// //                       <RadioGroup.Label className="sr-only">
// //                         Choose a size
// //                       </RadioGroup.Label>
// //                       <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
// //                         {product.sizes.length &&
// //                           product.sizes.map(
// //                             (size) =>
// //                               size !== null && (
// //                                 <RadioGroup.Option
// //                                   key={size.name}
// //                                   value={size}
// //                                   disabled={!size.inStock}
// //                                   className={({ active }) =>
// //                                     classNames(
// //                                       size.inStock
// //                                         ? "cursor-pointer bg-white text-gray-900 shadow-sm"
// //                                         : "cursor-not-allowed bg-gray-50 text-gray-200",
// //                                       active ? "ring-2 ring-indigo-500" : "",
// //                                       "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
// //                                     )
// //                                   }
// //                                 >
// //                                   {({ active, checked }) => (
// //                                     <>
// //                                       <RadioGroup.Label as="span">
// //                                         {size.name}
// //                                       </RadioGroup.Label>
// //                                       {size.inStock ? (
// //                                         <span
// //                                           className={classNames(
// //                                             active ? "border" : "border-2",
// //                                             checked
// //                                               ? "border-indigo-500"
// //                                               : "border-transparent",
// //                                             "pointer-events-none absolute -inset-px rounded-md"
// //                                           )}
// //                                           aria-hidden="true"
// //                                         />
// //                                       ) : (
// //                                         <span
// //                                           aria-hidden="true"
// //                                           className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
// //                                         >
// //                                           <svg
// //                                             className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
// //                                             viewBox="0 0 100 100"
// //                                             preserveAspectRatio="none"
// //                                             stroke="currentColor"
// //                                           >
// //                                             <line
// //                                               x1={0}
// //                                               y1={100}
// //                                               x2={100}
// //                                               y2={0}
// //                                               vectorEffect="non-scaling-stroke"
// //                                             />
// //                                           </svg>
// //                                         </span>
// //                                       )}
// //                                     </>
// //                                   )}
// //                                 </RadioGroup.Option>
// //                               )
// //                           )}
// //                       </div>
// //                     </RadioGroup>
// //                   </div>
// //                 )}

// //                 {product.stock > 0 ? (
// //                 <button
// //                   onClick={handleCart}
// //                   type="submit"
// //                   className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
// //                 >
// //                   Add to Cart
// //                   </button> ): (
// //                   <button
// //                     disabled
// //                     className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-400 px-8 py-3 text-base font-medium text-white cursor-not-allowed"
// //                   >
// //                     Out of Stock
// //                   </button> )
// //                }
// //               </form>
// //             </div>

// //             {/* Reviews on large screen */}

// //             <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
// //               {/* Description and details */}
// //               <div>
// //                 <h3 className="sr-only">Description</h3>

// //                 <div className="space-y-6">
// //                   <p className="text-base text-gray-900">
// //                     {product.description}
// //                   </p>
// //                 </div>
// //               </div>

// //               <div className="mt-10">
// //                 <h3 className="text-sm font-medium text-gray-900">
// //                   Highlights
// //                 </h3>

// //                 <div className="mt-4">
// //                   <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
// //                     {highlights?.map((highlight) => (
// //                       <li key={highlight} className="text-gray-400">
// //                         <span className="text-gray-600">{highlight}</span>
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               </div>

// //               <div className="mt-10">
// //                 <h2 className="text-sm font-medium text-gray-900">Details</h2>

// //                 <div className="mt-4 space-y-6">
// //                   <p className="text-sm text-gray-600">{product.description}</p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }








// // import { useState, useEffect } from "react";
// // import { StarIcon } from "@heroicons/react/20/solid";
// // import { RadioGroup } from "@headlessui/react";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   fetchProductByIdAsync,
// //   selectProductById,
// //   selectProductListStatus,
// // } from "../productSlice";
// // import { useParams } from "react-router-dom";
// // import { addToCartAsync, selectItems } from "../../cart/cartSlice";
// // import { selectLoggedInUser } from "../../auth/authSlice";
// // import { useAlert } from "react-alert";
// // import { Grid } from "react-loader-spinner";

// // function classNames(...classes) {
// //   return classes.filter(Boolean).join(" ");
// // }

// // export default function ProductDetail() {
// //   const [selectedColor, setSelectedColor] = useState();
// //   const [selectedSize, setSelectedSize] = useState();
// //   const items = useSelector(selectItems);
// //   const product = useSelector(selectProductById);
// //   const dispatch = useDispatch();
// //   const params = useParams();
// //   const alert = useAlert();
// //   const status = useSelector(selectProductListStatus);

// //   const [activeImg, setActiveImage] = useState(null);
// //   const [imageLoaded, setImageLoaded] = useState(false);
// //   const [showOffers, setShowOffers] = useState(false);

// //   const handleCart = (e) => {
// //     e.preventDefault();
// //     if (items.findIndex((item) => item.product?.id === product?.id) < 0) {
// //       const newItem = {
// //         product: product.id,
// //         quantity: 1,
// //       };
// //       if (selectedColor) {
// //         newItem.color = selectedColor;
// //       }
// //       if (selectedSize) {
// //         newItem.size = selectedSize;
// //       }
// //       dispatch(addToCartAsync({ item: newItem, alert }));
// //     } else {
// //       alert.error("Item Already added");
// //     }
// //   };

// //   useEffect(() => {
// //     dispatch(fetchProductByIdAsync(params.id));
// //   }, [dispatch, params.id]);

// //   useEffect(() => {
// //     if (product) {
// //       setActiveImage(product?.images?.[0]);
// //       setImageLoaded(false);
// //     }
// //   }, [product]);

// //   const highlights = product?.highlights || [
// //     "Premium quality materials",
// //     "Carefully crafted construction",
// //     "Modern design aesthetics",
// //     "Versatile and functional",
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
// //       <style>
// //         {`
// //           @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Inter:wght@300;400;500;600&display=swap');
          
// //           .product-detail-container {
// //             font-family: 'Inter', sans-serif;
// //           }
          
// //           .product-title {
// //             font-family: 'Cormorant Garamond', serif;
// //           }
          
// //           .fade-in {
// //             animation: fadeIn 0.6s ease-out forwards;
// //           }
          
// //           @keyframes fadeIn {
// //             from {
// //               opacity: 0;
// //               transform: translateY(20px);
// //             }
// //             to {
// //               opacity: 1;
// //               transform: translateY(0);
// //             }
// //           }
          
// //           .image-zoom {
// //             transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
// //           }
          
// //           .image-zoom:hover {
// //             transform: scale(1.02);
// //           }
          
// //           .thumbnail {
// //             transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
// //             position: relative;
// //             overflow: hidden;
// //           }
          
// //           .thumbnail::before {
// //             content: '';
// //             position: absolute;
// //             inset: 0;
// //             background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), transparent);
// //             opacity: 0;
// //             transition: opacity 0.3s ease;
// //           }
          
// //           .thumbnail:hover::before {
// //             opacity: 1;
// //           }
          
// //           .thumbnail.active {
// //             border-color: rgb(99, 102, 241);
// //             box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
// //           }
          
// //           .price-tag {
// //             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// //             -webkit-background-clip: text;
// //             -webkit-text-fill-color: transparent;
// //             background-clip: text;
// //           }
          
// //           .offer-card {
// //             background: linear-gradient(135deg, #f6f8fb 0%, #ffffff 100%);
// //             border-left: 3px solid #667eea;
// //             transition: all 0.3s ease;
// //           }
          
// //           .offer-card:hover {
// //             transform: translateX(4px);
// //             box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
// //           }
          
// //           .add-to-cart-btn {
// //             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// //             transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
// //             position: relative;
// //             overflow: hidden;
// //           }
          
// //           .add-to-cart-btn::before {
// //             content: '';
// //             position: absolute;
// //             top: 50%;
// //             left: 50%;
// //             width: 0;
// //             height: 0;
// //             border-radius: 50%;
// //             background: rgba(255, 255, 255, 0.2);
// //             transform: translate(-50%, -50%);
// //             transition: width 0.6s, height 0.6s;
// //           }
          
// //           .add-to-cart-btn:hover::before {
// //             width: 300px;
// //             height: 300px;
// //           }
          
// //           .add-to-cart-btn:hover {
// //             transform: translateY(-2px);
// //             box-shadow: 0 12px 24px rgba(102, 126, 234, 0.4);
// //           }
          
// //           .breadcrumb-link {
// //             transition: color 0.2s ease;
// //           }
          
// //           .breadcrumb-link:hover {
// //             color: #667eea;
// //           }
          
// //           .section-divider {
// //             background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
// //             height: 1px;
// //             margin: 3rem 0;
// //           }
          
// //           .detail-section {
// //             animation: slideUp 0.6s ease-out forwards;
// //             opacity: 0;
// //           }
          
// //           @keyframes slideUp {
// //             from {
// //               opacity: 0;
// //               transform: translateY(30px);
// //             }
// //             to {
// //               opacity: 1;
// //               transform: translateY(0);
// //             }
// //           }
          
// //           .detail-section:nth-child(1) { animation-delay: 0.1s; }
// //           .detail-section:nth-child(2) { animation-delay: 0.2s; }
// //           .detail-section:nth-child(3) { animation-delay: 0.3s; }
          
// //           .loader-container {
// //             display: flex;
// //             justify-content: center;
// //             align-items: center;
// //             min-height: 60vh;
// //           }
          
// //           .image-skeleton {
// //             background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
// //             background-size: 200% 100%;
// //             animation: shimmer 1.5s infinite;
// //           }
          
// //           @keyframes shimmer {
// //             0% { background-position: 200% 0; }
// //             100% { background-position: -200% 0; }
// //           }
// //         `}
// //       </style>

// //       {status === "loading" ? (
// //         <div className="loader-container">
// //           <Grid
// //             height="80"
// //             width="80"
// //             color="rgb(102, 126, 234)"
// //             ariaLabel="grid-loading"
// //             radius="12.5"
// //             visible={true}
// //           />
// //         </div>
// //       ) : null}

// //       {product && (
// //         <div className="product-detail-container">
// //           {/* Breadcrumb */}
// //           <nav aria-label="Breadcrumb" className="pt-8 pb-4">
// //             <ol className="mx-auto flex max-w-7xl items-center space-x-2 px-4 sm:px-6 lg:px-8">
// //               {product.breadcrumbs &&
// //                 product.breadcrumbs.map((breadcrumb, index) => (
// //                   <li key={breadcrumb.id} className="flex items-center">
// //                     <a
// //                       href={breadcrumb.href}
// //                       className="breadcrumb-link text-sm font-medium text-slate-600"
// //                     >
// //                       {breadcrumb?.name}
// //                     </a>
// //                     {index < product.breadcrumbs.length - 1 && (
// //                       <svg
// //                         className="ml-2 h-5 w-4 text-slate-300"
// //                         viewBox="0 0 16 20"
// //                         fill="currentColor"
// //                         aria-hidden="true"
// //                       >
// //                         <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
// //                       </svg>
// //                     )}
// //                   </li>
// //                 ))}
// //               <li className="flex items-center">
// //                 <svg
// //                   className="mr-2 h-5 w-4 text-slate-300"
// //                   viewBox="0 0 16 20"
// //                   fill="currentColor"
// //                   aria-hidden="true"
// //                 >
// //                   <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
// //                 </svg>
// //                 <span className="text-sm font-medium text-slate-400">
// //                   {product?.title}
// //                 </span>
// //               </li>
// //             </ol>
// //           </nav>

// //           {/* Main Content */}
// //           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
// //             <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
// //               {/* Image Gallery */}
// //               <div className="fade-in">
// //                 <div className="sticky top-8">
// //                   {/* Main Image */}
// //                   <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100 mb-6 shadow-lg">
// //                     {!imageLoaded && (
// //                       <div className="absolute inset-0 image-skeleton rounded-2xl" />
// //                     )}
// //                     <img
// //                       src={activeImg || product?.images?.[0]}
// //                       alt={product?.title}
// //                       className={`image-zoom w-full h-full object-cover transition-opacity duration-300 ${
// //                         imageLoaded ? "opacity-100" : "opacity-0"
// //                       }`}
// //                       onLoad={() => setImageLoaded(true)}
// //                     />
// //                   </div>

// //                   {/* Thumbnail Grid */}
// //                   <div className="grid grid-cols-4 gap-4">
// //                     {product?.images?.map((image, index) => (
// //                       <button
// //                         key={index}
// //                         onClick={() => {
// //                           setActiveImage(image);
// //                           setImageLoaded(false);
// //                         }}
// //                         className={classNames(
// //                           "thumbnail aspect-square rounded-xl overflow-hidden border-2 transition-all",
// //                           activeImg === image || (!activeImg && index === 0)
// //                             ? "active"
// //                             : "border-transparent hover:border-slate-300"
// //                         )}
// //                       >
// //                         <img
// //                           src={image}
// //                           alt={`${product?.title} view ${index + 1}`}
// //                           className="w-full h-full object-cover"
// //                         />
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Product Info */}
// //               <div className="mt-10 lg:mt-0 fade-in space-y-8">
// //                 {/* Title & Rating */}
// //                 <div>
// //                   <h1 className="product-title text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
// //                     {product?.title}
// //                   </h1>

// //                   <div className="flex items-center gap-4">
// //                     <div className="flex items-center bg-amber-50 px-3 py-1.5 rounded-full">
// //                       <span className="font-semibold text-slate-900 mr-1">
// //                         {product?.rating}
// //                       </span>
// //                       <div className="flex">
// //                         {[0, 1, 2, 3, 4].map((rating) => (
// //                           <StarIcon
// //                             key={rating}
// //                             className={classNames(
// //                               product?.rating > rating
// //                                 ? "text-amber-400"
// //                                 : "text-slate-300",
// //                               "h-4 w-4"
// //                             )}
// //                             aria-hidden="true"
// //                           />
// //                         ))}
// //                       </div>
// //                     </div>
// //                     <span className="text-sm text-slate-500">
// //                       {Math.floor(Math.random() * 500 + 100)} reviews
// //                     </span>
// //                   </div>
// //                 </div>

// //                 {/* Price */}
// //                 <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-200">
// //                   <div className="flex items-baseline gap-3">
// //                     <span className="price-tag text-5xl font-bold">
// //                       $
// //                       {product?.discountPrice ||
// //                         Math.round(
// //                           product?.price * (1 - product?.discountPercentage / 100)
// //                         )}
// //                     </span>
// //                     <span className="text-2xl text-slate-400 line-through">
// //                       ${product?.price}
// //                     </span>
// //                     <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
// //                       Save {product?.discountPercentage}%
// //                     </span>
// //                   </div>
// //                 </div>

// //                 {/* Offers */}
// //                 <div>
// //                   <button
// //                     onClick={() => setShowOffers(!showOffers)}
// //                     className="flex items-center justify-between w-full text-left group mb-3"
// //                   >
// //                     <h3 className="text-lg font-semibold text-slate-900">
// //                       Available Offers
// //                     </h3>
// //                     <svg
// //                       className={`w-5 h-5 text-slate-400 transition-transform ${
// //                         showOffers ? "rotate-180" : ""
// //                       }`}
// //                       fill="none"
// //                       viewBox="0 0 24 24"
// //                       stroke="currentColor"
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth={2}
// //                         d="M19 9l-7 7-7-7"
// //                       />
// //                     </svg>
// //                   </button>

// //                   <div
// //                     className={`space-y-3 overflow-hidden transition-all duration-300 ${
// //                       showOffers ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
// //                     }`}
// //                   >
// //                     <div className="offer-card rounded-xl p-4">
// //                       <div className="flex gap-3">
// //                         <div className="flex-shrink-0">
// //                           <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
// //                             <svg
// //                               className="w-5 h-5 text-indigo-600"
// //                               fill="currentColor"
// //                               viewBox="0 0 20 20"
// //                             >
// //                               <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
// //                               <path
// //                                 fillRule="evenodd"
// //                                 d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
// //                                 clipRule="evenodd"
// //                               />
// //                             </svg>
// //                           </div>
// //                         </div>
// //                         <div className="flex-1">
// //                           <p className="text-sm font-medium text-slate-900">
// //                             Bank Offer
// //                           </p>
// //                           <p className="text-sm text-slate-600 mt-1">
// //                             10% off on ICICI Bank Credit Card, up to ₹1250 on orders of
// //                             ₹5,000 and above
// //                           </p>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     <div className="offer-card rounded-xl p-4">
// //                       <div className="flex gap-3">
// //                         <div className="flex-shrink-0">
// //                           <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
// //                             <svg
// //                               className="w-5 h-5 text-indigo-600"
// //                               fill="currentColor"
// //                               viewBox="0 0 20 20"
// //                             >
// //                               <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
// //                               <path
// //                                 fillRule="evenodd"
// //                                 d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
// //                                 clipRule="evenodd"
// //                               />
// //                             </svg>
// //                           </div>
// //                         </div>
// //                         <div className="flex-1">
// //                           <p className="text-sm font-medium text-slate-900">
// //                             Bank Offer
// //                           </p>
// //                           <p className="text-sm text-slate-600 mt-1">
// //                             10% off on Axis Bank and Citi Credit Card, up to ₹1250 on
// //                             orders of ₹5,000 and above
// //                           </p>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="section-divider" />

// //                 {/* Color Selection */}
// //                 {product.colors && product.colors.length > 0 && (
// //                   <div className="detail-section">
// //                     <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide">
// //                       Select Color
// //                     </h3>
// //                     <RadioGroup
// //                       value={selectedColor}
// //                       onChange={setSelectedColor}
// //                       className="mt-4"
// //                     >
// //                       <div className="flex items-center gap-3">
// //                         {product.colors.map(
// //                           (color) =>
// //                             color && (
// //                               <RadioGroup.Option
// //                                 key={color.name}
// //                                 value={color}
// //                                 className={({ active, checked }) =>
// //                                   classNames(
// //                                     "relative flex cursor-pointer items-center justify-center rounded-full p-1 focus:outline-none transition-all",
// //                                     checked
// //                                       ? "ring-2 ring-offset-2 ring-indigo-500"
// //                                       : "ring-1 ring-slate-200 hover:ring-slate-300"
// //                                   )
// //                                 }
// //                               >
// //                                 <span
// //                                   className={classNames(
// //                                     color.class,
// //                                     "h-10 w-10 rounded-full border border-black border-opacity-10"
// //                                   )}
// //                                 />
// //                               </RadioGroup.Option>
// //                             )
// //                         )}
// //                       </div>
// //                     </RadioGroup>
// //                   </div>
// //                 )}

// //                 {/* Size Selection */}
// //                 {product.sizes && product.sizes.length > 0 && (
// //                   <div className="detail-section">
// //                     <div className="flex items-center justify-between mb-4">
// //                       <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
// //                         Select Size
// //                       </h3>
// //                       <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
// //                         Size Guide
// //                       </button>
// //                     </div>

// //                     <RadioGroup
// //                       value={selectedSize}
// //                       onChange={setSelectedSize}
// //                       className="mt-4"
// //                     >
// //                       <div className="grid grid-cols-4 gap-3">
// //                         {product.sizes.map(
// //                           (size) =>
// //                             size && (
// //                               <RadioGroup.Option
// //                                 key={size.name}
// //                                 value={size}
// //                                 disabled={!size.inStock}
// //                                 className={({ active, checked }) =>
// //                                   classNames(
// //                                     size.inStock
// //                                       ? "cursor-pointer bg-white text-slate-900 hover:bg-slate-50"
// //                                       : "cursor-not-allowed bg-slate-50 text-slate-300",
// //                                     checked
// //                                       ? "ring-2 ring-indigo-500 bg-indigo-50"
// //                                       : "ring-1 ring-slate-200",
// //                                     "relative flex items-center justify-center rounded-xl py-4 px-4 text-sm font-semibold uppercase focus:outline-none transition-all"
// //                                   )
// //                                 }
// //                               >
// //                                 {size.name}
// //                               </RadioGroup.Option>
// //                             )
// //                         )}
// //                       </div>
// //                     </RadioGroup>
// //                   </div>
// //                 )}

// //                 {/* Add to Cart Button */}
// //                 <div className="detail-section">
// //                   {product.stock > 0 ? (
// //                     <button
// //                       onClick={handleCart}
// //                       className="add-to-cart-btn w-full py-4 px-8 text-white font-semibold rounded-xl shadow-lg relative z-10"
// //                     >
// //                       Add to Cart
// //                     </button>
// //                   ) : (
// //                     <button
// //                       disabled
// //                       className="w-full py-4 px-8 bg-slate-300 text-slate-500 font-semibold rounded-xl cursor-not-allowed"
// //                     >
// //                       Out of Stock
// //                     </button>
// //                   )}

// //                   <div className="grid grid-cols-3 gap-4 mt-6">
// //                     <div className="text-center p-4 bg-slate-50 rounded-xl">
// //                       <svg
// //                         className="w-6 h-6 mx-auto text-indigo-600 mb-2"
// //                         fill="none"
// //                         viewBox="0 0 24 24"
// //                         stroke="currentColor"
// //                       >
// //                         <path
// //                           strokeLinecap="round"
// //                           strokeLinejoin="round"
// //                           strokeWidth={2}
// //                           d="M5 13l4 4L19 7"
// //                         />
// //                       </svg>
// //                       <p className="text-xs font-medium text-slate-600">
// //                         Free Delivery
// //                       </p>
// //                     </div>
// //                     <div className="text-center p-4 bg-slate-50 rounded-xl">
// //                       <svg
// //                         className="w-6 h-6 mx-auto text-indigo-600 mb-2"
// //                         fill="none"
// //                         viewBox="0 0 24 24"
// //                         stroke="currentColor"
// //                       >
// //                         <path
// //                           strokeLinecap="round"
// //                           strokeLinejoin="round"
// //                           strokeWidth={2}
// //                           d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
// //                         />
// //                       </svg>
// //                       <p className="text-xs font-medium text-slate-600">
// //                         Easy Returns
// //                       </p>
// //                     </div>
// //                     <div className="text-center p-4 bg-slate-50 rounded-xl">
// //                       <svg
// //                         className="w-6 h-6 mx-auto text-indigo-600 mb-2"
// //                         fill="none"
// //                         viewBox="0 0 24 24"
// //                         stroke="currentColor"
// //                       >
// //                         <path
// //                           strokeLinecap="round"
// //                           strokeLinejoin="round"
// //                           strokeWidth={2}
// //                           d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
// //                         />
// //                       </svg>
// //                       <p className="text-xs font-medium text-slate-600">
// //                         Secure Payment
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Product Details Section */}
// //             <div className="mt-20">
// //               <div className="section-divider mb-12" />

// //               <div className="grid lg:grid-cols-3 gap-12">
// //                 {/* Description */}
// //                 <div className="lg:col-span-2 detail-section">
// //                   <h2 className="product-title text-3xl font-bold text-slate-900 mb-6">
// //                     Product Description
// //                   </h2>
// //                   <div className="prose prose-slate max-w-none">
// //                     <p className="text-slate-600 leading-relaxed text-lg">
// //                       {product.description}
// //                     </p>
// //                   </div>

// //                   <div className="mt-10">
// //                     <h3 className="text-xl font-semibold text-slate-900 mb-4">
// //                       Key Features
// //                     </h3>
// //                     <ul className="space-y-3">
// //                       {highlights.map((highlight, index) => (
// //                         <li key={index} className="flex items-start">
// //                           <svg
// //                             className="w-6 h-6 text-indigo-600 mr-3 flex-shrink-0 mt-0.5"
// //                             fill="currentColor"
// //                             viewBox="0 0 20 20"
// //                           >
// //                             <path
// //                               fillRule="evenodd"
// //                               d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
// //                               clipRule="evenodd"
// //                             />
// //                           </svg>
// //                           <span className="text-slate-700">{highlight}</span>
// //                         </li>
// //                       ))}
// //                     </ul>
// //                   </div>
// //                 </div>

// //                 {/* Specifications */}
// //                 <div className="detail-section">
// //                   <h3 className="text-xl font-semibold text-slate-900 mb-6">
// //                     Specifications
// //                   </h3>
// //                   <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
// //                     <div className="flex justify-between py-3 border-b border-slate-200">
// //                       <span className="text-sm font-medium text-slate-500">
// //                         Brand
// //                       </span>
// //                       <span className="text-sm font-semibold text-slate-900">
// //                         {product.brand || "Premium"}
// //                       </span>
// //                     </div>
// //                     <div className="flex justify-between py-3 border-b border-slate-200">
// //                       <span className="text-sm font-medium text-slate-500">
// //                         Category
// //                       </span>
// //                       <span className="text-sm font-semibold text-slate-900">
// //                         {product.category || "Fashion"}
// //                       </span>
// //                     </div>
// //                     <div className="flex justify-between py-3 border-b border-slate-200">
// //                       <span className="text-sm font-medium text-slate-500">
// //                         Stock Status
// //                       </span>
// //                       <span
// //                         className={`text-sm font-semibold ${
// //                           product.stock > 0 ? "text-green-600" : "text-red-600"
// //                         }`}
// //                       >
// //                         {product.stock > 0 ? "In Stock" : "Out of Stock"}
// //                       </span>
// //                     </div>
// //                     <div className="flex justify-between py-3">
// //                       <span className="text-sm font-medium text-slate-500">
// //                         SKU
// //                       </span>
// //                       <span className="text-sm font-semibold text-slate-900">
// //                         {product.id || "N/A"}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }




// import { useState, useEffect } from "react";
// import { StarIcon } from "@heroicons/react/20/solid";
// import { RadioGroup } from "@headlessui/react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchProductByIdAsync,
//   selectProductById,
//   selectProductListStatus,
// } from "../productSlice";
// import { useParams } from "react-router-dom";
// import { addToCartAsync, selectItems } from "../../cart/cartSlice";
// import { selectLoggedInUser } from "../../auth/authSlice";
// // import { useAlert } from "react-alert";
// import { Grid } from "react-loader-spinner";
// import {toast} from "sonner"

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }


// export default function ProductDetail() {
//   const [selectedColor, setSelectedColor] = useState();
//   const [selectedSize, setSelectedSize] = useState();
//   const items = useSelector(selectItems);
//   const product = useSelector(selectProductById);
//   const dispatch = useDispatch();
//   const params = useParams();
//   // const alert = useAlert();
//   const status = useSelector(selectProductListStatus);

//   const [activeImg, setActiveImage] = useState(null);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [showOffers, setShowOffers] = useState(false);

//   const handleCart = (e) => {
//     e.preventDefault();
//     if (items.findIndex((item) => item.product?.id === product?.id) < 0) {
//       const newItem = {
//         product: product.id,
//         quantity: 1,
//       };
//       if (selectedColor) {
//         newItem.color = selectedColor;
//       }
//       if (selectedSize) {
//         newItem.size = selectedSize;
//       }
//       dispatch(addToCartAsync({ item: newItem }));
//       toast.success("Item added to cart");
//     } else {
//       toast.error("Item Already added");
//     }
//   };

//   useEffect(() => {
//     dispatch(fetchProductByIdAsync(params.id));
//   }, [dispatch, params.id]);

//   useEffect(() => {
//     if (product) {
//       setActiveImage(product?.images?.[0]);
//       setImageLoaded(false);
//     }
//   }, [product]);

//   const highlights = product?.highlights || [
//     "Premium quality materials",
//     "Carefully crafted construction",
//     "Modern design aesthetics",
//     "Versatile and functional",
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
//       <style>
//         {`
//           @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Inter:wght@300;400;500;600&display=swap');
          
//           .product-detail-container {
//             font-family: 'Inter', sans-serif;
//           }
          
//           .product-title {
//             font-family: 'Cormorant Garamond', serif;
//           }
          
//           .fade-in {
//             animation: fadeIn 0.6s ease-out forwards;
//           }
          
//           @keyframes fadeIn {
//             from {
//               opacity: 0;
//               transform: translateY(20px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
          
//           .image-zoom {
//             transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//           }
          
//           .image-zoom:hover {
//             transform: scale(1.02);
//           }
          
//           .thumbnail {
//             transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//             position: relative;
//             overflow: hidden;
//           }
          
//           .thumbnail::before {
//             content: '';
//             position: absolute;
//             inset: 0;
//             background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), transparent);
//             opacity: 0;
//             transition: opacity 0.3s ease;
//           }
          
//           .thumbnail:hover::before {
//             opacity: 1;
//           }
          
//           .thumbnail.active {
//             border-color: rgb(99, 102, 241);
//             box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
//           }
          
//           .price-tag {
//             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//             -webkit-background-clip: text;
//             -webkit-text-fill-color: transparent;
//             background-clip: text;
//           }
          
//           .offer-card {
//             background: linear-gradient(135deg, #f6f8fb 0%, #ffffff 100%);
//             border-left: 3px solid #667eea;
//             transition: all 0.3s ease;
//           }
          
//           .offer-card:hover {
//             transform: translateX(4px);
//             box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
//           }
          
//           .add-to-cart-btn {
//             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//             transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//             position: relative;
//             overflow: hidden;
//           }
          
//           .add-to-cart-btn::before {
//             content: '';
//             position: absolute;
//             top: 50%;
//             left: 50%;
//             width: 0;
//             height: 0;
//             border-radius: 50%;
//             background: rgba(255, 255, 255, 0.2);
//             transform: translate(-50%, -50%);
//             transition: width 0.6s, height 0.6s;
//           }
          
//           .add-to-cart-btn:hover::before {
//             width: 300px;
//             height: 300px;
//           }
          
//           .add-to-cart-btn:hover {
//             transform: translateY(-2px);
//             box-shadow: 0 12px 24px rgba(102, 126, 234, 0.4);
//           }
          
//           .breadcrumb-link {
//             transition: color 0.2s ease;
//           }
          
//           .breadcrumb-link:hover {
//             color: #667eea;
//           }
          
//           .section-divider {
//             background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
//             height: 1px;
//             margin: 3rem 0;
//           }
          
//           .detail-section {
//             animation: slideUp 0.6s ease-out forwards;
//             opacity: 0;
//           }
          
//           @keyframes slideUp {
//             from {
//               opacity: 0;
//               transform: translateY(30px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
          
//           .detail-section:nth-child(1) { animation-delay: 0.1s; }
//           .detail-section:nth-child(2) { animation-delay: 0.2s; }
//           .detail-section:nth-child(3) { animation-delay: 0.3s; }
          
//           .loader-container {
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             min-height: 60vh;
//           }
          
//           .image-skeleton {
//             background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
//             background-size: 200% 100%;
//             animation: shimmer 1.5s infinite;
//           }
          
//           @keyframes shimmer {
//             0% { background-position: 200% 0; }
//             100% { background-position: -200% 0; }
//           }
//         `}
//       </style>

//       {status === "loading" ? (
//         <div className="loader-container">
//           <Grid
//             height="80"
//             width="80"
//             color="rgb(102, 126, 234)"
//             ariaLabel="grid-loading"
//             radius="12.5"
//             visible={true}
//           />
//         </div>
//       ) : null}

//       {product && (
//         <div className="product-detail-container">
//           {/* Breadcrumb */}
//           <nav aria-label="Breadcrumb" className="pt-8 pb-4">
//             <ol className="mx-auto flex max-w-7xl items-center space-x-2 px-4 sm:px-6 lg:px-8">
//               {product.breadcrumbs &&
//                 product.breadcrumbs.map((breadcrumb, index) => (
//                   <li key={breadcrumb.id} className="flex items-center">
//                     <a
//                       href={breadcrumb.href}
//                       className="breadcrumb-link text-sm font-medium text-slate-600"
//                     >
//                       {breadcrumb?.name}
//                     </a>
//                     {index < product.breadcrumbs.length - 1 && (
//                       <svg
//                         className="ml-2 h-5 w-4 text-slate-300"
//                         viewBox="0 0 16 20"
//                         fill="currentColor"
//                         aria-hidden="true"
//                       >
//                         <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
//                       </svg>
//                     )}
//                   </li>
//                 ))}
//               <li className="flex items-center">
//                 <svg
//                   className="mr-2 h-5 w-4 text-slate-300"
//                   viewBox="0 0 16 20"
//                   fill="currentColor"
//                   aria-hidden="true"
//                 >
//                   <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
//                 </svg>
//                 <span className="text-sm font-medium text-slate-400">
//                   {product?.title}
//                 </span>
//               </li>
//             </ol>
//           </nav>

//           {/* Main Content */}
//           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
//             <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
//               {/* Image Gallery */}
//               <div className="fade-in">
//                 <div className="sticky top-8">
//                   {/* Main Image */}
//                   <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100 mb-6 shadow-lg">
//                     {!imageLoaded && (
//                       <div className="absolute inset-0 image-skeleton rounded-2xl" />
//                     )}
//                     <img
//                       src={activeImg || product?.images?.[0]}
//                       alt={product?.title}
//                       className={`image-zoom w-full h-full object-cover transition-opacity duration-300 ${
//                         imageLoaded ? "opacity-100" : "opacity-0"
//                       }`}
//                       onLoad={() => setImageLoaded(true)}
//                     />
//                   </div>

//                   {/* Thumbnail Grid */}
//                   <div className="grid grid-cols-4 gap-4">
//                     {product?.images?.map((image, index) => (
//                       <button
//                         key={index}
//                         onClick={() => {
//                           setActiveImage(image);
//                           setImageLoaded(false);
//                         }}
//                         className={classNames(
//                           "thumbnail aspect-square rounded-xl overflow-hidden border-2 transition-all",
//                           activeImg === image || (!activeImg && index === 0)
//                             ? "active"
//                             : "border-transparent hover:border-slate-300"
//                         )}
//                       >
//                         <img
//                           src={image}
//                           alt={`${product?.title} view ${index + 1}`}
//                           className="w-full h-full object-cover"
//                         />
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Product Info */}
//               <div className="mt-10 lg:mt-0 fade-in space-y-8">
//                 {/* Title & Rating */}
//                 <div>
//                   <h1 className="product-title text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
//                     {product?.title}
//                   </h1>

//                   <div className="flex items-center gap-4">
//                     <div className="flex items-center bg-amber-50 px-3 py-1.5 rounded-full">
//                       <span className="font-semibold text-slate-900 mr-1">
//                         {product?.rating}
//                       </span>
//                       <div className="flex">
//                         {[0, 1, 2, 3, 4].map((rating) => (
//                           <StarIcon
//                             key={rating}
//                             className={classNames(
//                               product?.rating > rating
//                                 ? "text-amber-400"
//                                 : "text-slate-300",
//                               "h-4 w-4"
//                             )}
//                             aria-hidden="true"
//                           />
//                         ))}
//                       </div>
//                     </div>
//                     <span className="text-sm text-slate-500">
//                       {Math.floor(Math.random() * 500 + 100)} reviews
//                     </span>
//                   </div>
//                 </div>

//                 {/* Price */}
//                 <div className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-200">
//                   <div className="flex items-baseline gap-3">
//                     <span className="price-tag text-5xl font-bold">
//                     ₹{ 
                       
//                         product?.discountPrice ||
//                         Math.round(
//                           product?.price * (1 - product?.discountPercentage / 100)
//                         )}
                    
//                     </span>
//                     <span className="text-2xl text-slate-400 line-through">
//                       ₹{product?.price}
//                     </span>
//                     <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
//                       Save {product?.discountPercentage}%
//                     </span>
//                   </div>
//                 </div>

//                 {/* Offers */}
//                 <div>
//                   <button
//                     onClick={() => setShowOffers(!showOffers)}
//                     className="flex items-center justify-between w-full text-left group mb-3"
//                   >
//                     <h3 className="text-lg font-semibold text-slate-900">
//                       Available Offers
//                     </h3>
//                     <svg
//                       className={`w-5 h-5 text-slate-400 transition-transform ${
//                         showOffers ? "rotate-180" : ""
//                       }`}
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 9l-7 7-7-7"
//                       />
//                     </svg>
//                   </button>

//                   <div
//                     className={`space-y-3 overflow-hidden transition-all duration-300 ${
//                       showOffers ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//                     }`}
//                   >
//                     <div className="offer-card rounded-xl p-4">
//                       <div className="flex gap-3">
//                         <div className="flex-shrink-0">
//                           <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
//                             <svg
//                               className="w-5 h-5 text-indigo-600"
//                               fill="currentColor"
//                               viewBox="0 0 20 20"
//                             >
//                               <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
//                               <path
//                                 fillRule="evenodd"
//                                 d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
//                                 clipRule="evenodd"
//                               />
//                             </svg>
//                           </div>
//                         </div>
//                         <div className="flex-1">
//                           <p className="text-sm font-medium text-slate-900">
//                             Bank Offer
//                           </p>
//                           <p className="text-sm text-slate-600 mt-1">
//                             10% off on ICICI Bank Credit Card, up to ₹1250 on orders of
//                             ₹5,000 and above
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="offer-card rounded-xl p-4">
//                       <div className="flex gap-3">
//                         <div className="flex-shrink-0">
//                           <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
//                             <svg
//                               className="w-5 h-5 text-indigo-600"
//                               fill="currentColor"
//                               viewBox="0 0 20 20"
//                             >
//                               <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
//                               <path
//                                 fillRule="evenodd"
//                                 d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
//                                 clipRule="evenodd"
//                               />
//                             </svg>
//                           </div>
//                         </div>
//                         <div className="flex-1">
//                           <p className="text-sm font-medium text-slate-900">
//                             Bank Offer
//                           </p>
//                           <p className="text-sm text-slate-600 mt-1">
//                             10% off on Axis Bank and Citi Credit Card, up to ₹1250 on
//                             orders of ₹5,000 and above
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="section-divider" />

//                 {/* Color Selection */}
//                 {product.colors && product.colors.length > 0 && (
//                   <div className="detail-section">
//                     <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide">
//                       Select Color
//                     </h3>
//                     <RadioGroup
//                       value={selectedColor}
//                       onChange={setSelectedColor}
//                       className="mt-4"
//                     >
//                       <div className="flex items-center gap-3">
//                         {product.colors.map(
//                           (color) =>
//                             color && (
//                               <RadioGroup.Option
//                                 key={color.name}
//                                 value={color}
//                                 className={({ active, checked }) =>
//                                   classNames(
//                                     "relative flex cursor-pointer items-center justify-center rounded-full p-1 focus:outline-none transition-all",
//                                     checked
//                                       ? "ring-2 ring-offset-2 ring-indigo-500"
//                                       : "ring-1 ring-slate-200 hover:ring-slate-300"
//                                   )
//                                 }
//                               >
//                                 <span
//                                   className={classNames(
//                                     color.class,
//                                     "h-10 w-10 rounded-full border border-black border-opacity-10"
//                                   )}
//                                 />
//                               </RadioGroup.Option>
//                             )
//                         )}
//                       </div>
//                     </RadioGroup>
//                   </div>
//                 )}

//                 {/* Size Selection */}
//                 {product.sizes && product.sizes.length > 0 && (
//                   <div className="detail-section">
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
//                         Select Size
//                       </h3>
//                       <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
//                         Size Guide
//                       </button>
//                     </div>

//                     <RadioGroup
//                       value={selectedSize}
//                       onChange={setSelectedSize}
//                       className="mt-4"
//                     >
//                       <div className="grid grid-cols-4 gap-3">
//                         {product.sizes.map(
//                           (size) =>
//                             size && (
//                               <RadioGroup.Option
//                                 key={size.name}
//                                 value={size}
//                                 disabled={!size.inStock}
//                                 className={({ active, checked }) =>
//                                   classNames(
//                                     size.inStock
//                                       ? "cursor-pointer bg-white text-slate-900 hover:bg-slate-50"
//                                       : "cursor-not-allowed bg-slate-50 text-slate-300",
//                                     checked
//                                       ? "ring-2 ring-indigo-500 bg-indigo-50"
//                                       : "ring-1 ring-slate-200",
//                                     "relative flex items-center justify-center rounded-xl py-4 px-4 text-sm font-semibold uppercase focus:outline-none transition-all"
//                                   )
//                                 }
//                               >
//                                 {size.name}
//                               </RadioGroup.Option>
//                             )
//                         )}
//                       </div>
//                     </RadioGroup>
//                   </div>
//                 )}

//                 {/* Add to Cart Button */}
//                 <div className="detail-section">
//                   {product.stock > 0 ? (
//                     <button
//                       onClick={handleCart}
//                       className="add-to-cart-btn w-full py-4 px-8 text-white font-semibold rounded-xl shadow-lg relative z-10"
//                     >
//                       Add to Cart
//                     </button>
//                   ) : (
//                     <button
//                       disabled
//                       className="w-full py-4 px-8 bg-slate-300 text-slate-500 font-semibold rounded-xl cursor-not-allowed"
//                     >
//                       Out of Stock
//                     </button>
//                   )}

//                   <div className="grid grid-cols-3 gap-4 mt-6">
//                     <div className="text-center p-4 bg-slate-50 rounded-xl">
//                       <svg
//                         className="w-6 h-6 mx-auto text-indigo-600 mb-2"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M5 13l4 4L19 7"
//                         />
//                       </svg>
//                       <p className="text-xs font-medium text-slate-600">
//                         Free Delivery
//                       </p>
//                     </div>
//                     <div className="text-center p-4 bg-slate-50 rounded-xl">
//                       <svg
//                         className="w-6 h-6 mx-auto text-indigo-600 mb-2"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                         />
//                       </svg>
//                       <p className="text-xs font-medium text-slate-600">
//                         Easy Returns
//                       </p>
//                     </div>
//                     <div className="text-center p-4 bg-slate-50 rounded-xl">
//                       <svg
//                         className="w-6 h-6 mx-auto text-indigo-600 mb-2"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                         />
//                       </svg>
//                       <p className="text-xs font-medium text-slate-600">
//                         Secure Payment
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Product Details Section */}
//             <div className="mt-20">
//               <div className="section-divider mb-12" />

//               <div className="grid lg:grid-cols-3 gap-12">
//                 {/* Description */}
//                 <div className="lg:col-span-2 detail-section">
//                   <h2 className="product-title text-3xl font-bold text-slate-900 mb-6">
//                     Product Description
//                   </h2>
//                   <div className="prose prose-slate max-w-none">
//                     <p className="text-slate-600 leading-relaxed text-lg">
//                       {product.description}
//                     </p>
//                   </div>

//                   <div className="mt-10">
//                     <h3 className="text-xl font-semibold text-slate-900 mb-4">
//                       Key Features
//                     </h3>
//                     <ul className="space-y-3">
//                       {highlights.map((highlight, index) => (
//                         <li key={index} className="flex items-start">
//                           <svg
//                             className="w-6 h-6 text-indigo-600 mr-3 flex-shrink-0 mt-0.5"
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                           <span className="text-slate-700">{highlight}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>

//                 {/* Specifications */}
//                 <div className="detail-section">
//                   <h3 className="text-xl font-semibold text-slate-900 mb-6">
//                     Specifications
//                   </h3>
//                   <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
//                     <div className="flex justify-between py-3 border-b border-slate-200">
//                       <span className="text-sm font-medium text-slate-500">
//                         Brand
//                       </span>
//                       <span className="text-sm font-semibold text-slate-900">
//                         {product.brand || "Premium"}
//                       </span>
//                     </div>
//                     <div className="flex justify-between py-3 border-b border-slate-200">
//                       <span className="text-sm font-medium text-slate-500">
//                         Category
//                       </span>
//                       <span className="text-sm font-semibold text-slate-900">
//                         {product.category || "Fashion"}
//                       </span>
//                     </div>
//                     <div className="flex justify-between py-3 border-b border-slate-200">
//                       <span className="text-sm font-medium text-slate-500">
//                         Stock Status
//                       </span>
//                       <span
//                         className={`text-sm font-semibold ${
//                           product.stock > 0 ? "text-green-600" : "text-red-600"
//                         }`}
//                       >
//                         {product.stock > 0 ? "In Stock" : "Out of Stock"}
//                       </span>
//                     </div>
//                     <div className="flex justify-between py-3">
//                       <span className="text-sm font-medium text-slate-500">
//                         SKU
//                       </span>
//                       <span className="text-sm font-semibold text-slate-900">
//                         {product.id || "N/A"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductByIdAsync,
  selectProductById,
  selectProductListStatus,
} from "../productSlice";
import { useParams } from "react-router-dom";
import { addToCartAsync, selectItems } from "../../cart/cartSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
import { Grid } from "react-loader-spinner";
import { toast } from "sonner";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const items = useSelector(selectItems);
  const product = useSelector(selectProductById);
  const dispatch = useDispatch();
  const params = useParams();
  const status = useSelector(selectProductListStatus);

  const [activeImg, setActiveImage] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
  const [thumbnailsLoaded, setThumbnailsLoaded] = useState({});

  const handleCart = (e) => {
    e.preventDefault();
    if (items.findIndex((item) => item.product?.id === product?.id) < 0) {
      const newItem = {
        product: product.id,
        quantity: 1,
      };
      if (selectedColor) {
        newItem.color = selectedColor;
      }
      if (selectedSize) {
        newItem.size = selectedSize;
      }
      dispatch(addToCartAsync({ item: newItem }));
      toast.success("Item added to cart");
    } else {
      toast.error("Item Already added");
    }
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      const firstImage = product.images[0];
      setActiveImage(firstImage);
      setImageLoaded(false);
      setThumbnailsLoaded({});
      
      // Preload the first image
      const img = new Image();
      img.src = firstImage;
      img.onload = () => {
        setImageLoaded(true);
      };
      img.onerror = () => {
        console.error("Failed to load main image:", firstImage);
        setImageLoaded(true);
      };
    }
  }, [product]);

  const highlights = product?.highlights || [
    "Premium quality materials",
    "Carefully crafted construction",
    "Modern design aesthetics",
    "Versatile and functional",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Inter:wght@300;400;500;600&display=swap');
          
          .product-detail-container {
            font-family: 'Inter', sans-serif;
          }
          
          .product-title {
            font-family: 'Cormorant Garamond', serif;
          }
          
          .fade-in {
            animation: fadeIn 0.6s ease-out forwards;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .image-zoom {
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          @media (hover: hover) {
            .image-zoom:hover {
              transform: scale(1.02);
            }
          }
          
          .thumbnail {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }
          
          .thumbnail::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), transparent);
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          @media (hover: hover) {
            .thumbnail:hover::before {
              opacity: 1;
            }
          }
          
          .thumbnail.active {
            border-color: rgb(99, 102, 241);
            box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
          }
          
          .price-tag {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .offer-card {
            background: linear-gradient(135deg, #f6f8fb 0%, #ffffff 100%);
            border-left: 3px solid #667eea;
            transition: all 0.3s ease;
          }
          
          @media (hover: hover) {
            .offer-card:hover {
              transform: translateX(4px);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            }
          }
          
          .add-to-cart-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }
          
          .add-to-cart-btn::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
          }
          
          @media (hover: hover) {
            .add-to-cart-btn:hover::before {
              width: 300px;
              height: 300px;
            }
            
            .add-to-cart-btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 12px 24px rgba(102, 126, 234, 0.4);
            }
          }
          
          .add-to-cart-btn:active {
            transform: translateY(0);
          }
          
          .breadcrumb-link {
            transition: color 0.2s ease;
          }
          
          @media (hover: hover) {
            .breadcrumb-link:hover {
              color: #667eea;
            }
          }
          
          .section-divider {
            background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
            height: 1px;
            margin: 2rem 0;
          }
          
          @media (min-width: 640px) {
            .section-divider {
              margin: 3rem 0;
            }
          }
          
          .detail-section {
            animation: slideUp 0.6s ease-out forwards;
            opacity: 0;
          }
          
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .detail-section:nth-child(1) { animation-delay: 0.1s; }
          .detail-section:nth-child(2) { animation-delay: 0.2s; }
          .detail-section:nth-child(3) { animation-delay: 0.3s; }
          
          .loader-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 60vh;
          }
          
          .image-skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
          }
          
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }

          /* Smooth scrolling for mobile */
          @media (max-width: 640px) {
            html {
              scroll-behavior: smooth;
            }
          }
        `}
      </style>

      {status === "loading" ? (
        <div className="loader-container">
          <Grid
            height="80"
            width="80"
            color="rgb(102, 126, 234)"
            ariaLabel="grid-loading"
            radius="12.5"
            visible={true}
          />
        </div>
      ) : null}

      {product && (
        <div className="product-detail-container">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="pt-4 sm:pt-6 md:pt-8 pb-2 sm:pb-4">
            <ol className="mx-auto flex max-w-7xl items-center space-x-1 sm:space-x-2 px-3 sm:px-4 md:px-6 lg:px-8 overflow-x-auto pb-2 sm:pb-0">
              {product.breadcrumbs &&
                product.breadcrumbs.map((breadcrumb, index) => (
                  <li key={breadcrumb.id} className="flex items-center flex-shrink-0">
                    <a
                      href={breadcrumb.href}
                      className="breadcrumb-link text-xs sm:text-sm font-medium text-slate-600 whitespace-nowrap"
                    >
                      {breadcrumb?.name}
                    </a>
                    {index < product.breadcrumbs.length - 1 && (
                      <svg
                        className="ml-1 sm:ml-2 h-4 w-3 sm:h-5 sm:w-4 text-slate-300 flex-shrink-0"
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    )}
                  </li>
                ))}
              <li className="flex items-center flex-shrink-0">
                <svg
                  className="mr-1 sm:mr-2 h-4 w-3 sm:h-5 sm:w-4 text-slate-300 flex-shrink-0"
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
                <span className="text-xs sm:text-sm font-medium text-slate-400 truncate max-w-[150px] sm:max-w-none">
                  {product?.title}
                </span>
              </li>
            </ol>
          </nav>

          {/* Main Content */}
          <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 pb-8 sm:pb-12 md:pb-16">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-12 lg:items-start">
              {/* Image Gallery */}
              <div className="fade-in">
                <div className="lg:sticky lg:top-8">
                  {/* Main Image */}
                  <div className="relative aspect-square overflow-hidden rounded-xl sm:rounded-2xl bg-slate-100 mb-3 sm:mb-4 md:mb-6 shadow-md sm:shadow-lg">
                    {!imageLoaded && activeImg && (
                      <div className="absolute inset-0 image-skeleton rounded-xl sm:rounded-2xl z-10" />
                    )}
                    {activeImg && (
                      <img
                        key={activeImg}
                        src={activeImg}
                        alt={product?.title}
                        className={`image-zoom w-full h-full object-cover transition-opacity duration-300 ${
                          imageLoaded ? "opacity-100" : "opacity-0"
                        }`}
                        onLoad={() => setImageLoaded(true)}
                        onError={(e) => {
                          console.error("Main image failed to load:", activeImg);
                          setImageLoaded(true);
                        }}
                      />
                    )}
                  </div>

                  {/* Thumbnail Grid */}
                  <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                    {product?.images?.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (image !== activeImg) {
                            setImageLoaded(false);
                            setActiveImage(image);
                            
                            // Preload the image
                            const img = new Image();
                            img.src = image;
                            img.onload = () => {
                              setImageLoaded(true);
                            };
                            img.onerror = () => {
                              console.error("Failed to load image:", image);
                              setImageLoaded(true);
                            };
                          }
                        }}
                        className={classNames(
                          "thumbnail aspect-square rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all relative",
                          activeImg === image
                            ? "active"
                            : "border-transparent hover:border-slate-300"
                        )}
                      >
                        {!thumbnailsLoaded[index] && (
                          <div className="absolute inset-0 image-skeleton rounded-lg sm:rounded-xl z-10" />
                        )}
                        <img
                          src={image}
                          alt={`${product?.title} view ${index + 1}`}
                          className={`w-full h-full object-cover transition-opacity duration-300 ${
                            thumbnailsLoaded[index] ? "opacity-100" : "opacity-0"
                          }`}
                          onLoad={() =>
                            setThumbnailsLoaded((prev) => ({ ...prev, [index]: true }))
                          }
                          onError={(e) => {
                            console.error(`Thumbnail ${index} failed to load:`, image);
                            setThumbnailsLoaded((prev) => ({ ...prev, [index]: true }));
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-6 sm:mt-8 lg:mt-0 fade-in space-y-4 sm:space-y-6 md:space-y-8">
                {/* Title & Rating */}
                <div>
                  <h1 className="product-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight">
                    {product?.title}
                  </h1>

                  <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                    <div className="flex items-center bg-amber-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                      <span className="font-semibold text-slate-900 mr-1 text-sm sm:text-base">
                        {product?.rating}
                      </span>
                      <div className="flex">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              product?.rating > rating
                                ? "text-amber-400"
                                : "text-slate-300",
                              "h-3 w-3 sm:h-4 sm:w-4"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm text-slate-500">
                      {Math.floor(Math.random() * 500 + 100)} reviews
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="bg-gradient-to-br from-slate-50 to-white p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-slate-200">
                  <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                    <span className="price-tag text-3xl sm:text-4xl md:text-5xl font-bold">
                      ₹{product?.discountPrice ||
                        Math.round(
                          product?.price * (1 - product?.discountPercentage / 100)
                        )}
                    </span>
                    <span className="text-lg sm:text-xl md:text-2xl text-slate-400 line-through">
                      ₹{product?.price}
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
                      Save {product?.discountPercentage}%
                    </span>
                  </div>
                </div>

                {/* Offers */}
                <div>
                  <button
                    onClick={() => setShowOffers(!showOffers)}
                    className="flex items-center justify-between w-full text-left group mb-2 sm:mb-3"
                  >
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                      Available Offers
                    </h3>
                    <svg
                      className={`w-5 h-5 text-slate-400 transition-transform ${
                        showOffers ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <div
                    className={`space-y-2 sm:space-y-3 overflow-hidden transition-all duration-300 ${
                      showOffers ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="offer-card rounded-lg sm:rounded-xl p-3 sm:p-4">
                      <div className="flex gap-2 sm:gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                              <path
                                fillRule="evenodd"
                                d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-slate-900">
                            Bank Offer
                          </p>
                          <p className="text-xs sm:text-sm text-slate-600 mt-0.5 sm:mt-1">
                            10% off on ICICI Bank Credit Card, up to ₹1250 on orders of
                            ₹5,000 and above
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="offer-card rounded-lg sm:rounded-xl p-3 sm:p-4">
                      <div className="flex gap-2 sm:gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                              <path
                                fillRule="evenodd"
                                d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-medium text-slate-900">
                            Bank Offer
                          </p>
                          <p className="text-xs sm:text-sm text-slate-600 mt-0.5 sm:mt-1">
                            10% off on Axis Bank and Citi Credit Card, up to ₹1250 on
                            orders of ₹5,000 and above
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section-divider" />

                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="detail-section">
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-900 mb-3 sm:mb-4 uppercase tracking-wide">
                      Select Color
                    </h3>
                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="mt-2 sm:mt-4"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                        {product.colors.map(
                          (color) =>
                            color && (
                              <RadioGroup.Option
                                key={color.name}
                                value={color}
                                className={({ active, checked }) =>
                                  classNames(
                                    "relative flex cursor-pointer items-center justify-center rounded-full p-0.5 sm:p-1 focus:outline-none transition-all",
                                    checked
                                      ? "ring-2 ring-offset-2 ring-indigo-500"
                                      : "ring-1 ring-slate-200 hover:ring-slate-300"
                                  )
                                }
                              >
                                <span
                                  className={classNames(
                                    color.class,
                                    "h-8 w-8 sm:h-10 sm:w-10 rounded-full border border-black border-opacity-10"
                                  )}
                                />
                              </RadioGroup.Option>
                            )
                        )}
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="detail-section">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <h3 className="text-xs sm:text-sm font-semibold text-slate-900 uppercase tracking-wide">
                        Select Size
                      </h3>
                      <button className="text-xs sm:text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                        Size Guide
                      </button>
                    </div>

                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="mt-2 sm:mt-4"
                    >
                      <div className="grid grid-cols-4 gap-2 sm:gap-3">
                        {product.sizes.map(
                          (size) =>
                            size && (
                              <RadioGroup.Option
                                key={size.name}
                                value={size}
                                disabled={!size.inStock}
                                className={({ active, checked }) =>
                                  classNames(
                                    size.inStock
                                      ? "cursor-pointer bg-white text-slate-900 hover:bg-slate-50"
                                      : "cursor-not-allowed bg-slate-50 text-slate-300",
                                    checked
                                      ? "ring-2 ring-indigo-500 bg-indigo-50"
                                      : "ring-1 ring-slate-200",
                                    "relative flex items-center justify-center rounded-lg sm:rounded-xl py-2 sm:py-3 md:py-4 px-2 sm:px-4 text-xs sm:text-sm font-semibold uppercase focus:outline-none transition-all"
                                  )
                                }
                              >
                                {size.name}
                              </RadioGroup.Option>
                            )
                        )}
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Add to Cart Button */}
                <div className="detail-section">
                  {product.stock > 0 ? (
                    <button
                      onClick={handleCart}
                      className="add-to-cart-btn w-full py-3 sm:py-3.5 md:py-4 px-6 sm:px-8 text-white font-semibold text-sm sm:text-base rounded-xl shadow-lg relative z-10"
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full py-3 sm:py-3.5 md:py-4 px-6 sm:px-8 bg-slate-300 text-slate-500 font-semibold text-sm sm:text-base rounded-xl cursor-not-allowed"
                    >
                      Out of Stock
                    </button>
                  )}

                  <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-5 md:mt-6">
                    <div className="text-center p-2 sm:p-3 md:p-4 bg-slate-50 rounded-lg sm:rounded-xl">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 mx-auto text-indigo-600 mb-1 sm:mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <p className="text-[10px] sm:text-xs font-medium text-slate-600">
                        Free Delivery
                      </p>
                    </div>
                    <div className="text-center p-2 sm:p-3 md:p-4 bg-slate-50 rounded-lg sm:rounded-xl">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 mx-auto text-indigo-600 mb-1 sm:mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-[10px] sm:text-xs font-medium text-slate-600">
                        Easy Returns
                      </p>
                    </div>
                    <div className="text-center p-2 sm:p-3 md:p-4 bg-slate-50 rounded-lg sm:rounded-xl">
                      <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 mx-auto text-indigo-600 mb-1 sm:mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      <p className="text-[10px] sm:text-xs font-medium text-slate-600">
                        Secure Payment
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="mt-12 sm:mt-16 md:mt-20">
              <div className="section-divider mb-8 sm:mb-10 md:mb-12" />

              <div className="grid lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
                {/* Description */}
                <div className="lg:col-span-2 detail-section">
                  <h2 className="product-title text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-5 md:mb-6">
                    Product Description
                  </h2>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base md:text-lg">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-6 sm:mt-8 md:mt-10">
                    <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 sm:mb-4">
                      Key Features
                    </h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <svg
                            className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 mr-2 sm:mr-3 flex-shrink-0 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-slate-700 text-sm sm:text-base">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Specifications */}
                <div className="detail-section">
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-5 md:mb-6">
                    Specifications
                  </h3>
                  <div className="bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
                    <div className="flex justify-between py-2 sm:py-3 border-b border-slate-200">
                      <span className="text-xs sm:text-sm font-medium text-slate-500">
                        Brand
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-900">
                        {product.brand || "Premium"}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 sm:py-3 border-b border-slate-200">
                      <span className="text-xs sm:text-sm font-medium text-slate-500">
                        Category
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-900">
                        {product.category || "Fashion"}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 sm:py-3 border-b border-slate-200">
                      <span className="text-xs sm:text-sm font-medium text-slate-500">
                        Stock Status
                      </span>
                      <span
                        className={`text-xs sm:text-sm font-semibold ${
                          product.stock > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 sm:py-3">
                      <span className="text-xs sm:text-sm font-medium text-slate-500">
                        SKU
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-900">
                        {product.id || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}