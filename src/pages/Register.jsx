import React from 'react';

const Register = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-yellow-400 "
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
