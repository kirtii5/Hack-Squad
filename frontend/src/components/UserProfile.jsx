import React, { useState } from "react";

const UserProfile = () => {
  const [skillsOffered, setSkillsOffered] = useState([]);
  const [skillsWanted, setSkillsWanted] = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleSkillAdd = (type, e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      const val = e.target.value.trim();
      type === "offered"
        ? setSkillsOffered([...skillsOffered, val])
        : setSkillsWanted([...skillsWanted, val]);
      e.target.value = "";
    }
  };

  const removeSkill = (type, skill) => {
    type === "offered"
      ? setSkillsOffered(skillsOffered.filter(s => s !== skill))
      : setSkillsWanted(skillsWanted.filter(s => s !== skill));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-gray-900 text-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Create Your Profile</h1>

      <form className="space-y-6">
        <div>
          <label className="block text-gray-300">Name</label>
          <input type="text" className="w-full p-3 rounded bg-gray-800 border border-gray-600" />
        </div>

        <div>
          <label className="block text-gray-300">Location</label>
          <input type="text" className="w-full p-3 rounded bg-gray-800 border border-gray-600" />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Profile Photo</label>
          <input type="file" accept="image/*" onChange={handlePhotoUpload} />
          {photoPreview && (
            <img src={photoPreview} alt="Preview" className="mt-4 w-24 h-24 rounded-full object-cover" />
          )}
        </div>

        <div>
          <label className="block text-gray-300">Skills Offered</label>
          <input type="text" onKeyDown={(e) => handleSkillAdd("offered", e)} className="w-full p-3 rounded bg-gray-800 border border-gray-600" placeholder="Type and press Enter" />
          <div className="flex flex-wrap mt-2 gap-2">
            {skillsOffered.map(skill => (
              <span key={skill} className="bg-green-600 px-3 py-1 rounded-full text-sm flex items-center">
                {skill}
                <button onClick={() => removeSkill("offered", skill)} className="ml-2 text-red-300">&times;</button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-300">Skills Wanted</label>
          <input type="text" onKeyDown={(e) => handleSkillAdd("wanted", e)} className="w-full p-3 rounded bg-gray-800 border border-gray-600" placeholder="Type and press Enter" />
          <div className="flex flex-wrap mt-2 gap-2">
            {skillsWanted.map(skill => (
              <span key={skill} className="bg-blue-600 px-3 py-1 rounded-full text-sm flex items-center">
                {skill}
                <button onClick={() => removeSkill("wanted", skill)} className="ml-2 text-red-300">&times;</button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-300">Availability</label>
          <select className="w-full p-3 rounded bg-gray-800 border border-gray-600">
            <option value="weekends">Weekends</option>
            <option value="evenings">Evenings</option>
            <option value="anytime">Anytime</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-300">Profile Visibility</label>
          <select className="w-full p-3 rounded bg-gray-800 border border-gray-600">
            <option value="true">Public</option>
            <option value="false">Private</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded font-semibold mt-6 transition-all">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
