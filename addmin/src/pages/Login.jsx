import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import AdminContextProvider, {
  AdminContext,
} from "../context/AdminContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext.jsx";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken,dToken, backendUrlD } = useContext(DoctorContext);

  const handleSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
         const { data } = await axios.post(`${backendUrlD}/api/doctor/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          console.log(data.token);
          
        } else {
          toast.error(data.message);
        }

      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmitHandler}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm"
      >
        <div className="text-center mb-6">
          <p className="text-2xl font-semibold text-gray-800">
            <span className="text-blue-600">{state}</span> Login
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Login
        </button>

        <div className="flex justify-center mt-6 space-x-4">
          <button
            type="button"
            onClick={() => setState("Admin")}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
              state === "Admin"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Admin
          </button>
          <button
            type="button"
            onClick={() => setState("Doctor")}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
              state === "Doctor"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
