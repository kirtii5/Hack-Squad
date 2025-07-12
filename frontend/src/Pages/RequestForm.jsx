import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6 border border-purple-100"
      >
        <h1 className="text-2xl font-bold text-purple-800 text-center">Send a Collaboration Request</h1>

        <div>
          <label className="block mb-1 text-sm text-purple-700 font-medium">You can offer</label>
          <Select value={offered} onValueChange={setOffered}>
            <SelectTrigger className="w-full border-gray-300">
              <SelectValue placeholder="Select a skill you can offer them" />
            </SelectTrigger>
            <SelectContent>
              {offeredOptions.map((skill, index) => (
                <SelectItem key={index} value={skill}>{skill}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block mb-1 text-sm text-indigo-700 font-medium">You want to learn</label>
          <Select value={wanted} onValueChange={setWanted}>
            <SelectTrigger className="w-full border-gray-300">
              <SelectValue placeholder="Select a skill you want to learn" />
            </SelectTrigger>
            <SelectContent>
              {wantedOptions.map((skill, index) => (
                <SelectItem key={index} value={skill}>{skill}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-700 font-medium">Message</label>
          <Textarea
            placeholder="Write a brief message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border-gray-300"
            rows={4}
            required
          />
        </div>

        <Button type="submit" className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 rounded-xl shadow">
          Send Request
        </Button>
      </form>
    </div>
  );
}
