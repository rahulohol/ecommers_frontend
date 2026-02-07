// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   clearSelectedProduct,
// //   createProductAsync,
// //   fetchProductByIdAsync,
// //   selectBrands,
// //   selectCategories,
// //   selectProductById,
// //   updateProductAsync,
// // } from "../../product/productSlice";
// // import { useForm } from "react-hook-form";
// // import { useParams } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import Modal from "../../common/Modal";
// // import { useAlert } from "react-alert";

// // function ProductForm() {
// //   const {
// //     register,
// //     handleSubmit,
// //     setValue,
// //     reset,
// //     formState: { errors },
// //   } = useForm();
// //   const brands = useSelector(selectBrands);
// //   const categories = useSelector(selectCategories);
// //   const dispatch = useDispatch();
// //   const params = useParams();
// //   const selectedProduct = useSelector(selectProductById);
// //   const [openModal, setOpenModal] = useState(null);
// //   const alert = useAlert();

// //   const colors = [
// //     {
// //       name: "White",
// //       class: "bg-white",
// //       selectedClass: "ring-gray-400",
// //       id: "white",
// //     },
// //     {
// //       name: "Gray",
// //       class: "bg-gray-200",
// //       selectedClass: "ring-gray-400",
// //       id: "gray",
// //     },
// //     {
// //       name: "Black",
// //       class: "bg-gray-900",
// //       selectedClass: "ring-gray-900",
// //       id: "black",
// //     },
// //   ];

// //   const sizes = [
// //     { name: "XXS", inStock: true, id: "xxs" },
// //     { name: "XS", inStock: true, id: "xs" },
// //     { name: "S", inStock: true, id: "s" },
// //     { name: "M", inStock: true, id: "m" },
// //     { name: "L", inStock: true, id: "l" },
// //     { name: "XL", inStock: true, id: "xl" },
// //     { name: "2XL", inStock: true, id: "2xl" },
// //     { name: "3XL", inStock: true, id: "3xl" },
// //   ];

// //   useEffect(() => {
// //     if (params.id) {
// //       dispatch(fetchProductByIdAsync(params.id));
// //     } else {
// //       dispatch(clearSelectedProduct());
// //     }
// //   }, [params.id, dispatch]);

// //   useEffect(() => {
// //     if (selectedProduct && params.id) {
// //       setValue("title", selectedProduct.title);
// //       setValue("description", selectedProduct.description);
// //       setValue("price", selectedProduct.price);
// //       setValue("discountPercentage", selectedProduct.discountPercentage);
// //       setValue("thumbnail", selectedProduct.thumbnail);
// //       setValue("stock", selectedProduct.stock);
// //       setValue("image1", selectedProduct.images[0]);
// //       setValue("image2", selectedProduct.images[1]);
// //       setValue("image3", selectedProduct.images[2]);
// //       setValue("brand", selectedProduct.brand);
// //       setValue("category", selectedProduct.category);
// //       setValue("highlight1", selectedProduct.highlights[0]);
// //       setValue("highlight2", selectedProduct.highlights[1]);
// //       setValue("highlight3", selectedProduct.highlights[2]);
// //       setValue("highlight4", selectedProduct.highlights[3]);
// //       setValue(
// //         "sizes",
// //         selectedProduct.sizes &&
// //           selectedProduct.sizes[0] &&
// //           selectedProduct.sizes.map((size) => size.id)
// //       );
// //       setValue(
// //         "colors",
// //         selectedProduct.colors &&
// //           selectedProduct.colors[0] &&
// //           selectedProduct.colors.map((color) => color.id)
// //       );
// //     }
// //   }, [selectedProduct, params.id, setValue]);

// //   const handleDelete = () => {
// //     const product = { ...selectedProduct };
// //     product.deleted = true;
// //     dispatch(updateProductAsync(product));
// //   };

// //   return (
// //     <>
// //       <div
// //         // className={`${
// //         //   screenSize === "large"
// //         //     ? "w-85pct-large"
// //         //     : screenSize === "medium"
// //         //     ? "w-85pct-medium"
// //         //     : "w-90pct-small"
// //         // }`}
// //         style={{ width: "100%", alignContent: "center" }}
// //       >
// //         <form
// //           style={{ width: "100%" }}
// //           noValidate
// //           onSubmit={handleSubmit((data) => {
// //             const product = { ...data };
// //             product.images = [
// //               product.image1,
// //               product.image2,
// //               product.image3,
// //               product.thumbnail,
// //             ];
// //             product.highlights = [
// //               product.highlight1,
// //               product.highlight2,
// //               product.highlight3,
// //               product.highlight4,
// //             ];
// //             product.rating = 0;
// //             if (product.colors) {
// //               product.colors =
// //                 product.colors[0] &&
// //                 product.colors.map((color) =>
// //                   colors.find((clr) => clr.id === color)
// //                 );
// //             }
// //             if (product.sizes) {
// //               product.sizes =
// //                 product.sizes[0] &&
// //                 product.sizes.map((size) => sizes.find((sz) => sz.id === size));
// //             }

