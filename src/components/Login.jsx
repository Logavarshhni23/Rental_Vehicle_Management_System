import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      const { token, role } = res.data;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("user", email);
      sessionStorage.setItem("isLoggedIn", "true");

      toast.success("Login successful");
      role === "admin" ? navigate("/admin") : navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg shadow-gray-400 border border-gray-300 text-teal-900">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email"
            className="w-full px-4 py-3 rounded-lg border border-teal-950 focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter password"
            className="w-full px-4 py-3 rounded-lg border border-teal-950 focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
        </div>

        {/* Button */}
        <button type="submit" className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-950 hover:opacity-90 transition">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;



