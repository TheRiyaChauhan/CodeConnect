import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';

const Body = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      const status = err.response?.status;

      if (status === 401) {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      } else {
        toast.error(err.response?.data?.message || "Something went wrong.");
        console.error("Fetch user error:", err);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar />

       <Toaster
          position="bottom-right"
  toastOptions={{
    // 👇 Default style for all toasts
    style: {
      fontSize: '18px',
      padding: '16px 20px',
      borderRadius: '12px',
      width: '400px',
      maxWidth: '90vw',
      color: '#fff',
    },

    // ✅ Success (green)
    success: {
      style: {
        background: '#008000', // Tailwind green-500
      },
      iconTheme: {
        primary: '#166534',    // green-800
        secondary: '#bbf7d0',  // green-200
      },
    },

    // ❌ Error (red)
    error: {
      style: {
        background: '#ef4444', // Tailwind red-500
      },
      iconTheme: {
        primary: '#7f1d1d',    // red-800
        secondary: '#fecaca',  // red-200
      },
    },
       }}
       />

      <div className='flex-grow' >
        <Outlet />
      </div>

        <Footer />
    </div>
  )
}

export default Body;