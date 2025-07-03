import React, { useEffect, useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import toast from 'react-hot-toast';
import PreviewProfile from './PreviewProfile';

const EditProfile = ({user}) => {
  if (!user) return <div>Loading...</div>;

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName  || '');
  const [emailId, setEmailId] = useState(user?.emailId || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl|| '');
  const [age, setAge] = useState(user?.age || '' );
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");

  const dispatch = useDispatch();

//   skills
  const [skills, setSkills] = useState(user?.skills || [])
  const [newSkill, setNewSkill] = useState('')

  const addSkill = () =>{
    const skill = newSkill.trim();
    if(skills && !skills.includes(skill)){
        setSkills([...skills,skill])
    }
    setNewSkill('')
  }

  const removeSkill = (skillToRemove)=>{
        setSkills(skills.filter(s => s !== skillToRemove))
  }

 const saveProfile = async()=>{
    try{
        const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          skills
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      toast.success("Profile Edited Successfully!!")
    }catch(err){
        toast.error(err?.response?.data || "Something went wrong")
    }
 }

  return (
    <div className="  flex  items-start pt-4 mb-4 mx-auto justify-center gap-10">

        <div className="card bg-base-100 w-[630px] shadow-2xl ">
            <h1 className='text-[28px] font-[500] text-center mt-2'>Edit Your Profile</h1>
                <div className="card-body ">
                    <fieldset className="fieldset space-y-2">
                    {/* names */}
                    <div className='grid grid-cols-2 gap-3'>

                    <div className='flex gap-2'>
                        <label className="label text-[17px] text-black">FirstName</label>
                    <input 
                        type="text" 
                        value={firstName}
                        className="input input-bordered w-full" 
                        placeholder={firstName}
                        onChange={(e)=>setFirstName(e.target.value)} 
                        />
                    </div>

                    <div className='flex gap-2'>
                        <label className="label text-[17px] text-black">LastName</label>
                    <input 
                        type="text" 
                        value={lastName}
                        className="input input-bordered w-full" 
                        placeholder={lastName}
                        onChange={(e)=>setLastName(e.target.value)} 
                        />
                    </div>

                    </div>

                    {/* age gender */}

                    <div className='grid grid-cols-2 gap-3' >

                    <div className='flex gap-2'>
                        <label className="label text-[17px] text-black">Age ( yrs )</label>
                    <input 
                        type="text" 
                        value={age}
                        className="input input-bordered w-full" 
                        placeholder={age}
                        onChange={(e)=>setAge(e.target.value)} 
                        />
                    </div>

                    <div className='flex gap-6'>
                        <label className="label text-[17px] text-black">Gender</label>
                    <input 
                        type="text" 
                        value={gender}
                        className="input input-bordered w-full" 
                        placeholder={gender}
                        onChange={(e)=>setGender(e.target.value)} 
                        />
                    </div>

                    </div>

                    <div>
                        <label className="label text-[17px] text-black">Email</label>
                        <input 
                            type="email" 
                            value={emailId}
                            className="input input-bordered w-full" 
                            placeholder="{emailId}"
                            onChange={(e)=>setEmailId(e.target.value)} 
                            />
                    </div>
                    
                    {/* About */}
                    <div>
                        <label className="label text-[17px] text-black">About</label>
                    <input 
                        type="text" 
                        value={about}
                        className="input input-bordered w-full" 
                        placeholder={about}
                        onChange={(e)=>setAbout(e.target.value)} 
                        />

                    </div>

                    {/* photo */}
                    <div>
                        <label className="label text-[17px] text-black">Photo Url</label>
                    <input 
                        type="text" 
                        value={photoUrl}
                        className="input input-bordered w-full" 
                        placeholder={photoUrl}
                        onChange={(e)=>setPhotoUrl(e.target.value)} 
                        />
                    </div>


                    {/* //Skills  */}

                    <label className="label text-[17px] text-black">Skills</label>
                    <div className="flex space-x-2">
                    <input
                    type="text"
                    value={newSkill}
                    placeholder="Add a skill"
                    onChange={e => setNewSkill(e.target.value)}
                    className="input input-bordered flex-1"
                    onKeyDown={e => e.key === 'Enter' && addSkill()}
                    />
                    <button
                    type="button"
                    onClick={addSkill}
                    className="btn btn-primary"
                    >
                    Add
                    </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                    <span
                        key={skill}
                        className="badge badge-outline badge-lg flex items-center space-x-1"
                    >
                        <span>{skill}</span>
                        <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-base-content/50 hover:text-base-content"
                        >
                        ×
                        </button>
                    </span>
                    ))}
                    </div>

                    <button className="btn btn-primary mt-2 w-full text-lg " onClick={saveProfile}>Save Changes</button>

                    </fieldset>
                </div>
        </div>

        <div className='space-y-2 mt-2'>
        <h1 className='text-center text-[30px] font-semibold'>Profile Preview</h1>
        <PreviewProfile user={user}/>
        </div>
       
    </div>
 
  )
}

export default EditProfile