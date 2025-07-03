import React, { useState } from 'react'
import UserCard from './UserCard';
import { ViewConnection } from './ViewConnection';

const ConnectionCard = ({user}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
   <div className="card bg-base-100 w-65 h-[45vh] shadow-2xl">
  {/* Circular Image */}
  <figure className="pt-6 px-6 flex justify-center">
    <img
      src={user.photoUrl}
      alt="User"
      className="rounded-xl object-cover h-40 "
    />
  </figure>

  {/* Name + Buttons */}
  <div className="card-body items-center text-center pt-4 pb-6 space-y-3">
    <h2 className="text-xl font-semibold text-gray-800">{user.firstName} {user.lastName}</h2>

    <div className="flex gap-4">
      <button className="btn btn-outline btn-md px-5 bg-indigo-200 "  onClick={() => setIsModalOpen(true)}>View Profile</button>
      <button className="btn btn-primary btn-md px-5">Chat</button>
    </div>
  </div>
</div>

{/* //modal */}

{isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"  onClick={() => setIsModalOpen(false)} >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            
            <ViewConnection user={user} />
          </div>
        </div>
)}
</>
  )
}

export default ConnectionCard