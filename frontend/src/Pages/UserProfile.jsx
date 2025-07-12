import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function UserProfile() {
  const { username } = useParams(); // this is clerkId
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <p className="text-center mt-10 text-red-500">User not found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white pt-20 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-8 relative">
        {/* Top Section */}
        <div className="absolute top-6 left-6">
          <button className="bg-purple-700 text-white px-5 py-2 rounded hover:bg-purple-800">
            Request
          </button>
          <h1 className="mt-6 text-3xl font-bold text-gray-800">{user.name || "User"}</h1>
        </div>

        <div className="absolute top-6 right-6">
          <img
            src={user.profilePhoto || "https://placehold.co/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-purple-300"
          />
        </div>

        {/* Main Info */}
        <div className="mt-32 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-purple-700">Skills Offered</h2>
            <p className="text-gray-700">{user.skillsOffered.join(", ")}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-indigo-600">Skills Wanted</h2>
            <p className="text-gray-700">{user.skillsWanted.join(", ")}</p>
          </div>

          <div>
            <p className="text-gray-600"><strong>Availability:</strong> {user.availability}</p>
            <p className="text-gray-600"><strong>Location:</strong> {user.location}</p>
          </div>
        </div>

        {/* Rating & Feedback */}
        <div className="mt-12 border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Rating & Feedback</h2>
          <p className="text-yellow-600 font-semibold text-lg">
            Rating: {user.rating}/5
          </p>

          {user.feedback && user.feedback.length > 0 ? (
            <ul className="space-y-4">
              {user.feedback.map((review, index) => (
                <li
                  key={index}
                  className="bg-purple-50 p-4 rounded shadow-sm border border-purple-100"
                >
                  <div className="mb-1">
                    <span className="text-sm font-semibold text-purple-700">
                      {review.name}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm">{review.message}</p>
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
