import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      name: "",
      profilePicture: null,
      terms: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
      terms: Yup.bool().oneOf(
        [true],
        "You must accept the terms and conditions"
      ),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("name", values.name);
        if (values.profilePicture) {
          formData.append("profilePicture", values.profilePicture);
        }
        await axios.post("/api/signup", formData);
        navigate("/login");
      } catch (error) {
        console.error("Signup failed:", error);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Sign Up for MelodyVerse</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps("email")}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
            ) : null}
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type={passwordVisible ? "text" : "password"}
              {...formik.getFieldProps("password")}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : ""
              }`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? '🙈' : '👁'}
            </button>
            {formik.touched.password && formik.errors.password ? (
              <p className="mt-2 text-sm text-red-600">{formik.errors.password}</p>
            ) : null}
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="passwordConfirmation"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="passwordConfirmation"
              type={passwordConfirmationVisible ? "text" : "password"}
              {...formik.getFieldProps("passwordConfirmation")}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                formik.touched.passwordConfirmation &&
                formik.errors.passwordConfirmation
                  ? "border-red-500"
                  : ""
              }`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex cursor-pointer"
              onClick={() => setPasswordConfirmationVisible(!passwordConfirmationVisible)}
            >
              {passwordConfirmationVisible ? '🙈' : '👁'}
            </button>
            {formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation ? (
              <p className="mt-2 text-sm text-red-600">
                {formik.errors.passwordConfirmation}
              </p>
            ) : null}
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              {...formik.getFieldProps("name")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="profilePicture"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Picture
            </label>
            <input
              id="profilePicture"
              type="file"
              onChange={(event) =>
                formik.setFieldValue(
                  "profilePicture",
                  event.currentTarget.files[0]
                )
              }
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:text-sm file:font-semibold file:bg-gray-100 hover:file:bg-gray-200"
            />
          </div>
          <div className="mb-6">
            <input
              id="terms"
              type="checkbox"
              {...formik.getFieldProps("terms")}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-900">
              I agree to the{" "}
              <Link
                to="/terms"
                className="text-indigo-600 hover:text-indigo-700"
              >
                terms and conditions
              </Link>
            </label>
            {formik.touched.terms && formik.errors.terms ? (
              <p className="mt-2 text-sm text-red-600">{formik.errors.terms}</p>
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
          <div className="mt-4 text-sm">
            <Link to="/login" className="text-indigo-600 hover:text-indigo-700">
              Already have an account? Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
