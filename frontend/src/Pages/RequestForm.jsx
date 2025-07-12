import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/clerk-react";

export default function RequestForm() {
  const { clerkId } = useParams();
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [offeredOptions, setOfferedOptions] = useState([]);
  const [wantedOptions, setWantedOptions] = useState([]);
  const [offered, setOffered] = useState("");
  const [wanted, setWanted] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserSkills = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/profile/${clerkId}`);
        const user = res.data;
        setOfferedOptions(user.skillsWanted || []);
        setWantedOptions(user.skillsOffered || []);
      } catch (err) {
        console.error("Failed to fetch user skills:", err);
      }
    };

    fetchUserSkills();
  }, [clerkId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();

      const res = await axios.post(
        "http://localhost:4000/requests",
        {
          to: clerkId,
          offered,
          wanted,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201 || res.status === 200) {
        navigate("/profile");
      }
    } catch (err) {
      console.error("Request failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-24 relative overflow-hidden bg-black text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 
                      bg-[length:200%_200%] animate-gradient-x blur-2xl opacity-20 z-0" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-2xl border border-gray-700 rounded-3xl p-8 w-full max-w-xl space-y-6"
      >
        <h1 className="text-2xl font-bold text-purple-300 text-center">
          Send a Collaboration Request
        </h1>

        {/* Offer Skill */}
        <div>
          <label className="block mb-1 text-sm text-purple-400 font-medium">
            You can offer
          </label>
          <Select value={offered} onValueChange={setOffered}>
            <SelectTrigger className="w-full bg-gray-700 border border-gray-600 text-white rounded-xl">
              <SelectValue placeholder="Select a skill you can offer them" />
            </SelectTrigger>
            <SelectContent>
              {offeredOptions.map((skill, index) => (
                <SelectItem key={index} value={skill}>
                  {skill}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Want to Learn */}
        <div>
          <label className="block mb-1 text-sm text-pink-400 font-medium">
            You want to learn
          </label>
          <Select value={wanted} onValueChange={setWanted}>
            <SelectTrigger className="w-full bg-gray-700 border border-gray-600 text-white rounded-xl">
              <SelectValue placeholder="Select a skill you want to learn" />
            </SelectTrigger>
            <SelectContent>
              {wantedOptions.map((skill, index) => (
                <SelectItem key={index} value={skill}>
                  {skill}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Message */}
        <div>
          <label className="block mb-1 text-sm text-gray-400 font-medium">
            Message
          </label>
          <Textarea
            placeholder="Write a brief message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-xl"
            rows={4}
            required
          />
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-xl shadow"
        >
          Send Request
        </Button>
      </form>
    </div>
  );
}
