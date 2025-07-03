import React from 'react'
import { LucideFlame } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import axios from 'axios';
import toast from 'react-hot-toast';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async()=>{
    try{
        await axios.post(BASE_URL+"/logout", {} , {withCredentials:true})
        dispatch(removeUser());
        toast.success("You've been logged out!")
        return navigate('/login')
    }
    catch(err){
        toast.error(err?.response?.data || "Something went wrong")
    }
  }


  return (

    <div className="navbar bg-primary text-white shadow-sm sticky top-0 z-50">
      
      <div className="flex-1">
        <div className='flex items-center '>
          <LucideFlame className='w-10 h-8' />
          <Link to="/"><h1 className="font-semibold text-2xl">CodeConnect</h1></Link>
        </div>
      </div>

      {user && (
        <div className='flex gap-3 items-center'>
          <div className="form-control text-lg "> {user.firstName} {user.lastName}</div>
          <div className="dropdown dropdown-end mx-10">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-12 h-10 rounded-full">
                <img
                  alt="User Photo"
                  src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-m dropdown-content bg-secondary-content rounded-box z-1 mt-3 w-60 p-2 shadow text-black ">
              <li>
                <Link to="/profile">My Profile</Link>
              </li>
              <li><Link to="/connections">My Connections</Link></li>
              <li><Link to="/requests">Requests Received</Link></li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}

    </div>
  )
}

export default Navbar