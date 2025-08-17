import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constants';
import toast from 'react-hot-toast';

const Premium = () => {

 const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        {
          membershipType: type,
        },
        { withCredentials: true }
      );

      //opening of razorpay dialog box 
      const { amount, keyId, currency, notes, orderId } = order.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "CodeConnect",
        description: "Connect to other developers",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
          contact: "9999999999",
        },
        theme: {
          color: '#F37254'
        },
        handler: function (response) {
          toast.success("Payment successful! Premium activated.");
        }
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Payment failed. Please try again.");
    }
  }

  return (
    <div className='flex items-center justify-center my-25 bg-base-200 space-x-10'>
       <div className="card w-100 bg-base-100 shadow-2xl">
  <div className="card-body">
    <span className="badge badge-md bg-gray-300">Most Popular</span>
    <div className="flex justify-between">
      <h2 className="text-3xl font-bold"> Silver Premium</h2>
      <span className="text-xl">$29/mo</span>
    </div>
    <ul className="mt-6 flex flex-col gap-2 text-md">
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>Access to Chat Feature</span>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>Send up to 100 requests per day</span>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>Valid for 3 months</span>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>Includes a Blue Verification Badge</span>
      </li>
      
    </ul>
    <div className="mt-6">
      <button  onClick={() => handleBuyClick("silver")} className="btn btn-primary btn-block text-lg">Subscribe</button>
    </div>
  </div>
       </div>

       <div className="card w-100 bg-base-100 shadow-2xl">
  <div className="card-body">
    <span className="badge badge-md badge-warning">Most Popular</span>
    <div className="flex justify-between">
      <h2 className="text-3xl font-bold">Gold Premium</h2>
      <span className="text-xl">$49/mo</span>
    </div>
    <ul className="mt-6 flex flex-col gap-2 text-md">
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>Access to Chat Feature</span>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>Send up to 200 requests per day</span>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>Valid for 6 months</span>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>Includes a Blue Verification Badge</span>
      </li>
      
    </ul>
    <div className="mt-6">
      <button  onClick={() => handleBuyClick("gold")} className="btn btn-primary btn-block text-lg">Subscribe</button>
    </div>
  </div>
       </div>
    </div>
    
  )
}

export default Premium