// //             delete product["image1"];
// //             delete product["image2"];
// //             delete product["image3"];
// //             product.price = +product.price;
// //             product.stock = +product.stock;
// //             product.discountPercentage = +product.discountPercentage;

// //             if (params.id) {
// //               product.id = params.id;
// //               product.rating = selectedProduct.rating || 0;
// //               dispatch(updateProductAsync(product));
// //               alert.success("Product Updated");

// //               reset();
// //             } else {
// //               dispatch(createProductAsync(product));
// //               alert.success("Product Created");
// //               reset();
// //             }
// //           })}
// //         >
// //           <div className="space-y-12 bg-white p-12">
// //             <div className="border-b border-gray-900/10 pb-12">
// //               <h2 className="text-base font-semibold leading-7 text-gray-900">
// //                 Add Product
// //               </h2>

// //               <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
// //                 {selectedProduct && selectedProduct.deleted && (
// //                   <h2 className="text-red-500 sm:col-span-6">
// //                     This product is deleted
// //                   </h2>
// //                 )}

// //                 <div className="sm:col-span-6">
// //                   <label
// //                     htmlFor="title"
// //                     className="block text-sm font-medium leading-6 text-gray-900"
// //                   >
// //                     Product Name
// //                   </label>
// //                   <div className="mt-2">
// //                     <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
// //                       <input
// //                         type="text"
// //                         {...register("title", {
// //                           required: "name is required",
// //                         })}
// //                         id="title"
// //                         className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="col-span-full">
// //                   <label
// //                     htmlFor="description"
// //                     className="block text-sm font-medium leading-6 text-gray-900"
// //                   >
// //                     Description
// //                   </label>
// //                   <div className="mt-2">
// //                     <textarea
// //                       id="description"
// //                       {...register("description", {
// //                         required: "description is required",
// //                       })}
// //                       rows={3}
// //                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
// //                       defaultValue={""}
// //                     />
// //                   </div>
// //                   <p className="mt-3 text-sm leading-6 text-gray-600">
// //                     Write a few sentences about product.
// //                   </p>
// //                 </div>

// //                 <div className="col-span-full">
// //                   <label
// //                     htmlFor="brand"
// //                     className="block text-sm font-medium leading-6 text-gray-900"
// //                   >
// //                     Brand
// //                   </label>
// //                   <div className="mt-2">
// //                     <select
// //                       {...register("brand", {
// //                         required: "brand is required",
// //                       })}
// //                     >
// //                       <option value="">--choose brand--</option>
// //                       {brands.map((brand) => (
// //                         <option key={brand.value} value={brand.value}>
// //                           {brand.label}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                 </div>

// //                 <div className="col-span-full">
// //                   <label
// //                     htmlFor="colors"
// //                     className="block text-sm font-medium leading-6 text-gray-900"
// //                   >
// //                     Colors
// //                   </label>
// //                   <div className="mt-2">
// //                     {colors.map((color) => (
// //                       <>
// //                         <input
// //                           type="checkbox"
// //                           {...register("colors", {})}
// //                           key={color.id}
// //                           value={color.id}
// //                         />{" "}
// //                         {color.name}
// //                       </>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 <div className="col-span-full">
// //                   <label
// //                     htmlFor="sizes"
// //                     className="block text-sm font-medium leading-6 text-gray-900"
// //                   >
// //                     Sizes
// //                   </label>
// //                   <div className="mt-2">
// //                     {sizes.map((size) => (
// //                       <>
// //                         <input
// //                           type="checkbox"
// //                           {...register("sizes", {})}
// //                           key={size.id}
// //                           value={size.id}
// //                         />{" "}
// //                         {size.name}
// //                       </>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 <div className="col-span-full">
// //                   <label
// //                     htmlFor="category"
// //                     className="block text-sm font-medium leading-6 text-gray-900"
// //                   >
// //                     Category
// //                   </label>
// //                   <div className="mt-2">
// //                     <select
// //                       {...register("category", {
// //                         required: "category is required",
// //                       })}
// //                     >
// //                       <option value="">--choose category--</option>
// //                       {categories.map((category) => (
// //                         <option key={category.value} value={category.value}>
// //                           {category.label}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                 </div>

