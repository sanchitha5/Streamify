import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import useLogout from "../hooks/useLogout";
import ThemeSelector from "./ThemeSelector";

import {
  Bell,
  LogOut,
  Search,
  MessageCircle,
  Video,
} from "lucide-react";

const Navbar = ({ 
  showActions = true,
  showNotification = true,
 }) => {
  const { authUser } = useAuthUser();
  const { logoutMutation } = useLogout();
  const location = useLocation();

  const isChatPage =
  location.pathname.startsWith("/chat") ||
  location.pathname.startsWith("/settings") ||
  location.pathname.startsWith("/notifications");

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-base-100/80 border-b border-base-300">
      <div className="h-20 px-6 flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
              <Video className="h-5 w-5 text-white" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-primary">
                VidChat
              </h1>

              <p className="text-xs text-base-content/70">
                Connect & Communicate
              </p>
            </div>
          </Link>

          {showActions && !isChatPage && (
            <div className="hidden lg:flex relative">
              <Search
                size={18}
                className="absolute left-4 top-3.5 text-base-content/60"
              />

              <input
                type="text"
                placeholder="Search users, chats..."
                className="w-80 h-11 bg-base-200 border border-base-300 rounded-xl pl-11 text-sm text-base-content placeholder:text-base-content/50 focus:outline-none focus:border-primary"
              />
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {showActions && (
            <>
              <Link
                to="/chat"
                className="hidden md:flex btn btn-ghost text-gray-300 hover:text-white"
              >
                <MessageCircle size={20} />
              </Link>

              {showNotification && (
  <Link
    to="/notifications"
    className="relative"
  >
    <button className="h-11 w-11 rounded-xl bg-base-200 hover:bg-base-300 flex items-center justify-center transition">
      <Bell size={20} className="text-base-content" />
    </button>

    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-content text-xs flex items-center justify-center">
      3
    </span>
  </Link>
)}

              <ThemeSelector />
            </>
          )}

          {/* USER */}
          <div className="hidden md:flex items-center gap-3 px-3 py-2 rounded-xl bg-base-200 border border-base-300">
            <img
              src={authUser?.profilePic}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />

            <div>
              <h3 className="text-sm font-semibold text-base-content">
                {authUser?.fullName}
              </h3>

              <p className="text-xs text-green-400">
                Online
              </p>
            </div>
          </div>

          {/* LOGOUT */}
          <button
            onClick={logoutMutation}
            className="h-11 w-11 rounded-xl bg-error/10 hover:bg-error/20 flex items-center justify-center"
          >
            <LogOut size={20} className="text-error" />
          </button>

        </div>
      </div>
    </header>
  );
};

export default Navbar;