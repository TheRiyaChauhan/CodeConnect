import React from 'react'
import { LucideFlame} from 'lucide-react'

const Navbar = () => {
  return (
   
<div className="navbar bg-primary text-white shadow-sm">
  <div className="flex-1">
    <div className='flex items-center '>
        <LucideFlame className='w-10 h-8'/>
        <h1 className="font-semibold text-2xl">CodeConnect</h1>
    </div>
  </div>

  <div>
    
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-12 h-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.freepik.com/premium-vector/software-developer-vector-illustration-communication-technology-cyber-security_1249867-5467.jpg?semt=ais_hybrid&w=740" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-m dropdown-content bg-secondary-content rounded-box z-1 mt-3 w-60 p-2 shadow text-black ">
        <li>
          <a >Profile</a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>

</div>
  )
}

export default Navbar