// //                 <div className="sm:col-span-2">
// //                   <label
// //                     htmlFor="price"
// //                     className="block text-sm font-medium leading-6 text-gray-900"
// //                   >
// //                     Price
// //                   </label>
// //                   <div className="mt-2">
// //                     <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
// //                       <input
// //                         type="number"
// //                         {...register("price", {
// //                           required: "price is required",
// //                           min: 1,
// //                           max: 10000,
// //                         })}
// //                         id="price"
// //                         className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="sm:col-span-2">
// //                   <label
// //                     htmlFor="discountPercentage"
// //                     className="block text-sm font-medium leading-6 text-gray-900"
// //                   >
// //                     Discount Percentage
// //                   </label>
// //                   <div className="mt-2">
// //                     <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
// //                       <input
// //                         type="number"
// //                         {...register("discountPercentage", {
// //                           required: "discountPercentage is required",
// //                           min: 0,
// //                           max: 100,
// //                         })}
// //                         id="discountPercentage"
// //                         className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="sm:col-span-2">
// //                   <label
// //                     htmlFor="stock"
// //                     className="block text-sm font-medium leading-6 text-gray-900"
// //                   >
// //                     Stock
// //                   </label>
// //                   <div className="mt-2">
// //                     <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
// //                       <input
// //                         type="number"
// //                         {...register("stock", {
// //                           required: "stock is required",
// //                           min: 0,
// //                         })}
// //                         id="stock"
// //                         className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="sm:col-span-6">
// //                   <label
// //                     htmlFor="thumbnail"
// //                     className="block text-sm font-medium leading-6 text-gray-900"
// //                   >
// //                     Thumbnail
// //                   </label>
// //                   <div className="mt-2">
// //                     <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
// //                       <input
// //                         type="text"
// //                         {...register("thumbnail", {
// //                           required: "thumbnail is required",
// //                         })}
// //                         id="thumbnail"
// //                         className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="sm:col-span-6">
// //                   <label
// //                     htmlFor="image1"
// //                     className="block text-sm font-medium leading-6 text-gray-900"
// //                   >
// //                     Image 1
// //                   </label>
// //                   <div className="mt-2">
// //                     <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
// //                       <input
// //                         type="text"
// //                         {...register("image1", {
// //                           required: "image1 is required",
// //                         })}
// //                         id="image1"
// //                         className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="sm:col-span-6">
// //                   <label
// //                     htmlFor="image2"
// //                     className="block text-sm font-medium leading-6 text-gray-900"
// //                   >
// //                     Image 2
// //                   </label>
// //                   <div className="mt-2">
// //                     <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
// //                       <input
// //                         type="text"
// //                         {...register("image2", {
// //                           required: "image is required",
// //                         })}
// //                         id="image2"
// //                         className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="sm:col-span-6">
// //                   <label
// //                     htmlFor="image2"
// //                     className="block text-sm font-medium leading-6 text-gray-900"
// //                   >
// //                     Image 3
// //                   </label>
// //                   <div className="mt-2">
// //                     <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
// //                       <input
// //                         type="text"
// //                         {...register("image3", {
// //                           required: "image is required",
// //                         })}
// //                         id="image3"
// //                         className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <label
// //                   htmlFor="highlight1"
// //                   className="block text-xl font-medium leading-6 text-gray-900"
// //                 >
// //                   Add Highlights
// //                 </label>
// //                 <div className="sm:col-span-6">
// //                   <label
// //                     htmlFor="highlight1"
// //                     className="block text-sm font-medium leading-6 text-gray-900"
// //                   >
// //                     Highlight 1
// //                   </label>
// //                   <div className="mt-2">
// //                     <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
// //                       <input
// //                         type="text"
// //                         {...register("highlight1", {})}
// //                         id="highlight1"
// //                         className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div className="sm:col-span-6">
// //                   <label
// //                     htmlFor="highlight2"
// //                     className="block text-sm font-medium leading-6 text-gray-900"
// //                   >
// //                     Highlight 2
// //                   </label>
// //                   <div className="mt-2">
// //                     <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
// //                       <input
// //                         type="text"
// //                         {...register("highlight2", {})}
// //                         id="highlight2"
// //                         className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div className="sm:col-span-6">
// //                   <label
// //                     htmlFor="highlight3"
// //                     className="block text-sm font-medium leading-6 text-gray-900"
// //                   >
// //                     Highlight 3
// //                   </label>
// //                   <div className="mt-2">
// //                     <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
// //                       <input
// //                         type="text"
// //                         {...register("highlight3", {})}
// //                         id="highlight3"
// //                         className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div className="sm:col-span-6">
// //                   <label
// //                     htmlFor="highlight4"
// //                     className="block text-sm font-medium leading-6 text-gray-900"
// //                   >
// //                     Highlight 4
// //                   </label>
// //                   <div className="mt-2">
// //                     <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
// //                       <input
// //                         type="text"
// //                         {...register("highlight4", {})}
// //                         id="highlight4"
// //                         className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* <div className="border-b border-gray-900/10 pb-12">
// //             <h2 className="text-base font-semibold leading-7 text-gray-900">
// //               Extra{' '}
// //             </h2>

