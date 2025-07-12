import React, { useState } from "react";

export default function SwapRequestPage() {
  const [statusFilter, setStatusFilter] = useState("Pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Marc Demo",
      profileImage: "https://api.dicebear.com/6.x/thumbs/svg?seed=Marc",
      skillsOffered: ["Video Editing", "Graphic Design"],
      skillsWanted: ["Python", "JavaScript"],
      status: "Pending",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Jane Vills",
      profileImage: "https://api.dicebear.com/6.x/thumbs/svg?seed=Jane",
      skillsOffered: ["UI/UX", "Figma"],
      skillsWanted: ["React", "Next.js"],
      status: "Rejected",
      rating: 3.8,
    },
    {
      id: 3,
      name: "Akhil R",
      profileImage: "https://api.dicebear.com/6.x/thumbs/svg?seed=Akhil",
      skillsOffered: ["Photoshop", "Illustrator"],
      skillsWanted: ["C++", "Java"],
      status: "Pending",
      rating: 4.2,
    },
    {
      id: 4,
      name: "Sara Lee",
      profileImage: "https://api.dicebear.com/6.x/thumbs/svg?seed=Sara",
      skillsOffered: ["Canva", "Social Media"],
      skillsWanted: ["Node.js", "MongoDB"],
      status: "Pending",
      rating: 4.7,
    },
    {
      id: 5,
      name: "David Kim",
      profileImage: "https://api.dicebear.com/6.x/thumbs/svg?seed=David",
      skillsOffered: ["Unity", "C#"],
      skillsWanted: ["Java", "Python"],
      status: "Pending",
      rating: 4.4,
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  const filteredRequests = requests.filter(
    (req) =>
      req.status === statusFilter &&
      req.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 px-6 bg-black text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 
                      bg-[length:200%_200%] animate-gradient-x blur-2xl opacity-20 z-0" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-700 pb-4">
          <h1 className="text-3xl font-extrabold tracking-wide text-purple-300">
            Swap Requests
          </h1>
          <div className="flex items-center gap-4">
            <button className="underline hover:text-purple-400 transition">Home</button>
            <img
              src="https://api.dicebear.com/6.x/thumbs/svg?seed=User"
              className="w-10 h-10 rounded-full border-2 border-purple-500"
              alt="User"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-800 text-white border border-gray-600 px-4 py-2 rounded-xl"
          >
            <option>Pending</option>
            <option>Accepted</option>
            <option>Rejected</option>
          </select>

          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 bg-gray-800 border border-gray-600 px-4 py-2 rounded-xl placeholder-gray-400"
          />
        </div>

        {/* Requests */}
        <div className="space-y-6 pb-10">
          {filteredRequests.map((req) => (
            <div
              key={req.id}
              className="border border-gray-700 rounded-2xl p-6 flex items-center justify-between bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-lg hover:scale-[1.01] transition"
            >
              <div className="flex items-center gap-6">
                <img
                  src={req.profileImage}
                  className="w-16 h-16 rounded-full border-4 border-purple-600"
                  alt={req.name}
                />
                <div>
                  <h2 className="text-xl font-bold text-purple-200 mb-1">{req.name}</h2>
                  <p className="text-sm text-blue-300">
                    <span className="font-medium">Skills Offered:</span> {req.skillsOffered.join(", ")}
                  </p>
                  <p className="text-sm text-pink-300">
                    <span className="font-medium">Skills Wanted:</span> {req.skillsWanted.join(", ")}
                  </p>
                  <p className="text-yellow-300 text-sm mt-1">
                    ⭐ Rating: {req.rating}
                  </p>
                </div>
              </div>

              <div className="text-right space-y-2">
                <p className="text-yellow-400 font-semibold text-sm">
                  Status: {req.status}
                </p>
                {req.status === "Pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusChange(req.id, "Accepted")}
                      className="px-4 py-1 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusChange(req.id, "Rejected")}
                      className="px-4 py-1 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
