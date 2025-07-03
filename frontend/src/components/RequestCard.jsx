import React, { useState } from 'react'
import { ViewConnection } from './ViewConnection';

const RequestCard = ({request , reviewRequest}) => {
   const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = request;

  const [isModalOpen, setIsModalOpen] = useState(false);
 
   return (
     <>
    <div className="card bg-base-100 w-65 h-[45vh] shadow-2xl">
   
   <figure className="pt-6 px-6 flex justify-center " >
    <div className="relative group cursor-pointer" onClick={() => setIsModalOpen(true)}>
         <img
       src={photoUrl}
       alt="User"
       className="rounded-xl object-cover h-38 tooltip tooltip-info cursor-pointer"
        data-tip="hello"
       
        
     />

     <div className="absolute inset-0 bg-black/10 backdrop-blur-sm rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <span className="text-white text-sm font-medium">Click to view profile</span>
    </div>
    </div>
 
   </figure>
 
   {/* Name + Buttons */}
   <div className="card-body items-center text-center pt-4 pb-6 space-y-3">
     <h2 className="text-xl font-semibold text-gray-800">{firstName} {lastName}</h2>

  <div className="card-actions justify-between pt-3 mb-3 flex flex-row">
          <button className="btn btn-error btn-m flex-1 text-[17px] " onClick={() => reviewRequest( 'rejected' , _id)}>
            Reject
          </button>
          <button className="btn btn-success btn-m flex-1 text-[17px] text-green-950" onClick={() => reviewRequest( 'accepted' , _id)}>
            Accept
          </button>
        </div>
   </div>
 </div>
 
 {/* //modal */}
 
 {isModalOpen && (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"  onClick={() => setIsModalOpen(false)} >
           <div className="relative" onClick={(e) => e.stopPropagation()}>
             
             <ViewConnection user={request} />
           </div>
         </div>
 )}
 </>
   )
 }
 


export default RequestCard