// //             <div className="mt-10 space-y-10">
// //               <fieldset>
// //                 <legend className="text-sm font-semibold leading-6 text-gray-900">
// //                   By Email
// //                 </legend>
// //                 <div className="mt-6 space-y-6">
// //                   <div className="relative flex gap-x-3">
// //                     <div className="flex h-6 items-center">
// //                       <input
// //                         id="comments"
// //                         name="comments"
// //                         type="checkbox"
// //                         className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
// //                       />
// //                     </div>
// //                     <div className="text-sm leading-6">
// //                       <label
// //                         htmlFor="comments"
// //                         className="font-medium text-gray-900"
// //                       >
// //                         Comments
// //                       </label>
// //                       <p className="text-gray-500">
// //                         Get notified when someones posts a comment on a posting.
// //                       </p>
// //                     </div>
// //                   </div>
// //                   <div className="relative flex gap-x-3">
// //                     <div className="flex h-6 items-center">
// //                       <input
// //                         id="candidates"
// //                         name="candidates"
// //                         type="checkbox"
// //                         className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
// //                       />
// //                     </div>
// //                     <div className="text-sm leading-6">
// //                       <label
// //                         htmlFor="candidates"
// //                         className="font-medium text-gray-900"
// //                       >
// //                         Candidates
// //                       </label>
// //                       <p className="text-gray-500">
// //                         Get notified when a candidate applies for a job.
// //                       </p>
// //                     </div>
// //                   </div>
// //                   <div className="relative flex gap-x-3">
// //                     <div className="flex h-6 items-center">
// //                       <input
// //                         id="offers"
// //                         name="offers"
// //                         type="checkbox"
// //                         className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
// //                       />
// //                     </div>
// //                     <div className="text-sm leading-6">
// //                       <label
// //                         htmlFor="offers"
// //                         className="font-medium text-gray-900"
// //                       >
// //                         Offers
// //                       </label>
// //                       <p className="text-gray-500">
// //                         Get notified when a candidate accepts or rejects an
// //                         offer.
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </fieldset>
// //             </div>
// //           </div> */}
// //           </div>

// //           <div className="mt-6 flex items-center justify-end gap-x-6 bg-white py-2 pr-2">
// //             <button
// //               type="button"
// //               className="text-sm font-semibold leading-6 text-gray-900"
// //             >
// //               Cancel
// //             </button>

// //             {selectedProduct && !selectedProduct.deleted && (
// //               <button
// //                 onClick={(e) => {
// //                   e.preventDefault();
// //                   setOpenModal(true);
// //                 }}
// //                 className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
// //               >
// //                 Delete
// //               </button>
// //             )}

// //             <button
// //               type="submit"
// //               className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
// //             >
// //               Save
// //             </button>
// //           </div>
// //         </form>
// //         {selectedProduct && (
// //           <Modal
// //             title={`Delete ${selectedProduct.title}`}
// //             message="Are you sure you want to delete this Product ?"
// //             dangerOption="Delete"
// //             cancelOption="Cancel"
// //             dangerAction={handleDelete}
// //             cancelAction={() => setOpenModal(null)}
// //             showModal={openModal}
// //           ></Modal>
// //         )}
// //       </div>
// //     </>
// //   );
// // }

// // export default ProductForm;




// 'use client';

// import { useDispatch, useSelector } from 'react-redux';
// import {
//   clearSelectedProduct,
//   createProductAsync,
//   fetchProductByIdAsync,
//   selectBrands,
//   selectCategories,
//   selectProductById,
//   updateProductAsync,
// } from '../../product/productSlice';
// import { useForm } from 'react-hook-form';
// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import Modal from '../../common/Modal';
// import { useAlert } from 'react-alert';

// function ProductForm() {
//   const dispatch = useDispatch();
//   const params = useParams();
//   const alert = useAlert();

//   const brands = useSelector(selectBrands);
//   const categories = useSelector(selectCategories);
//   const selectedProduct = useSelector(selectProductById);

//   const [openModal, setOpenModal] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const colors = [
//     { id: 'white', name: 'White' },
//     { id: 'gray', name: 'Gray' },
//     { id: 'black', name: 'Black' },
//   ];

