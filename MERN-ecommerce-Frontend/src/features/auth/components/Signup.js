import React, { useState } from "react";
import { FaUserCircle, FaLock, FaFileImage } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { createUserAsync } from "../authSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Signup() {
  const [formValue, setFormValue] = useState(initialState);
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const user = useSelector((state) => state.auth.loggedInUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { password, confirmPassword } = formValue;

    if (password !== confirmPassword) {
      // Handle password mismatch
      return;
    }

    const formData = new FormData();

    // Append JSON data
    formData.append("firstName", formValue.firstName);
    formData.append("lastName", formValue.lastName);
    formData.append("email", formValue.email);
    formData.append("password", formValue.password);
    formData.append("confirmPassword", formValue.confirmPassword);

    // Append the image file
    formData.append("imageFile", formValue.imageFile);

    dispatch(createUserAsync({ formData, config, Navigate }));
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {user && <Navigate to="/" replace={true} />}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-20"
          src="https://res.cloudinary.com/dl9paroz9/image/upload/v1696847749/download_mnox7s.webp"
          alt="StyleVista"
        />
        <h1 className="text-center font-bold text-2xl tracking-tight">
          <span className="bg-gradient-to-r text-transparent from-yellow-500 via-orange-500 to-red-500 bg-clip-text">
            StyleVista
          </span>
        </h1>
        <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create a New Account
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          style={{ width: "100%" }}
          noValidate
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First Name
            </label>
            <div className="mt-2">
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formValue.firstName}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter First Name"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last Name
            </label>
            <div className="mt-2">
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formValue.lastName}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter Last Name"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                name="email"
                value={formValue.email}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter Email"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type={show ? "text" : "password"}
                name="password"
                value={formValue.password}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter Password"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={formValue.confirmPassword}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter Confirm Password"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Image
            </label>
            <div className="mt-2">
              <label
                htmlFor="imageInput"
                // className="relative border border-dashed border-gray-300 rounded-md p-2 cursor-pointer hover:bg-gray-100 text-center"
              >
                <div
                  // className="flex  justify-center align-middle relative border border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 text-center"
                  className={`flex  justify-center align-middle relative border border-dashed ${
                    formValue.imageFile
                      ? "border-green-500 bg-green-100"
                      : "border-gray-300"
                  } rounded-md cursor-pointer hover:bg-gray-100 text-center`}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span className="text-sm text-gray-600 font-semibold">
                    {formValue.imageFile ? "Image Uploaded" : "Upload Image"}
                  </span>
                  <span className="w-8 h-8 text-gray-600 ml-2 mt-3">
                    <FaFileImage />
                  </span>
                </div>
                <input
                  id="imageInput"
                  type="file"
                  name="image"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFormValue({ ...formValue, imageFile: file });
                  }}
                />
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-7 text-center text-sm text-gray-500">
          Already a Member?{" "}
          <ReactRouterLink
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Log In
          </ReactRouterLink>
        </p>
      </div>
    </div>
  );
}
