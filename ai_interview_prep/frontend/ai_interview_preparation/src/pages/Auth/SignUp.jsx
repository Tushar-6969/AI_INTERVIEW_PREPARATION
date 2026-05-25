import React, { useState,useContext } from "react";
import { redirectDocument, useNavigate } from "react-router-dom";
import ProfilePhotoSelector from "../../components/Inputs/profilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import { getApiErrorMessage } from "../../utils/errorMessages";
const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {updateUser}=useContext(UserContext)
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add signup logic here

let profileImageUrl=""

if (!fullName){
  setError("pleass enter full name ")
  return;
}

  if(!validateEmail(email)){
    setError("please enter valid email ")
  return;
  }


if(!password){
  setError(" please enter valid password ")


  return;

}


//signup api call
try{

if(profilePic){
  const imageuploadres=await uploadImage(profilePic);
  profileImageUrl = imageuploadres.image_url || "";
}

const response=await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
  name:fullName,
  email,
  password,
  profileImageUrl
});


const {token}=response.data;
if(token){
  localStorage.setItem("token",token)

}

updateUser(response.data);
navigate("/dashboard")


}
catch(error){
if(error.response && error.response.data.message){
    setError(error.response.data.message)
}
else{
    setError(getApiErrorMessage(error, "something went wrong try again "))
}
}








  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-2xl font-semibold text-gray-800 text-center">
          Create an account
        </h3>

        <p className="text-gray-500 text-sm text-center mt-1">
          Join us today by entering details below
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <ProfilePhotoSelector
            image={profilePic}
            setImage={setProfilePic}
          />

          <div className="space-y-3">
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Signup
            </button>
          </div>

          <p className="text-sm text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setCurrentPage("login")}
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;





// 2:00
