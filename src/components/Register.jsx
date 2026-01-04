import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/auth/register", {
        name,
        email,
        phone,
        password,
      });

      toast.success(res.data?.message || "Registered successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleRegister}
          className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg shadow-gray-400 border border-gray-300 text-teal-900"
        >
          <h2 className="text-3xl font-bold text-center mb-6">
            Register
          </h2>

          {/* Name */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter name"
              className="w-full px-4 py-3 rounded-lg border border-teal-950 focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter email"
              className="w-full px-4 py-3 rounded-lg border border-teal-950 focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold">
              Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className="w-full px-4 py-3 rounded-lg border border-teal-950 focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block mb-1 font-semibold">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Create password"
              className="w-full px-4 py-3 rounded-lg border border-teal-950 focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-950 hover:opacity-90 transition"
          >
            Register
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" />
    </>
  );
};

export default Register;
