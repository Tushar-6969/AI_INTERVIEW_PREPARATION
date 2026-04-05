import React from 'react'
import { LuX } from 'react-icons/lu'

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      className={`fixed top-0 right-0 z-50 h-screen w-full max-w-2xl transform overflow-y-auto border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:border-slate-700 dark:bg-slate-900 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      tabIndex="-1"
      aria-labelledby="drawer-right-label"
    >
      {/* {Header} */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/95 sm:px-6">
        <h5
          id="drawer-right-label"
          className="truncate pr-4 text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-lg"
        >
          {title}
        </h5>

        {/* close button */}
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:scale-105 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-800 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-white"
        >
          <LuX className="h-5 w-5" />
        </button>
      </div>

      {/* body content */}
      <div className="min-h-[calc(100vh-80px)] px-5 py-5 sm:px-6 sm:py-6">
        {children}
      </div>
    </div>
  )
}

export default Drawer