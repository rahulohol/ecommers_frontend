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
// import { useAlert } from "react-alert";
// import { Grid } from "react-loader-spinner";

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
//   const alert = useAlert();
//   const status = useSelector(selectProductListStatus);

//   const handleCart = (e) => {
//     e.preventDefault();
//     if (items.findIndex((item) => item.product.id === product.id) < 0) {

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
//       dispatch(addToCartAsync({ item: newItem, alert }));
//     } else {
//       alert.error("Item Already added");
//     }
//   };

//   useEffect(() => {
//     dispatch(fetchProductByIdAsync(params.id));
//   }, [dispatch, params.id]);

//   return (
//     <div className="bg-white">
//       {status === "loading" ? (
//         <Grid
//           height="80"
//           width="80"
//           color="rgb(79, 70, 229) "
//           ariaLabel="grid-loading"
//           radius="12.5"
//           wrapperStyle={{}}
//           wrapperClass=""
//           visible={true}
//         />
//       ) : null}
//       {product && (
//         <div className="pt-6">
//           <nav aria-label="Breadcrumb">
//             <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
//               {product.breadcrumbs &&
//                 product.breadcrumbs.map((breadcrumb) => (
//                   <li key={breadcrumb.id}>
//                     <div className="flex items-center">
//                       <a
//                         href={breadcrumb.href}
//                         className="mr-2 text-sm font-medium text-gray-900"
//                       >
//                         {breadcrumb?.name}
//                       </a>
//                       <svg
//                         width={16}
//                         height={20}
//                         viewBox="0 0 16 20"
//                         fill="currentColor"
//                         aria-hidden="true"
//                         className="h-5 w-4 text-gray-300"
//                       >
//                         <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
//                       </svg>
//                     </div>
//                   </li>
//                 ))}
//               <li className="text-sm">
//                 <a
//                   href={product.href}
//                   aria-current="page"
//                   className="font-medium text-gray-500 hover:text-gray-600"
//                 >
//                   {product?.title}
//                 </a>
//               </li>
//             </ol>
//           </nav>

//           {/* Image gallery */}
//           <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
//             <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
//               <img
//                 src={product?.images[0]}
//                 alt={product?.title}
//                 className="h-full w-full object-cover object-center"
//               />
//             </div>
//             <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
//               <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
//                 <img
//                   src={product?.images[1]}
//                   alt={product?.title}
//                   className="h-full w-full object-cover object-center"
//                 />
//               </div>
//               <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
//                 <img
//                   src={product?.images[2]}
//                   alt={product?.title}
//                   className="h-full w-full object-cover object-center"
//                 />
//               </div>
//             </div>
//             <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
//               <img
//                 src={product?.images[3]}
//                 alt={product?.title}
//                 className="h-full w-full object-cover object-center"
//               />
//             </div>
//           </div>

//           {/* Product info */}
//           <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
//             <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
//               <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
//                 {product?.title}
//               </h1>
//             </div>

//             {/* Options */}
//             <div className="mt-4 lg:row-span-3 lg:mt-0">
//               <h2 className="sr-only">Product information</h2>
//               <p className="text-xl line-through tracking-tight text-gray-900">
//                 ${product?.price}
//               </p>
//               <p className="text-3xl tracking-tight text-gray-900">
//                 ${product?.discountPrice}
//               </p>

//               {/* Reviews */}
//               <div className="mt-6">
//                 <h3 className="sr-only">Reviews</h3>
//                 <div className="flex items-center">
//                   <div className="flex items-center">
//                     {[0, 1, 2, 3, 4].map((rating) => (
//                       <StarIcon
//                         key={rating}
//                         className={classNames(
//                           product?.rating > rating
//                             ? "text-gray-900"
//                             : "text-gray-200",
//                           "h-5 w-5 flex-shrink-0"
//                         )}
//                         aria-hidden="true"
//                       />
//                     ))}
//                   </div>
//                   <p className="sr-only">{product?.rating} out of 5 stars</p>
//                 </div>
//               </div>

//               <form className="mt-10">
//                 {/* Colors */}
//                 {product.colors && product.colors.length > 0 && (
//                   <div>
//                     <h3 className="text-sm font-medium text-gray-900">Color</h3>

