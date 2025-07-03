import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import toast from 'react-hot-toast';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store)=>store.feed)
  const dispatch = useDispatch();

  const getFeed = async()=>{
    
    try{
      const res = await axios.get(BASE_URL+"/feed" , {withCredentials:true})
      dispatch(addFeed(res?.data?.data))
    }
    catch(err){
      console.log(err)
      toast.error(err?.response?.data || "Something went wrong!")
    }
  }

  

  useEffect(()=>{
    getFeed();
  },[])
    if (!feed) return;

   if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;

  return feed && (
      <div className='flex justify-center items-center'>
        <UserCard user={feed[0]}/>
      </div>
  )
};

export default Feed;