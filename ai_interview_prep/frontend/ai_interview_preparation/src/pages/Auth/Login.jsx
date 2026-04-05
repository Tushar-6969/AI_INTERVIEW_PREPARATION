import React, { useContext,useState } from "react"; 
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/input"
import { validateEmail } from "../../utils/helper";
import { BASE_URL, API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance"
import {UserContext} from "../../context/userContext"
const Login = ({ setCurrentPage }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const {updateUser}=useContext(UserContext)




  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();

  console.log("🔵 Login button clicked");
  console.log("📧 Email:", email);
  console.log("🔑 Password:", password);

  // Validation
  if (!validateEmail(email)) {
    console.log("❌ Invalid email format");
    setError("Please enter valid email address");
    return;
  }

  if (!password) {
    console.log("❌ Password is empty");
    setError("Please enter the password");
    return;
  }

  setError("");
  console.log("✅ Validation passed");

  try {
    console.log("🚀 Sending login request to:", API_PATHS.AUTH.LOGIN);

    const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
      email,
      password,
    });

    console.log("🟢 Full Response Object:", response);
    console.log("🟢 Response Data:", response.data);
    console.log("🟢 Response Status:", response.status);

    const { token } = response.data;
    console.log("🔐 Extracted Token:", token);

    if (token) {
      console.log("✅ Token exists. Saving to localStorage...");
      localStorage.setItem("token", token);

      console.log("📦 Calling updateUser with:", response.data);
      updateUser(response.data);

      console.log("➡️ Navigating to /dashboard");
      navigate("/dashboard");
    } else {
      console.log("❌ No token received from backend!");
      setError("Login failed: No token received");
    }

  } catch (error) {
    console.log("🔴 Login Error Caught:", error);

    if (error.response) {
      console.log("🔴 Error Status:", error.response.status);
      console.log("🔴 Error Data:", error.response.data);
    }

    if (error.response && error.response.data.message) {
      setError(error.response.data.message);
    } else {
      setError("Something went wrong. Try again.");
    }
  }
};
  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
      
      <h3 className="text-2xl font-semibold text-gray-800 text-center">
        Welcome back
      </h3>

      <p className="text-sm text-gray-500 text-center mt-1 mb-6">
        Please enter details to log in
      </p>

      <form onSubmit={handleLogin} className="space-y-4">
  {/* EMAIL - NATIVE INPUT */}
  <div className="w-full flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">Email</label>
    <input
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="john@example.com"
      type="email"
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>

  {/* PASSWORD - NATIVE INPUT */}
  <div className="w-full flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">Password</label>
    <div className="relative flex items-center">
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="pass"
        type="password"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
      />
      <button
        type="button"
        className="absolute right-3 text-gray-500 hover:text-blue-600"
        onClick={() => document.querySelector('input[type="password"]').type = 
          document.querySelector('input[type="password"]').type === 'password' ? 'text' : 'password'}
      >
        👁️
      </button>
    </div>
  </div>

  {error && (
    <p className="text-sm text-red-500 text-center">{error}</p>
  )}

  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
  >
    Login
  </button>
</form>


      <p className="text-sm text-gray-600 text-center mt-4">
        Don’t have account{" "}
        <button
          type="button"
          className="text-blue-600 hover:underline font-medium"
          onClick={() => setCurrentPage("signup")}
        >
         sign up 
        </button>
      </p>

    </div>
  );
};

export default Login;
