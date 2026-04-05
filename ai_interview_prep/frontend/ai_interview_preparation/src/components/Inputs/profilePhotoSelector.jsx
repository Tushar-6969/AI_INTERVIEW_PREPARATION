import React, { useState, useRef } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center items-center">
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="w-40 h-40 rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-3 bg-gray-50 hover:bg-gray-100 transition">
          <LuUser className="text-4xl text-gray-400" />

          <button
            type="button"
            onClick={onChooseFile}
            className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            <LuUpload className="text-lg" />
          </button>
        </div>
      ) : (
        <div className="relative w-40 h-40">
          <img
            src={previewUrl}
            alt="profile photo"
            className="w-full h-full object-cover rounded-full border shadow-md"
          />

          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute bottom-2 right-2 p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
          >
            <LuTrash className="text-sm" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
