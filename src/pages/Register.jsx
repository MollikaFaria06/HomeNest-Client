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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border-2 border-gray-400 p-2 w-full rounded"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border-2 border-gray-400 p-2 w-full rounded"
            required
          />
          <input
            name="photoURL"
            type="text"
            placeholder="Photo URL"
            value={formData.photoURL}
            onChange={handleChange}
            className="border-2 border-gray-400 p-2 w-full rounded"
          />

          {/* Password Field with Eye Icon */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border-2 border-gray-400 p-2 w-full rounded pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-600"
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>

          <button
            type="submit"
            className="btn w-full bg-green-600 text-lg text-white hover:bg-green-700 border-2 border-gray-400 p-2 rounded"
          >
            Register
          </button>
        </form>

        
        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full mt-6 p-2 border flex items-center justify-center gap-2"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
