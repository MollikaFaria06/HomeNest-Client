import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

export default function Register() {
  const { registerUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, photoURL, password } = formData;

    // Password Validation
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");
    if (!/[A-Z]/.test(password))
      return toast.error("Must contain an Uppercase letter in the password");
    if (!/[a-z]/.test(password))
      return toast.error("Must contain a Lowercase letter in the password");

    try {
      const userCred = await registerUser(email, password);
      await updateProfile(auth.currentUser, { displayName: name, photoURL });
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success("Logged in with Google!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 via-teal-900 to-black px-4">
      <div className="bg-black/60 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md border border-green-800/40 text-white">
        <h2 className="text-3xl font-bold text-center text-green-400 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-green-700 bg-black/50 p-2 w-full rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-green-700 bg-black/50 p-2 w-full rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            name="photoURL"
            type="text"
            placeholder="Photo URL"
            value={formData.photoURL}
            onChange={handleChange}
            className="border border-green-700 bg-black/50 p-2 w-full rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border border-green-700 bg-black/50 p-2 w-full rounded pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <span
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white text-lg hover:bg-green-600 py-2 rounded transition"
          >
            Register
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-6 flex items-center justify-center gap-2 border border-green-700 rounded p-2 hover:bg-green-700 transition"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <p className="text-center text-sm mt-4 text-gray-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-400 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
