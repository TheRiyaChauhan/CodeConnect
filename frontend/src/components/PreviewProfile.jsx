import React from 'react'

const PreviewProfile = ({user}) => {
   return (
    <div className="card bg-base-100 w-85  rounded-xl overflow-hidden shadow-2xl my-4 h-[75vh]">
      {/* Picture */}
      <figure className="h-54 overflow-hidden px-5 pt-5 ">
        <img
          src={user.photoUrl}
          alt={`${user.firstName} ${user.lastName}`}
          className="object-fill w-full h-full rounded-xl"
        />
      </figure>

      <div className="card-body px-6 py-2 text-center space-y-2">
        {/* Name */}
        <h2 className="font-semibold text-[28px] text-center">
          {user.firstName} {user.lastName}
        </h2>

        {/* Age & Gender */}
        <div className="flex  space-x-2 text-lg text-black justify-center">
          <span>{user.age} yrs</span>
          <span>|</span>
          <span className="capitalize">{user.gender}</span>
        </div>

        {/* About */}
        <p className="text-base-content/80 text-[15px] leading-relaxed">
          "{user.about}"
        </p>

        {/* Skills as badges */}
        <div className="flex flex-wrap gap-2 justify-center items-center ">
          {user.skills.map((skill) => (
            <span
              key={skill}
              className="badge badge-outline badge-lg text-indigo-800 bg-indigo-100"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="card-actions justify-between pt-4 mb-3">
          <button className="btn btn-error btn-m flex-1 text-[17px] ">
            Ignored
          </button>
          <button className="btn btn-success btn-m flex-1 text-[17px] text-green-950">
            Interested
          </button>
        </div>
      </div>
    </div>
  );
}

export default PreviewProfile