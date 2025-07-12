import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import axios from "axios";

const USERS_PER_PAGE = 3;

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const currentUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/profile/all");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div  className="min-h-screen flex flex-col items-center justify-start p-6 pt-20 relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 
                      bg-[length:200%_200%] animate-gradient-x blur-2xl opacity-20 z-0" />
      <div className="relative z-10 w-full max-w-5xl rounded-3xl bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-2xl border border-gray-700 p-10">

        {/* Filter & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10">
          <Select>
            <SelectTrigger className="w-[200px] bg-gray-700 border border-gray-600 text-white rounded-xl">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekends">Weekends</SelectItem>
              <SelectItem value="evenings">Evenings</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Search for skills"
            className="w-[300px] bg-gray-700 border border-gray-600 text-white rounded-xl placeholder-gray-400"
          />

          <Button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-xl font-medium text-white">
            Search
          </Button>
        </div>

        {/* User Cards */}
        <div className="space-y-6">
          {currentUsers.map((user, i) => (
            <Link
              key={i}
              to={`/user/${user.clerkId}`}
              className="block transition hover:scale-[1.01]"
            >
              <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-6 flex items-center gap-6">
                <img
                  src={user.profilePhoto || "https://placehold.co/100"}
                  alt={user.name || "User"}
                  className="w-16 h-16 rounded-full border-2 border-purple-400"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-purple-300">
                    {user.name || "User"}
                  </h2>
                  <p className="text-sm text-blue-400 mt-1">
                    <span className="font-medium">Offering:</span>{" "}
                    {user.skillsOffered?.join(", ")}
                  </p>
                  <p className="text-sm text-pink-400">
                    <span className="font-medium">Wants:</span>{" "}
                    {user.skillsWanted?.join(", ")}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    <span className="font-medium">Availability:</span>{" "}
                    {user.availability}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <Button className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-1 rounded-md">
                    Request
                  </Button>
                  <p className="text-yellow-300 text-sm mt-1 font-medium">
                    Rating: {user.rating || 0}/5
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-white hover:text-purple-400 disabled:opacity-30"
          >
            &lt;
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 text-sm rounded-md border font-medium ${
                  currentPage === page
                    ? "bg-purple-700 text-white border-purple-600"
                    : "text-gray-300 border-gray-600 hover:bg-purple-800"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-white hover:text-purple-400 disabled:opacity-30"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
