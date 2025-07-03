import React, { useState } from 'react'
import axios from "axios";
import { useDispatch , useSelector} from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';
import { BASE_URL } from '../utils/constants';


const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);

     const dispatch = useDispatch();
     const navigate = useNavigate();

    const user = useSelector((store) => store.user);
    if(user){
        return navigate("/");
    }


    const handleLogin = async ()=>{
        try{
            const res = await axios.post( BASE_URL+"/login", 
                {
                    emailId,
                    password
                },
                {withCredentials:true}
            )

            dispatch(addUser(res.data));

            toast.success(`🎉 Login successful! Welcome ${res.data.firstName}`);

            return navigate("/");

        }catch(err){
         
          toast.error(err?.response?.data || "Something went wrong")
        }
    }

    
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      
      toast.success(`🎉 Signup successful! Welcome ${res.data.data.firstName}`);

      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };


  return (
    <div className="hero mt-12 bg-base-200 mb-10">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        {/* Left side content */}
        <div className="text-center lg:text-left max-w-md">
          <h1 className="text-5xl font-bold"> {isLoginForm ? "Login Now !" : "Sign Up Now !"}</h1>
          <p className="text-[20px] text-base-content/80 font-medium leading-relaxed max-w-md mt-4">
            🔥Tired of coding alone? <span className="text-primary font-semibold">Find your perfect programming match 💻❤️</span> today — <span className=" font-semibold text-red-500 ">CodeConnect makes it easy.</span>
        </p>
        </div>

        {/* Login card */}
        <div className="card bg-base-100 w-[420px] shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset p-6">
               {!isLoginForm && (
              <>
                <label className="label text-[17px] text-black">First Name</label>
              <input 
                type="text" 
                value={firstName}
                className="input input-bordered w-full" 
                placeholder="FirstName"
                onChange={(e)=>setFirstName(e.target.value)} 
                />
                <label className="label text-[17px] text-black">Last Name</label>
              <input 
                type="text" 
                value={lastName}
                className="input input-bordered w-full" 
                placeholder="LastName"
                onChange={(e)=>setLastName(e.target.value)} 
                />
              </>
            )}
              <label className="label text-[17px] text-black">Email</label>
              <input 
                type="email" 
                value={emailId}
                className="input input-bordered w-full" 
                placeholder="Email"
                onChange={(e)=>setEmailId(e.target.value)} 
                />

              <label className="label text-[17px] mt-4 text-black">Password</label>
              <input 
                type="password" 
                value={password}
                className="input input-bordered w-full" 
                placeholder="Password"
                onChange={(e)=>setPassword(e.target.value)} 
                 />

              <button className="btn btn-primary mt-6 w-full text-lg "  onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm ? "Login" : "Sign Up"}</button>
            </fieldset>

              <p
            className="m-auto cursor-pointer py-2 text-[17px] underline  hover:text-primary-focus"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