//                     <RadioGroup
//                       value={selectedColor}
//                       onChange={setSelectedColor}
//                       className="mt-4"
//                     >
//                       <RadioGroup.Label className="sr-only">
//                         Choose a color
//                       </RadioGroup.Label>
//                       <div className="flex items-center space-x-3">
//                         {product.colors.length &&
//                           product.colors.map(
//                             (color) =>
//                               color !== null && (
//                                 <RadioGroup.Option
//                                   key={color?.name}
//                                   value={color}
//                                   className={({ active, checked }) =>
//                                     classNames(
//                                       color.selectedClass,
//                                       active && checked
//                                         ? "ring ring-offset-1"
//                                         : "",
//                                       !active && checked ? "ring-2" : "",
//                                       "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
//                                     )
//                                   }
//                                 >
//                                   <RadioGroup.Label
//                                     as="span"
//                                     className="sr-only"
//                                   >
//                                     {color !== null && color?.name}
//                                   </RadioGroup.Label>
//                                   <span
//                                     aria-hidden="true"
//                                     className={classNames(
//                                       color?.class,
//                                       "h-8 w-8 rounded-full border border-black border-opacity-10"
//                                     )}
//                                   />
//                                 </RadioGroup.Option>
//                               )
//                           )}
//                       </div>
//                     </RadioGroup>
//                   </div>
//                 )}

//                 {/* Sizes */}
//                 {product.sizes && product.sizes.length > 0 && (
//                   <div className="mt-10">
//                     <div className="flex items-center justify-between">
//                       <h3 className="text-sm font-medium text-gray-900">
//                         Size
//                       </h3>
//                       <a
//                         href="#"
//                         className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
//                       >
//                         Size guide
//                       </a>
//                     </div>

//                     <RadioGroup
//                       value={selectedSize}
//                       onChange={setSelectedSize}
//                       className="mt-4"
//                     >
//                       <RadioGroup.Label className="sr-only">
//                         Choose a size
//                       </RadioGroup.Label>
//                       <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
//                         {product.sizes.length &&
//                           product.sizes.map(
//                             (size) =>
//                               size !== null && (
//                                 <RadioGroup.Option
//                                   key={size.name}
//                                   value={size}
//                                   disabled={!size.inStock}
//                                   className={({ active }) =>
//                                     classNames(
//                                       size.inStock
//                                         ? "cursor-pointer bg-white text-gray-900 shadow-sm"
//                                         : "cursor-not-allowed bg-gray-50 text-gray-200",
//                                       active ? "ring-2 ring-indigo-500" : "",
//                                       "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
//                                     )
//                                   }
//                                 >
//                                   {({ active, checked }) => (
//                                     <>
//                                       <RadioGroup.Label as="span">
//                                         {size.name}
//                                       </RadioGroup.Label>
//                                       {size.inStock ? (
//                                         <span
//                                           className={classNames(
//                                             active ? "border" : "border-2",
//                                             checked
//                                               ? "border-indigo-500"
//                                               : "border-transparent",
//                                             "pointer-events-none absolute -inset-px rounded-md"
//                                           )}
//                                           aria-hidden="true"
//                                         />
//                                       ) : (
//                                         <span
//                                           aria-hidden="true"
//                                           className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
//                                         >
//                                           <svg
//                                             className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
//                                             viewBox="0 0 100 100"
//                                             preserveAspectRatio="none"
//                                             stroke="currentColor"
//                                           >
//                                             <line
//                                               x1={0}
//                                               y1={100}
//                                               x2={100}
//                                               y2={0}
//                                               vectorEffect="non-scaling-stroke"
//                                             />
//                                           </svg>
//                                         </span>
//                                       )}
//                                     </>
//                                   )}
//                                 </RadioGroup.Option>
//                               )
//                           )}
//                       </div>
//                     </RadioGroup>
//                   </div>
//                 )}

//                 <button
//                   onClick={handleCart}
//                   type="submit"
//                   className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                 >
//                   Add to Cart
//                 </button>
//               </form>
//             </div>

//             <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
//               {/* Description and details */}
//               <div>
//                 <h3 className="sr-only">Description</h3>

//                 <div className="space-y-6">
//                   <p className="text-base text-gray-900">
//                     {product.description}
//                   </p>
//                 </div>
//               </div>

