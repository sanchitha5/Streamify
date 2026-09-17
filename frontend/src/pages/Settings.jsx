import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateProfile } from "../lib/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import {
  Home,
  Phone,
  Settings,
  MessageCircle,
  Bell,
  Globe,
  Moon,
  LogOut,
  ArrowLeft,
} from "lucide-react";

const SettingsPage = () => {
  const { authUser } = useAuthUser();
   const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState(authUser?.profilePic || "");
  const [fullName, setFullName] = useState(authUser?.fullName || "");
  const queryClient = useQueryClient();

  const [notifications, setNotifications] = useState(true);
  const [privateProfile, setPrivateProfile] = useState(false);
  const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

   const reader = new FileReader();


  reader.onloadend = () => {
    setProfilePic(reader.result);
  };

  reader.readAsDataURL(file);
};

  const handleSave = async () => {
  try {
    await updateProfile({
      fullName,
      profilePic,
    });

    queryClient.invalidateQueries({
      queryKey: ["authUser"],
    });

    toast.success("Profile updated");
  } catch (error) {
    console.log(error);
     console.log(error.response);
    toast.error(error.response?.data?.message || "Update failed");
  }
};

 return (
  <>
  <Navbar 
  showActions={false}
  showNotification={true} />
  
  <div className="min-h-screen bg-base-100 text-base-content p-4">
    <div className="flex gap-6">

      {/* ================= SIDEBAR ================= */}
      <div
        className="
          w-20
              lg:w-64
              bg-base-200
              border border-base-300
              rounded-3xl
              p-4
              flex
              flex-col
              justify-between
              h-[calc(100vh-7rem)]
              sticky
              top-24
        "
      >
        <div>

          <div className="space-y-2">

            <button
              onClick={() => navigate("/")}
              className="btn btn-ghost w-full lg:justify-start"
            >
              <Home size={18} />
              <span className="hidden lg:inline">Home</span>
            </button>

            <button
              onClick={() => navigate("/chat")}
              className="btn btn-ghost w-full lg:justify-start"
            >
              <MessageCircle size={18} />
              <span className="hidden lg:inline">Chats</span>
            </button>

            <button
              className="btn btn-ghost w-full lg:justify-start"
            >
              <Phone size={18} />
              <span className="hidden lg:inline">Calls</span>
            </button>

            <button
              className="btn btn-primary w-full lg:justify-start"
            >
              <Settings size={18} />
              <span className="hidden lg:inline">
                Settings
              </span>
            </button>

          </div>
        </div>

        {/* Bottom User */}
        <div className="hidden lg:flex items-center gap-3 bg-base-300 p-3 rounded-xl">
          <img
            src={authUser?.profilePic}
            className="w-10 h-10 rounded-full"
          />

          <div>
            <h3 className="font-semibold">
              {authUser?.fullName}
            </h3>

            <p className="text-success text-sm">
              Online
            </p>
          </div>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="flex-1">

        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-circle btn-ghost"
          >
            <ArrowLeft size={22} />
          </button>

          <div>
            <h1 className="text-3xl font-bold">
              Settings
            </h1>

          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* ================= LEFT PROFILE CARD ================= */}

          <div className="bg-base-200 rounded-3xl border border-base-300 p-6">

            <div className="flex flex-col items-center">

              <div className="relative">

                <img
                  src={profilePic || authUser?.profilePic}
                  className="w-32 h-32 rounded-full object-cover border-4 border-primary"
                />

                <label className="absolute bottom-0 right-0 btn btn-circle btn-primary btn-sm">

                  📷

                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />

                </label>

              </div>

              <input
                type="text"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                className="input input-bordered w-full mt-6"
              />

              <input
                type="email"
                disabled
                value={authUser?.email}
                className="input input-bordered w-full mt-3"
              />

              <button
                onClick={handleSave}
                className="btn btn-primary w-full mt-6"
              >
                Save Changes
              </button>

            </div>

          </div>

          {/* ================= RIGHT SETTINGS ================= */}

          <div className="lg:col-span-2 space-y-5">
            {/* Notifications */}
<div className="card bg-base-200 border border-base-300 shadow-sm">
  <div className="card-body flex-row items-center justify-between">

    <div className="flex items-center gap-4">
      <Bell className="text-primary" />

      <div>
        <h3 className="font-semibold">
          Notifications
        </h3>

        <p className="text-sm text-base-content/70">
          Receive messages and alerts
        </p>
      </div>
    </div>

    <input
      type="checkbox"
      className="toggle toggle-primary"
      checked={notifications}
      onChange={() => setNotifications(!notifications)}
    />

  </div>
</div>

{/* Language */}
<div className="card bg-base-200 border border-base-300 shadow-sm">
  <div className="card-body flex-row items-center justify-between">

    <div className="flex items-center gap-4">
      <Globe className="text-warning" />

      <div>
        <h3 className="font-semibold">
          Language
        </h3>

        <p className="text-sm text-base-content/70">
          Select your preferred language
        </p>
      </div>
    </div>

    <select className="select select-bordered">
      <option>English</option>
      <option>Hindi</option>
      <option>Marathi</option>
    </select>

  </div>
</div>

{/* Theme */}


{/* Logout */}
<div className="card bg-base-200 border border-error/30 shadow-sm">
  <div className="card-body flex-row items-center justify-between">

    <div className="flex items-center gap-4">
      <LogOut className="text-error" />

      <div>
        <h3 className="font-semibold text-error">
          Logout
        </h3>

        <p className="text-sm text-base-content/70">
          Sign out from your account
        </p>
      </div>
    </div>

    <button className="btn btn-error">
      Logout
    </button>

  </div>
</div>

</div>
</div>
</div>
</div>
</div>
</>
);
};

export default SettingsPage;
         