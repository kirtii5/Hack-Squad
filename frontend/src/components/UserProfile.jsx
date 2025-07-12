import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const [skillsOffered, setSkillsOffered] = useState(["Javascript", "CSS", "HTML"]);
  const [skillsWanted, setSkillsWanted] = useState(["java", "Python","C++"]);
  const [availability, setAvailability] = useState("Weekends");
  const navigate = useNavigate();

  const removeSkill = (skill, type) => {
    if (type === "offered") {
      setSkillsOffered(skillsOffered.filter((s) => s !== skill));
    } else {
      setSkillsWanted(skillsWanted.filter((s) => s !== skill));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 
                      bg-[length:200%_200%] animate-gradient-x blur-2xl opacity-20 z-0" />
      <div className="relative z-10 w-full max-w-6xl rounded-3xl bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-2xl border border-gray-700 p-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h2 className="text-4xl font-extrabold tracking-wide text-purple-300 mb-4 md:mb-0">User Profile</h2>
          <div className="flex flex-wrap gap-3">
            <button className="bg-green-500 hover:bg-green-600 transition px-5 py-2 rounded-xl font-medium">Save</button>
            <button className="bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-xl font-medium">Discard</button>
            <button className="bg-indigo-600 hover:bg-indigo-500 transition px-5 py-2 rounded-xl font-medium" onClick={() => navigate('/swap')}>Swap Request</button>
            <button className="bg-pink-600 hover:bg-pink-500 transition px-5 py-2 rounded-xl font-medium" onClick={() => navigate('/')}>Home</button>
            <img
              src="https://api.dicebear.com/6.x/thumbs/svg?seed=User"
              alt="avatar"
              className="w-11 h-11 rounded-full border-2 border-purple-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Name</label>
              <input type="text" className="w-full px-5 py-3 bg-gray-700 text-white border border-gray-600 rounded-xl placeholder-gray-400" placeholder="Enter your name" />
            </div>

            
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Location <span className="text-xs text-gray-400">(optional)</span></label>
              <input type="text" className="w-full px-5 py-3 bg-gray-700 text-white border border-gray-600 rounded-xl placeholder-gray-400" placeholder="City, Country" />
            </div>

            
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Skills Offered</label>
              <div className="flex flex-wrap gap-2">
                {skillsOffered.map((skill, i) => (
                  <span key={i} className="flex items-center bg-blue-900 px-4 py-1.5 rounded-full text-sm border border-blue-400">
                    {skill}
                    <button onClick={() => removeSkill(skill, "offered")} className="ml-2 text-red-300 hover:text-red-500">&times;</button>
                  </span>
                ))}
              </div>
            </div>

            
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Skills Wanted</label>
              <div className="flex flex-wrap gap-2">
                {skillsWanted.map((skill, i) => (
                  <span key={i} className="flex items-center bg-purple-900 px-4 py-1.5 rounded-full text-sm border border-purple-400">
                    {skill}
                    <button onClick={() => removeSkill(skill, "wanted")} className="ml-2 text-red-300 hover:text-red-500">&times;</button>
                  </span>
                ))}
              </div>
            </div>

            
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Availability</label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full px-5 py-3 bg-gray-700 text-white border border-gray-600 rounded-xl"
              >
                <option>Weekends</option>
                <option>Evenings</option>
                <option>Weekdays</option>
              </select>
            </div>

            
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Profile</label>
              <select className="w-full px-5 py-3 bg-gray-700 text-white border border-gray-600 rounded-xl">
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>
          </div>

          
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 rounded-full border-4 border-purple-500 flex items-center justify-center overflow-hidden bg-gray-800 shadow-xl">
              <img
                src="https://api.dicebear.com/6.x/thumbs/svg?seed=User"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-5 flex gap-5">
              <button className="text-sm text-blue-400 hover:underline">Add / Edit</button>
              <button className="text-sm text-red-400 hover:underline">Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