//   const sizes = [
//     'XXS',
//     'XS',
//     'S',
//     'M',
//     'L',
//     'XL',
//     '2XL',
//     '3XL',
//   ].map((s) => ({ id: s.toLowerCase(), name: s }));

//   /* ---------------- effects ---------------- */

//   useEffect(() => {
//     if (params.id) {
//       dispatch(fetchProductByIdAsync(params.id));
//     } else {
//       dispatch(clearSelectedProduct());
//     }
//   }, [params.id, dispatch]);

//   useEffect(() => {
//     if (!selectedProduct || !params.id) return;

//     const p = selectedProduct;
//     setValue('title', p.title);
//     setValue('description', p.description);
//     setValue('price', p.price);
//     setValue('discountPercentage', p.discountPercentage);
//     setValue('stock', p.stock);
//     setValue('thumbnail', p.thumbnail);
//     setValue('image1', p.images?.[0]);
//     setValue('image2', p.images?.[1]);
//     setValue('image3', p.images?.[2]);
//     setValue('brand', p.brand);
//     setValue('category', p.category);
//     setValue('highlight1', p.highlights?.[0]);
//     setValue('highlight2', p.highlights?.[1]);
//     setValue('highlight3', p.highlights?.[2]);
//     setValue('highlight4', p.highlights?.[3]);
//     setValue(
//       'colors',
//       p.colors?.map((c) => c.id)
//     );
//     setValue(
//       'sizes',
//       p.sizes?.map((s) => s.id)
//     );
//   }, [selectedProduct, params.id, setValue]);

//   /* ---------------- submit ---------------- */

//   const onSubmit = (data) => {
//     const product = {
//       ...data,
//       images: [data.image1, data.image2, data.image3, data.thumbnail],
//       highlights: [
//         data.highlight1,
//         data.highlight2,
//         data.highlight3,
//         data.highlight4,
//       ],
//       price: +data.price,
//       stock: +data.stock,
//       discountPercentage: +data.discountPercentage,
//       rating: selectedProduct?.rating || 0,
//       colors: data.colors?.map((id) => colors.find((c) => c.id === id)),
//       sizes: data.sizes?.map((id) => sizes.find((s) => s.id === id)),
//     };

//     delete product.image1;
//     delete product.image2;
//     delete product.image3;

//     if (params.id) {
//       dispatch(updateProductAsync({ ...product, id: params.id }));
//       alert.success('Product updated successfully');
//     } else {
//       dispatch(createProductAsync(product));
//       alert.success('Product created successfully');
//     }

//     reset();
//   };

//   const handleDelete = () => {
//     dispatch(updateProductAsync({ ...selectedProduct, deleted: true }));
//     setOpenModal(false);
//   };

//   /* ---------------- ui helpers ---------------- */

//   const Section = ({ title, children }) => (
//     <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
//       <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
//       {children}
//     </div>
//   );

//   const Input = ({ label, error, ...props }) => (
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         {label}
//       </label>
//       <input
//         {...props}
//         className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
//       />
//       {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
//     </div>
//   );

//   /* ---------------- render ---------------- */

//   return (
//     <div className="max-w-6xl mx-auto px-4 pb-32">
//       {/* Header */}
//       <div className="sticky top-0 z-10 bg-gray-50 py-4 mb-6">
//         <h1 className="text-2xl font-bold text-gray-900">
//           {params.id ? 'Edit Product' : 'Create New Product'}
//         </h1>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//         {/* Basic Info */}
//         <Section title="Basic Information">
//           <Input
//             label="Product Name"
//             {...register('title', { required: 'Required' })}
//             error={errors.title?.message}
//           />

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Description
//             </label>
//             <textarea
//               rows={4}
//               {...register('description', { required: 'Required' })}
//               className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-200"
//             />
//           </div>

//           <div className="grid sm:grid-cols-2 gap-6">
//             <select
//               {...register('brand', { required: true })}
//               className="input"
//             >
//               <option value="">Select Brand</option>
//               {brands.map((b) => (
//                 <option key={b.value} value={b.value}>
//                   {b.label}
//                 </option>
//               ))}
//             </select>

//             <select
//               {...register('category', { required: true })}
//               className="input"
//             >
//               <option value="">Select Category</option>
//               {categories.map((c) => (
//                 <option key={c.value} value={c.value}>
//                   {c.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </Section>

