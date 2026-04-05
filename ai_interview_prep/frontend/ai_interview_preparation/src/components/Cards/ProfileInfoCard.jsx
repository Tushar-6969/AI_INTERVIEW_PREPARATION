import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const ProfileInfoCard = () => {

const { user, clearUser } = useContext(UserContext);
const navigate = useNavigate();

const handlelogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
}

return user && (
    <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-full shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">

{user.profileImageUrl && <img src={user.profileImageUrl} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400" />}



        <div className="flex flex-col">
            <div className='text-sm font-semibold text-gray-800'>
                {user?.name || ""}
            </div>

            <button 
                className='text-xs text-red-500 hover:text-red-600 font-medium transition'
                onClick={handlelogout}
            >
                Logout
            </button>
        </div>

    </div>
)

}

export default ProfileInfoCard;

// 1:57