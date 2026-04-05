import React from "react";

const Modal = ({
  children,
  isOpen,
  onClose,
  hideHeader,
  title = "",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/50">
      {/* modal content */}
      <div className="relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-md">
        
        {/* modal header */}
        {!hideHeader && (
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="md:text-lg font-medium text-gray-900">
              {title}
            </h3>
          </div>
        )}

        {/* close button */}
        <button
          type="button"
          className="absolute top-3.5 right-3.5 text-gray-400 hover:bg-orange-100 hover:text-gray-700 rounded-lg text-sm w-8 h-8 flex items-center justify-center cursor-pointer"
          onClick={onClose}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l12 12M13 1L1 13"
            />
          </svg>
        </button>

        {/* modal body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
