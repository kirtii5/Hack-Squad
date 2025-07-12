import { useParams } from "react-router-dom";
import { users } from "@/data/users";

export default function UserProfile() {
  const { username } = useParams();
  const user = users.find((u) => u.name.replace(/\s+/g, "") === username);

  if (!user)
    return <p className="text-center mt-10 text-red-500">User not found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white pt-20 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-8 relative">

        {/* Request Button at Top Left */}
        <div className="absolute top-6 left-6">
          <button className="bg-purple-700 text-white px-5 py-2 rounded hover:bg-purple-800">
            Request
          </button>
          <h1 className="mt-6 text-3xl font-bold text-gray-800">{user.name}</h1>
        </div>

        {/* Profile Photo at Top Right */}
        <div className="absolute top-6 right-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full border-4 border-purple-300"
          />
        </div>

        {/* Main Info */}
        <div className="mt-32 space-y-6">
          {/* <p className="text-yellow-600 font-semibold text-lg">
            Rating: {user.rating}/5
          </p> */}

          <div>
            <h2 className="text-xl font-semibold text-purple-700">
              Skills Offered
            </h2>
            <p className="text-gray-700">{user.offered.join(", ")}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-indigo-600">
              Skills Wanted
            </h2>
            <p className="text-gray-700">{user.wanted.join(", ")}</p>
          </div>

          <div>
            <p className="text-gray-600">
              <span className="font-medium">Availability:</span>{" "}
              {user.availability}
            </p>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mt-12 border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Rating & Feedback
          </h2>
          <p className="text-yellow-600 font-semibold text-lg">
            Rating : {user.rating}/5
          </p>

          {user.reviews && user.reviews.length > 0 ? (
            <ul className="space-y-4">
              {user.reviews.map((review, index) => (
                <li
                  key={index}
                  className="bg-purple-50 p-4 rounded shadow-sm border border-purple-100"
                >
                  <div className="flex justify-between items-center mb-1">
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
