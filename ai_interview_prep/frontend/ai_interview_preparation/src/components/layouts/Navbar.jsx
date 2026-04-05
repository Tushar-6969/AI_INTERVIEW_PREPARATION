import React from 'react'
import ProfileInfoCard from '../Cards/ProfileInfoCard';
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link to="/dashboard">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-wide hover:scale-105 transition-transform duration-200">
            Interview Prep AI
          </h2>
        </Link>

        <div className="flex items-center gap-4">
          <ProfileInfoCard />
        </div>

      </div>
    </div>
  )
}

export default Navbar;