//               {product.highlights && (
//                 <div className="mt-10">
//                   <h3 className="text-sm font-medium text-gray-900">
//                     Highlights
//                   </h3>

//                   <div className="mt-4">
//                     <ul
//                       role="list"
//                       className="list-disc space-y-2 pl-4 text-sm"
//                     >
//                       {product.highlights.map((highlight) => (
//                         <li key={highlight} className="text-gray-400">
//                           <span className="text-gray-600">{highlight}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               )}

//               <div className="mt-10">
//                 <h2 className="text-sm font-medium text-gray-900">Details</h2>

//                 <div className="mt-4 space-y-6">
//                   <p className="text-sm text-gray-600">{product.description}</p>
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
import { useAlert } from "react-alert";
import { Grid } from "react-loader-spinner";

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
  const alert = useAlert();
  const status = useSelector(selectProductListStatus);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleCart = (e) => {
    e.preventDefault();
    if (items.findIndex((item) => item.product.id === product.id) < 0) {
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
      dispatch(addToCartAsync({ item: newItem, alert }));
    } else {
      alert.error("Item Already added");
    }
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  const [activeImg, setActiveImage] = useState(null);

  useEffect(() => {
    if (product) {
      setActiveImage(null);
    }
  }, []);

  const features = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  ];

  // const [amount, setAmount] = useState(1);
  const [highlights, setHighlights] = useState(null);
  // let highlights = [];
  useEffect(() => {
    if (product) {
      setHighlights(null);
    }
  }, [product]);

  return (
    <div className="bg-white">
      {status === "loading" ? (
        <Grid
          height="80"
          width="80"
          color="rgb(79, 70, 229) "
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : null}
      {product && (
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              {product.breadcrumbs &&
                product.breadcrumbs.map((breadcrumb) => (
                  <li key={breadcrumb.id}>
                    <div className="flex items-center">
                      <a
                        href={breadcrumb.href}
                        className="mr-2 text-sm font-medium text-gray-900"
                      >
                        {breadcrumb?.name}
                      </a>
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>
                ))}
              <li className="text-sm">
                <a
                  href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product?.title}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}

          {/* <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'> */}
          {/* {!activeImg ? setActiveImage(product?.images?.[0]) : ""} */}
          <div className="flex p-5 center">
            <div className="flex flex-col gap-6 w-full lg:w-2/4 ">
              <div className="p-2 border-black-100">
                <img
                  src={activeImg ? activeImg : product?.images[0]}
                  alt=""
                  className="w-full h-full aspect-square object-cover rounded-xl"
                />
              </div>
              {/* {!activeImg ? product?.images[0] : null} */}

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 justify-center items-center m-auto">
                {product?.images.map((image, index) => (
                  <img
                    src={image}
                    alt=""
                    className="w-24 h-24 rounded-md cursor-pointer border-red"
                    onClick={() => setActiveImage(image)}
                    key={index}
                  />
                ))}
              </div>

              {/* <div className="flex flex-row justify-around h-24 pl-1 pr-1 overflow-hidden">
              {product?.images.map((image, index) => (
                <img
                  src={image}
                  alt=""
                  className="w-24 h-24   rounded-md cursor-pointer"
                  onClick={() => setActiveImage(image)}
                  key={index}
                />
              ))} */}
              {/* <img
                src={images.img1}
                alt=""
                className="w-24 h-24 rounded-md cursor-pointer"
                onClick={() => setActiveImage(images.img1)}
              />
              <img
                src={images.img2}
                alt=""
                className="w-24 h-24 rounded-md cursor-pointer"
                onClick={() => setActiveImage(images.img2)}
              />
              <img
                src={images.img3}
                alt=""
                className="w-24 h-24 rounded-md cursor-pointer"
                onClick={() => setActiveImage(images.img3)}
              />
              <img
                src={images.img4}
                alt=""
                className="w-24 h-24 rounded-md cursor-pointer"
                onClick={() => setActiveImage(images.img4)}
              /> */}
              {/* </div> */}
            </div>

            <div className="mt-4 lg:row-span-3 lg:mt-0 pl-3 pt-5 hidden lg:block">
              <h2 className="sr-only">Product information</h2>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product?.title}
              </h1>

              <p className="text-xl line-through tracking-tight text-gray-900 mt-2">
                ${product?.price}
              </p>
              <p className="text-3xl tracking-tight text-gray-900">
                $
                {product?.discountPrice
                  ? product?.discountPrice
                  : Math.round(
                      product?.price * (1 - product?.discountPercentage / 100)
                    )}
              </p>

              {/* offers */}
              <p className="font-semibold tracking-tight">Available offers</p>

              <div className="flex items-start">
                <img
                  src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
                  alt=""
                  className="w-5 h-5 mt-1 mr-1"
                />
                <p className="tracking-tight">
                  Bank Offer 10% off on ICICI Bank Credit Card, up to ₹1250 on
                  orders of ₹5,000 and above T&C
                </p>
              </div>
              <div className="flex items-start">
                <img
                  src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
                  alt=""
                  className="w-5 h-5 mt-1 mr-1"
                />
                <p className="tracking-tight">
                  Bank Offer 10% off on Axis Bank and Citi Credit Card, up to
                  ₹1250 on orders of ₹5,000 and above T&C
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div
                  className="flex items-center"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <div className="flex items-center">
                    <span className="mr-1">{product?.rating}</span>
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product?.rating > rating
                            ? "text-orange-400"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product?.rating} out of 5 stars</p>
                </div>
              </div>

              <form className="mt-10">
                {/* Colors */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Color</h3>

                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="mt-4"
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a color
                      </RadioGroup.Label>
                      <div className="flex items-center space-x-3">
                        {product.colors.length &&
                          product.colors.map(
                            (color) =>
                              color !== null && (
                                <RadioGroup.Option
                                  key={color?.name}
                                  value={color}
                                  className={({ active, checked }) =>
                                    classNames(
                                      color.selectedClass,
                                      active && checked
                                        ? "ring ring-offset-1"
                                        : "",
                                      !active && checked ? "ring-2" : "",
                                      "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                    )
                                  }
                                >
                                  <RadioGroup.Label
                                    as="span"
                                    className="sr-only"
                                  >
                                    {color !== null && color?.name}
                                  </RadioGroup.Label>
                                  <span
                                    aria-hidden="true"
                                    className={classNames(
                                      color?.class,
                                      "h-8 w-8 rounded-full border border-black border-opacity-10"
                                    )}
                                  />
                                </RadioGroup.Option>
                              )
                          )}
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Sizes */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        Size
                      </h3>
                      <a
                        href="#"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Size guide
                      </a>
                    </div>

                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="mt-4"
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a size
                      </RadioGroup.Label>
                      <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                        {product.sizes.length &&
                          product.sizes.map(
                            (size) =>
                              size !== null && (
                                <RadioGroup.Option
                                  key={size.name}
                                  value={size}
                                  disabled={!size.inStock}
                                  className={({ active }) =>
                                    classNames(
                                      size.inStock
                                        ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                        : "cursor-not-allowed bg-gray-50 text-gray-200",
                                      active ? "ring-2 ring-indigo-500" : "",
                                      "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                                    )
                                  }
                                >
                                  {({ active, checked }) => (
                                    <>
                                      <RadioGroup.Label as="span">
                                        {size.name}
                                      </RadioGroup.Label>
                                      {size.inStock ? (
                                        <span
                                          className={classNames(
                                            active ? "border" : "border-2",
                                            checked
                                              ? "border-indigo-500"
                                              : "border-transparent",
                                            "pointer-events-none absolute -inset-px rounded-md"
                                          )}
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <span
                                          aria-hidden="true"
                                          className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                        >
                                          <svg
                                            className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                            viewBox="0 0 100 100"
                                            preserveAspectRatio="none"
                                            stroke="currentColor"
                                          >
                                            <line
                                              x1={0}
                                              y1={100}
                                              x2={100}
                                              y2={0}
                                              vectorEffect="non-scaling-stroke"
                                            />
                                          </svg>
                                        </span>
                                      )}
                                    </>
                                  )}
                                </RadioGroup.Option>
                              )
                          )}
                      </div>
                    </RadioGroup>
                  </div>
                )}

                <button
                  onClick={handleCart}
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to Cart
                </button>
              </form>
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto  max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16 pl-5">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product?.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0 lg:hidden">
              <h2 className="sr-only">Product information</h2>
              <p className="text-xl line-through tracking-tight text-gray-900">
                ${product?.price}
              </p>
              <p className="text-3xl tracking-tight text-gray-900">
                ${product?.discountPrice}
              </p>

              {/* offers */}
              <p className="font-semibold tracking-tight">Available offers</p>

              <div className="flex items-start">
                <img
                  src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
                  alt=""
                  className="w-5 h-5 mt-1 mr-1"
                />
                <p className="tracking-tight">
                  Bank Offer 10% off on ICICI Bank Credit Card, up to ₹1250 on
                  orders of ₹5,000 and above T&C
                </p>
              </div>
              <div className="flex items-start">
                <img
                  src="https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
                  alt=""
                  className="w-5 h-5 mt-1 mr-1"
                />
                <p className="tracking-tight">
                  Bank Offer 10% off on Axis Bank and Citi Credit Card, up to
                  ₹1250 on orders of ₹5,000 and above T&C
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-4">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <span className="mr-1">{product?.rating}.0</span>
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          product?.rating > rating
                            ? "text-orange-400"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{product?.rating} out of 5 stars</p>
                </div>
              </div>

              <form className="mt-10">
                {/* Colors */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Color</h3>

                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="mt-4"
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a color
                      </RadioGroup.Label>
                      <div className="flex items-center space-x-3">
                        {product.colors.length &&
                          product.colors.map(
                            (color) =>
                              color !== null && (
                                <RadioGroup.Option
                                  key={color?.name}
                                  value={color}
                                  className={({ active, checked }) =>
                                    classNames(
                                      color.selectedClass,
                                      active && checked
                                        ? "ring ring-offset-1"
                                        : "",
                                      !active && checked ? "ring-2" : "",
                                      "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                    )
                                  }
                                >
                                  <RadioGroup.Label
                                    as="span"
                                    className="sr-only"
                                  >
                                    {color !== null && color?.name}
                                  </RadioGroup.Label>
                                  <span
                                    aria-hidden="true"
                                    className={classNames(
                                      color?.class,
                                      "h-8 w-8 rounded-full border border-black border-opacity-10"
                                    )}
                                  />
                                </RadioGroup.Option>
                              )
                          )}
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {/* Sizes */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        Size
                      </h3>
                      <a
                        href="#"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Size guide
                      </a>
                    </div>

                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="mt-4"
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a size
                      </RadioGroup.Label>
                      <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                        {product.sizes.length &&
                          product.sizes.map(
                            (size) =>
                              size !== null && (
                                <RadioGroup.Option
                                  key={size.name}
                                  value={size}
                                  disabled={!size.inStock}
                                  className={({ active }) =>
                                    classNames(
                                      size.inStock
                                        ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                        : "cursor-not-allowed bg-gray-50 text-gray-200",
                                      active ? "ring-2 ring-indigo-500" : "",
                                      "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                                    )
                                  }
                                >
                                  {({ active, checked }) => (
                                    <>
                                      <RadioGroup.Label as="span">
                                        {size.name}
                                      </RadioGroup.Label>
                                      {size.inStock ? (
                                        <span
                                          className={classNames(
                                            active ? "border" : "border-2",
                                            checked
                                              ? "border-indigo-500"
                                              : "border-transparent",
                                            "pointer-events-none absolute -inset-px rounded-md"
                                          )}
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <span
                                          aria-hidden="true"
                                          className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                        >
                                          <svg
                                            className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                            viewBox="0 0 100 100"
                                            preserveAspectRatio="none"
                                            stroke="currentColor"
                                          >
                                            <line
                                              x1={0}
                                              y1={100}
                                              x2={100}
                                              y2={0}
                                              vectorEffect="non-scaling-stroke"
                                            />
                                          </svg>
                                        </span>
                                      )}
                                    </>
                                  )}
                                </RadioGroup.Option>
                              )
                          )}
                      </div>
                    </RadioGroup>
                  </div>
                )}

                <button
                  onClick={handleCart}
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to Cart
                </button>
              </form>
            </div>

            {/* Reviews on large screen */}

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {highlights?.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
