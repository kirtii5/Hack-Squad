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
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-black to-gray-800 text-white font-mono animate-fade-in">
      
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-purple-400">Skill Swap Platform</h1>
        <div className="flex items-center gap-4">
          <button className="underline">Home</button>
          <img
            src="https://api.dicebear.com/6.x/thumbs/svg?seed=User"
            className="w-10 h-10 rounded-full border-2 border-purple-500"
            alt="User"
          />
        </div>
      </div>

      
      <div className="flex flex-wrap items-center justify-between px-6 py-4 gap-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-black border border-white px-3 py-2 rounded"
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
          className="bg-black border border-white px-4 py-2 rounded w-64"
        />
      </div>

      
      <div className="px-6 space-y-6 pb-10">
        {filteredRequests.map((req) => (
          <div
            key={req.id}
            className="border border-gray-700 rounded-xl p-6 flex items-center justify-between bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-lg transition-transform hover:scale-[1.01]"
          >
            <div className="flex items-center gap-6">
              <img
                src={req.profileImage}
                className="w-16 h-16 rounded-full border-4 border-purple-600"
                alt={req.name}
              />
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{req.name}</h2>
                <p className="text-sm text-gray-300">
                  <span className="text-purple-300">Skills Offered:</span> {req.skillsOffered.join(", ")}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="text-green-300">Skills Wanted:</span> {req.skillsWanted.join(", ")}
                </p>
                <p className="text-yellow-300 mt-1">⭐ Rating: {req.rating}</p>
              </div>
            </div>
            <div className="text-right space-y-2">
              <p className="text-yellow-400 font-semibold">Status: {req.status}</p>
              {req.status === "Pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusChange(req.id, "Accepted")}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusChange(req.id, "Rejected")}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
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
  );
}