//         {/* Pricing */}
//         <Section title="Pricing & Inventory">
//           <div className="grid sm:grid-cols-3 gap-6">
//             <Input
//               label="Price"
//               type="number"
//               {...register('price', { required: true })}
//             />
//             <Input
//               label="Discount %"
//               type="number"
//               {...register('discountPercentage')}
//             />
//             <Input
//               label="Stock"
//               type="number"
//               {...register('stock', { required: true })}
//             />
//           </div>
//         </Section>

//         {/* Media */}
//         <Section title="Product Images">
//           <div className="grid sm:grid-cols-2 gap-6">
//             <Input label="Thumbnail URL" {...register('thumbnail')} />
//             <Input label="Image 1" {...register('image1')} />
//             <Input label="Image 2" {...register('image2')} />
//             <Input label="Image 3" {...register('image3')} />
//           </div>
//         </Section>

//         {/* Variants */}
//         <Section title="Variants">
//           <div>
//             <p className="text-sm font-medium text-gray-700 mb-2">Colors</p>
//             <div className="flex gap-3 flex-wrap">
//               {colors.map((c) => (
//                 <label
//                   key={c.id}
//                   className="px-4 py-2 rounded-full border cursor-pointer hover:border-indigo-500"
//                 >
//                   <input
//                     type="checkbox"
//                     value={c.id}
//                     {...register('colors')}
//                     className="mr-2"
//                   />
//                   {c.name}
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div>
//             <p className="text-sm font-medium text-gray-700 mb-2">Sizes</p>
//             <div className="flex gap-3 flex-wrap">
//               {sizes.map((s) => (
//                 <label
//                   key={s.id}
//                   className="px-4 py-2 rounded-full border cursor-pointer hover:border-indigo-500"
//                 >
//                   <input
//                     type="checkbox"
//                     value={s.id}
//                     {...register('sizes')}
//                     className="mr-2"
//                   />
//                   {s.name}
//                 </label>
//               ))}
//             </div>
//           </div>
//         </Section>

//         {/* Highlights */}
//         <Section title="Highlights">
//           <div className="grid sm:grid-cols-2 gap-6">
//             <Input label="Highlight 1" {...register('highlight1')} />
//             <Input label="Highlight 2" {...register('highlight2')} />
//             <Input label="Highlight 3" {...register('highlight3')} />
//             <Input label="Highlight 4" {...register('highlight4')} />
//           </div>
//         </Section>

//         {/* Footer */}
//         <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-6 py-4 flex justify-end gap-4">
//           {selectedProduct && !selectedProduct.deleted && (
//             <button
//               type="button"
//               onClick={() => setOpenModal(true)}
//               className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500"
//             >
//               Delete
//             </button>
//           )}

//           <button
//             type="submit"
//             className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500"
//           >
//             Save Product
//           </button>
//         </div>
//       </form>

//       {selectedProduct && (
//         <Modal
//           title={`Delete ${selectedProduct.title}`}
//           message="Are you sure you want to delete this product?"
//           dangerOption="Delete"
//           cancelOption="Cancel"
//           dangerAction={handleDelete}
//           cancelAction={() => setOpenModal(false)}
//           showModal={openModal}
//         />
//       )}
//     </div>
//   );
// }

// export default ProductForm;






'use client';

import { useDispatch, useSelector } from 'react-redux';
import {
  createProductAsync,
  selectBrands,
  selectCategories,
} from '../../product/productSlice';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAlert } from 'react-alert';

function CreateProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      price: '',
      discountPercentage: '0',
      stock: '',
      thumbnail: '',
      brand: '',
      category: '',
      image1: '',
      image2: '',
      image3: '',
      highlight1: '',
      highlight2: '',
      highlight3: '',
      highlight4: '',
      colors: [],
      sizes: [],
    }
  });

  const colors = [
    { id: 'white', name: 'White', hex: '#FFFFFF' },
    { id: 'beige', name: 'Beige', hex: '#F5F5DC' },
    { id: 'gray', name: 'Gray', hex: '#808080' },
    { id: 'black', name: 'Black', hex: '#000000' },
    { id: 'red', name: 'Red', hex: '#EF4444' },
    { id: 'blue', name: 'Blue', hex: '#3B82F6' },
    { id: 'green', name: 'Green', hex: '#10B981' },
    { id: 'yellow', name: 'Yellow', hex: '#F59E0B' },
    { id: 'pink', name: 'Pink', hex: '#EC4899' },
    { id: 'purple', name: 'Purple', hex: '#8B5CF6' },
  ];

  const sizes = [
    'XXS',
    'XS',
    'S',
    'M',
    'L',
    'XL',
    '2XL',
    '3XL',
  ].map((s) => ({ id: s.toLowerCase(), name: s }));

  // Watch thumbnail for preview
  const thumbnailUrl = watch('thumbnail');
  const [previewImage, setPreviewImage] = useState('');

  // Update preview when thumbnail changes
  useState(() => {
    if (thumbnailUrl) {
      setPreviewImage(thumbnailUrl);
    }
  }, [thumbnailUrl]);

  /* ---------------- submit ---------------- */

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Filter out empty/null images
      const imageUrls = [data.image1, data.image2, data.image3]
        .filter(url => url && url.trim() !== '');
      
      // Always include thumbnail if it exists, and add other images
      const allImages = data.thumbnail 
        ? [data.thumbnail, ...imageUrls]
        : imageUrls;
      
      // Filter out empty/null highlights
      const highlights = [
        data.highlight1,
        data.highlight2,
        data.highlight3,
        data.highlight4,
      ].filter(h => h && h.trim() !== '');
      
      // Map colors and sizes, filtering out any invalid entries
      const productColors = Array.isArray(data.colors)
        ? data.colors
            .map((id) => colors.find((c) => c.id === id))
            .filter(c => c != null)
        : [];
      
      const productSizes = Array.isArray(data.sizes)
        ? data.sizes
            .map((id) => sizes.find((s) => s.id === id))
            .filter(s => s != null)
        : [];

      const product = {
        title: data.title,
        description: data.description,
        brand: data.brand,
        category: data.category,
        price: +data.price,
        stock: +data.stock,
        discountPercentage: +data.discountPercentage || 0,
        thumbnail: data.thumbnail,
        images: allImages.length > 0 ? allImages : [data.thumbnail],
        highlights: highlights,
        rating: 0,
        colors: productColors,
        sizes: productSizes,
      };

      await dispatch(createProductAsync(product)).unwrap();
      alert.success('Product created successfully');
      reset();
      navigate('/admin');
    } catch (error) {
      alert.error(error?.message || 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate('/admin');
      }
    } else {
      navigate('/admin');
    }
  };

  /* ---------------- ui helpers ---------------- */

  const Section = ({ title, subtitle, children }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {children}
    </div>
  );

  const Input = ({ label, error, helpText, required, ...props }) => (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        className={`w-full rounded-lg border ${
          error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
        } px-4 py-2.5 text-sm transition-colors focus:ring-2 focus:outline-none`}
      />
      {helpText && !error && <p className="text-xs text-gray-500">{helpText}</p>}
      {error && <p className="text-xs text-red-600 flex items-center gap-1">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </p>}
    </div>
  );

  const Select = ({ label, error, required, children, ...props }) => (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        {...props}
        className={`w-full rounded-lg border ${
          error ? 'border-red-300' : 'border-gray-300'
        } px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-colors`}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-600 flex items-center gap-1">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </p>}
    </div>
  );

  const Textarea = ({ label, error, required, helpText, ...props }) => (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        {...props}
        className={`w-full rounded-lg border ${
          error ? 'border-red-300' : 'border-gray-300'
        } px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-colors resize-none`}
      />
      {helpText && !error && <p className="text-xs text-gray-500">{helpText}</p>}
      {error && <p className="text-xs text-red-600 flex items-center gap-1">
        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </p>}
    </div>
  );

  /* ---------------- render ---------------- */

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                type="button"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create New Product</h1>
                <p className="text-sm text-gray-500 mt-0.5">Add a new product to your inventory</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors text-sm"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                form="product-form"
                disabled={isSubmitting}
                className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-medium transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Product
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <form id="product-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Section title="Basic Information" subtitle="Essential product details">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Input
                  label="Product Name"
                  required
                  {...register('title', { 
                    required: 'Product name is required',
                    minLength: { value: 3, message: 'Name must be at least 3 characters' }
                  })}
                  error={errors.title?.message}
                  placeholder="e.g., Premium Cotton T-Shirt"
                />

                <Textarea
                  label="Description"
                  required
                  rows={5}
                  {...register('description', { 
                    required: 'Description is required',
                    minLength: { value: 10, message: 'Description must be at least 10 characters' }
                  })}
                  error={errors.description?.message}
                  helpText="Provide a detailed description of the product"
                  placeholder="Describe the product features, materials, and benefits..."
                />

                <div className="grid sm:grid-cols-2 gap-6">
                  <Select
                    label="Brand"
                    required
                    {...register('brand', { required: 'Brand is required' })}
                    error={errors.brand?.message}
                  >
                    <option value="">Select a brand</option>
                    {brands.map((b) => (
                      <option key={b.value} value={b.value}>
                        {b.label}
                      </option>
                    ))}
                  </Select>

                  <Select
                    label="Category"
                    required
                    {...register('category', { required: 'Category is required' })}
                    error={errors.category?.message}
                  >
                    <option value="">Select a category</option>
                    {categories.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* Thumbnail Preview */}
              <div className="lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Preview
                </label>
                <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden">
                  {previewImage ? (
                    <img 
                      src={previewImage} 
                      alt="Product preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.querySelector('.placeholder-content').style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={`placeholder-content flex flex-col items-center justify-center p-6 text-center ${previewImage ? 'hidden' : ''}`}>
                    <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xs text-gray-500">Enter thumbnail URL to see preview</p>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* Pricing & Inventory */}
          <Section title="Pricing & Inventory" subtitle="Set pricing and stock levels">
            <div className="grid sm:grid-cols-3 gap-6">
              <Input
                label="Price"
                type="number"
                required
                step="0.01"
                min="0"
                {...register('price', { 
                  required: 'Price is required',
                  min: { value: 0.01, message: 'Price must be greater than 0' }
                })}
                error={errors.price?.message}
                placeholder="0.00"
                helpText="Base price in your currency"
              />
              
              <Input
                label="Discount Percentage"
                type="number"
                step="1"
                min="0"
                max="99"
                {...register('discountPercentage', {
                  min: { value: 0, message: 'Discount cannot be negative' },
                  max: { value: 99, message: 'Discount cannot exceed 99%' }
                })}
                error={errors.discountPercentage?.message}
                placeholder="0"
                helpText="0-99%"
              />
              
              <Input
                label="Stock Quantity"
                type="number"
                required
                min="0"
                {...register('stock', { 
                  required: 'Stock quantity is required',
                  min: { value: 0, message: 'Stock cannot be negative' }
                })}
                error={errors.stock?.message}
                placeholder="0"
                helpText="Available quantity"
              />
            </div>
          </Section>

          {/* Product Images */}
          <Section title="Product Images" subtitle="Add product photos (URL links)">
            <div className="grid sm:grid-cols-2 gap-6">
              <Input 
                label="Thumbnail Image" 
                required
                {...register('thumbnail', { required: 'Thumbnail is required' })}
                error={errors.thumbnail?.message}
                placeholder="https://example.com/image.jpg"
                helpText="Main product image (required)"
              />
              <Input 
                label="Image 1" 
                {...register('image1')}
                placeholder="https://example.com/image1.jpg"
                helpText="Additional product view"
              />
              <Input 
                label="Image 2" 
                {...register('image2')}
                placeholder="https://example.com/image2.jpg"
                helpText="Additional product view"
              />
              <Input 
                label="Image 3" 
                {...register('image3')}
                placeholder="https://example.com/image3.jpg"
                helpText="Additional product view"
              />
            </div>
          </Section>

          {/* Product Variants */}
          <Section title="Product Variants" subtitle="Select available colors and sizes">
            {/* Colors */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Available Colors</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {colors.map((c) => (
                  <label
                    key={c.id}
                    className="relative flex items-center gap-3 px-4 py-3 rounded-lg border-2 cursor-pointer transition-all hover:border-indigo-300 hover:bg-indigo-50 has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50"
                  >
                    <input
                      type="checkbox"
                      value={c.id}
                      {...register('colors')}
                      className="sr-only"
                    />
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="text-sm font-medium text-gray-700">{c.name}</span>
                    <svg className="absolute top-2 right-2 w-5 h-5 text-indigo-600 opacity-0 has-[:checked]:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </label>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Available Sizes</p>
              <div className="flex flex-wrap gap-3">
                {sizes.map((s) => (
                  <label
                    key={s.id}
                    className="relative px-6 py-2.5 rounded-lg border-2 cursor-pointer transition-all hover:border-indigo-300 hover:bg-indigo-50 has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50 has-[:checked]:font-semibold min-w-[80px] text-center"
                  >
                    <input
                      type="checkbox"
                      value={s.id}
                      {...register('sizes')}
                      className="sr-only"
                    />
                    <span className="text-sm text-gray-700">{s.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </Section>

          {/* Product Highlights */}
          <Section title="Product Highlights" subtitle="Key features and benefits (optional)">
            <div className="grid sm:grid-cols-2 gap-6">
              <Input 
                label="Highlight 1" 
                {...register('highlight1')}
                placeholder="e.g., 100% organic cotton"
              />
              <Input 
                label="Highlight 2" 
                {...register('highlight2')}
                placeholder="e.g., Machine washable"
              />
              <Input 
                label="Highlight 3" 
                {...register('highlight3')}
                placeholder="e.g., Eco-friendly dyes"
              />
              <Input 
                label="Highlight 4" 
                {...register('highlight4')}
                placeholder="e.g., Free shipping"
              />
            </div>
          </Section>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;