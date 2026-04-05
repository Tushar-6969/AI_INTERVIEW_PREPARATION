import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          type={
            type === "password"
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        {type === "password" && (
          showPassword ? (
            <FaRegEye
              size={22}
              className="absolute right-3 text-gray-500 cursor-pointer hover:text-blue-600 transition"
              onClick={togglePassword}
            />
          ) : (
            <FaRegEyeSlash
              size={22}
              className="absolute right-3 text-gray-500 cursor-pointer hover:text-blue-600 transition"
              onClick={togglePassword}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Input;
