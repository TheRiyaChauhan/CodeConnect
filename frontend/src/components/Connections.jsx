import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addConnections } from '../utils/connectionSlice';

import toast from 'react-hot-toast';
import ConnectionCard from './ConnectionCard';


const Connections = () => {

  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
     
       toast.error(err?.response?.data || "Something went wrong!")
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1> No Connections Found</h1>;

  return (
  <div className="mt-8 flex flex-col items-center bg-base-200 space-y-10">

  {/* Stats Card */}
  <div className="stats shadow-2xl">
    <div className="stat flex items-center gap-4">
      <div className="text-2xl font-semibold">Connections</div>
      <div className="stat-value">{connections.length}</div>
    </div>
  </div>

  {/* Cards Wrapper */}
  <div className="flex flex-wrap justify-center gap-10 max-w-6xl">
    {connections.map((connection) => (
      <ConnectionCard key={connection._id} user={connection} />
    ))}
  </div>
</div>

  )
}

export default Connections