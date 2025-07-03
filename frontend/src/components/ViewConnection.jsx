import React from 'react'

export const ViewConnection = ({user}) => {
  return (
    <div className="card bg-base-100 w-85  rounded-xl overflow-hidden shadow-2xl my-4">
      {/* Picture */}
      <figure className="h-54 overflow-hidden  ">
        <img
          src={user.photoUrl}
          alt={`${user?.firstName} ${user.lastName}`}
          className="object-fill w-full h-full "
        />
      </figure>

      <div className="card-body px-6 py-2 text-center space-y-2">
        {/* Name */}
        <h2 className="font-semibold text-[28px] text-center">
          {user.firstName} {user.lastName}
        </h2>

        {/* Age & Gender */}
        <div className="flex  space-x-2 text-lg text-black justify-center">
          <span>{user?.age} yrs</span>
          <span>|</span>
          <span className="capitalize">{user.gender}</span>
        </div>

        {/* About */}
        <p className="text-base-content/80 text-[15px] leading-relaxed">
          "{user.about}"
        </p>

        {/* Skills as badges */}
        <div className="flex flex-wrap gap-2 justify-center items-center mb-5 ">
          {user.skills?.map((skill) => (
            <span
              key={skill}
              className="badge badge-outline badge-lg text-indigo-800 bg-indigo-100"
            >
              {skill}
            </span>
          ))}
        </div>

        
        
      </div>
    </div>
  );
}
