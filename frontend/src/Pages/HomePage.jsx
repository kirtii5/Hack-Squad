import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { users } from "@/data/users";
import { Link } from "react-router-dom";

const USERS_PER_PAGE = 3;

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const currentUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pt-16">
      {/* Filter & Search Bar */}
      <div className="px-4 sm:px-0 py-5 flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Select>
          <SelectTrigger className="w-[200px] border-gray-300 rounded-md">
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekends">Weekends</SelectItem>
            <SelectItem value="evenings">Evenings</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Search for skills"
          className="w-[300px] border-gray-300 rounded-md"
        />

        <Button className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-md shadow-sm">
          Search
        </Button>
      </div>

      {/* User Cards */}
      <main className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        {currentUsers.map((user, i) => (
          <Link
            key={i}
            to={`/profile/${user.name.replace(/\s+/g, "")}`}
            className="block"
          >
            <div className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-xl hover:scale-[1.01] transition-all p-5 flex items-center gap-6 cursor-pointer">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full border border-purple-200"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-sm text-purple-700 mt-1">
                  <span className="font-medium">Offering:</span>{" "}
                  {user.offered.join(", ")}
                </p>
                <p className="text-sm text-indigo-600">
                  <span className="font-medium">Wants:</span>{" "}
                  {user.wanted.join(", ")}
                </p>
                <div className="flex gap-6 mt-1 text-sm">
                  <p className="text-gray-500">
                    <span className="font-medium">Availability:</span>{" "}
                    {user.availability}
                  </p>
                  <p className="text-yellow-600 font-medium">
                    Rating: {user.rating}/5
                  </p>
                </div>
              </div>
              <Button className="bg-purple-700 hover:bg-purple-800 text-white text-sm px-4 py-1 rounded-md">
                Request
              </Button>
            </div>
          </Link>
        ))}
      </main>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 pb-16">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 text-gray-600 hover:text-purple-700 disabled:opacity-40"
        >
          &lt;
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 text-sm rounded-md border ${
                currentPage === page
                  ? "bg-purple-700 text-white border-purple-700"
                  : "text-gray-700 border-gray-300 hover:bg-purple-100"
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
          className="px-3 py-1 text-gray-600 hover:text-purple-700 disabled:opacity-40"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
