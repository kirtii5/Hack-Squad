import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserProfile() {
  const { username } = useParams(); // this is clerkId
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/profile/${username}`);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.error("User fetch error:", error);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [username]);

  if (loading)
    return <p className="text-center mt-10 text-white">Loading...</p>;
  if (!user)
    return <p className="text-center mt-10 text-red-400">User not found</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 pt-20 relative overflow-hidden bg-black text-white">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 
                      bg-[length:200%_200%] animate-gradient-x blur-2xl opacity-20 z-0" />
      <div className="relative z-10 w-full max-w-4xl rounded-3xl bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-2xl border border-gray-700 p-10">

        {/* Request Button and Profile Photo */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <button
              onClick={() => navigate(`/user/${user.clerkId}/request`)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl font-medium mb-4"
            >
              Request
            </button>
            <h1 className="text-3xl font-bold text-purple-300">{user.name || "User"}</h1>
          </div>
          <div>
            <img
              src={user.profilePhoto || "https://placehold.co/100"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-purple-400"
            />
          </div>
        </div>

        {/* Main Info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-purple-400">Skills Offered</h2>
            <p className="text-gray-300">{user.skillsOffered.join(", ")}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-pink-400">Skills Wanted</h2>
            <p className="text-gray-300">{user.skillsWanted.join(", ")}</p>
          </div>

          <div className="text-gray-400 space-y-1">
            <p><strong>Availability:</strong> {user.availability}</p>
            <p><strong>Location:</strong> {user.location}</p>
          </div>
        </div>

        {/* Rating & Feedback */}
        <div className="mt-10 border-t border-gray-700 pt-6">
          <h2 className="text-xl font-semibold text-purple-300 mb-4">Rating & Feedback</h2>
          <p className="text-yellow-300 font-semibold text-lg mb-4">
            Rating: {user.rating || "No rating"}/5
          </p>

          {user.feedback && user.feedback.length > 0 ? (
            <ul className="space-y-4">
              {user.feedback.map((review, index) => (
                <li
                  key={index}
                  className="bg-gray-800 border border-purple-500 p-4 rounded-xl shadow"
                >
                  <div className="mb-1">
                    <span className="text-sm font-semibold text-purple-400">
                      {review.name}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">{review.message}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No feedback yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
