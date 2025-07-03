import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addRequests, removeRequest } from '../utils/requestSlice';
import toast from 'react-hot-toast';
import RequestCard from './RequestCard';

const Requests = () => {

  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {
        toast.error(err?.response?.data || "Something went wrong!")
    }
  };

   const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      toast.success("Request " + status + " successfully!");
      dispatch(removeRequest(_id));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  return (
    <div className="mt-8 flex flex-col items-center bg-base-200 space-y-10">

  {/* Stats Card */}
  <div className="stats shadow-2xl">
    <div className="stat flex items-center gap-4">
      <div className="text-2xl font-semibold">Connection Requests Received</div>
      <div className="stat-value">{requests.length}</div>
    </div>
  </div>

  {/* Cards Wrapper */}
  <div className="flex flex-wrap justify-center gap-10 max-w-6xl">
    {requests.map((request) => {
         const { _id, firstName, lastName, photoUrl, age, gender, about,skills } = request.fromUserId;
         return <RequestCard key={request._id} request={{ _id, firstName, lastName, photoUrl, age, gender, about ,skills }} reviewRequest={reviewRequest} />
    })}
  </div>
</div>
  )
}

export default Requests