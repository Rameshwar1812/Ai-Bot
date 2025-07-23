import React from "react";
import Dashboard from "./../Pages/Dashboard";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const auth = useAuth();
  return (
    <div className="fixed z-[999] w-full px-4 sm:px-20 py-6 flex justify-between items-center backdrop-blur-sm">
      <div className="logo">
        <a
          className="text-[18px] sm:text-[25px] font-semibold text-nowrap"
          href="#"
        >
          Luna Ai
        </a>
      </div>
      <div className="links flex gap-0 sm:gap-2">
        {auth.isLoggedIn ? (
          <>
            <Link
              to="/dashboard"
              className="text-md font-light px-2 sm:px-4 py-1 rounded-3xl border-zinc-900 border-2 hover:border-white"
            >
              DashBoard
            </Link>

            <button
              onClick={() => {
                auth.logout();
              }}
            >
              <Link
                to="/"
                className="text-md font-light px-2 sm:px-4 py-1 rounded-3xl border-zinc-900 border-2 hover:border-white"
              >
                Logout
              </Link>
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-md font-light px-2 sm:px-4 py-1 rounded-3xl border-zinc-900 border-2 hover:border-white">
              Login
            </Link>
            <Link to="/signup" className="text-md font-light px-2 sm:px-4 py-1 rounded-3xl border-zinc-900 border-2 hover:border-white">
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
