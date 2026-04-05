import React, { useContext,useState } from "react";
import Modal from "../components/Modal";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";

import Hero_png from "../assets/hero-img.png";
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import {UserContext} from '../context/userContext'
import ProfileInfoCard from '../components/Cards/ProfileInfoCard'

const LandingPage = () => {
const {user} =useContext(UserContext)


  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {




    if(!user){
    setOpenAuthModal(true);
    }
else{
  navigate("/dashboard")
}


  };

  return (
    <>
      <div className="w-full min-h-screen bg-[#fffcef] relative">
        <div className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0" />

        {/* ⛔ pb-[200px] → ✅ pb-24 */}
        <div className="container mx-auto px-4 pt-6 pb-24 relative z-10">
          {/* header */}
          <header className="flex justify-between items-center">
            <div className="text-xl text-black font-bold">
              interview prep ai
            </div>

            { user ? (<ProfileInfoCard/>):
            (<button
              className="bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full border border-white transition-colors"
              onClick={() => setOpenAuthModal(true)}
            >
              login / signup
            </button>)
            }



          </header>

          {/* hero content */}
          <div className="flex flex-col md:flex-row items-center mt-16">
            <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
              <div className="flex items-center mb-2">
                <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  <LuSparkles />
                  AI Powered
                </div>
              </div>

              <h1 className="text-5xl text-black font-medium mb-6 leading-tight">
                Ace interviews with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#fcd760_100%)] font-semibold">
                  AI powered
                </span>{" "}
                learning
              </h1>
            </div>

            <div className="w-full md:w-1/2">
              <p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6">
                Get role specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery — your ultimate toolkit is here.
              </p>

              <button
                className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-400 hover:text-black border border-yellow-300 transition-colors"
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* hero image */}
      {/* ⛔ -mt-36 removed → natural spacing */}
      <section className="flex items-center justify-center mt-8">
        <img
          src={Hero_png}
          alt="Hero"
          className="w-[80vw] rounded-lg"
        />
      </section>

      {/* features */}
      <div className="w-full bg-[#fffcef] mt-16">
        <div className="container mx-auto px-4 pt-10 pb-20">
          <section className="mt-5">
            <h2 className="text-2xl font-medium text-center mb-12">
              Features that make you shine
            </h2>

            <div className="flex flex-col items-center gap-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {APP_FEATURES.slice(0, 3).map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-[#FFF8F8] p-6 rounded-xl shadow-sm hover:shadow-lg transition"
                  >
                    <h3 className="text-base font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {APP_FEATURES.slice(3).map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-[#FFF8F8] p-6 rounded-xl shadow-sm hover:shadow-lg transition"
                  >
                    <h3 className="text-base font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <footer className="text-sm bg-gray-50 text-gray-600 text-center p-5 mt-5">
        Made with ❤️ — Happy Coding
      </footer>

      {/* modal (UNCHANGED) */}
      {openAuthModal && (
        <Modal
          isOpen={openAuthModal}
          onClose={() => {
            setOpenAuthModal(false);
            setCurrentPage("login");
          }}
          hideHeader
        >
          {currentPage === "login" && (
            <Login setCurrentPage={setCurrentPage} />
          )}

          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </Modal>
      )}
    </>
  );
};

export default LandingPage;
