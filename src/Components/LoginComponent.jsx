import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/login', values);
        localStorage.setItem('token', response.data.token);
        if (values.rememberMe) {
          localStorage.setItem('rememberMe', true);
        }
        navigate('/homepage');
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps('email')}
              className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
            ) : null}
          </div>
          <div className="relative mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type={passwordVisible ? 'text' : 'password'}
              {...formik.getFieldProps('password')}
              className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex cursor-pointer"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? '🙈' : '👁'}
            </button>
            {formik.touched.password && formik.errors.password ? (
              <p className="mt-2 text-sm text-red-600">{formik.errors.password}</p>
            ) : null}
          </div>
          <div className="flex items-center mb-6">
            <input
              id="rememberMe"
              type="checkbox"
              {...formik.getFieldProps('rememberMe')}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-900">Remember me</label>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
          <div className="mt-4 text-sm text-center">
            <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-700">Forgot your password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
