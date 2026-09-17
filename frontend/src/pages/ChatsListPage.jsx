import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import useAuthUser from "../hooks/useAuthUser";
import { getUserFriends } from "../lib/api";

import {
  MessageCircle,
  Users,
  MessageCircleIcon,
  ArrowLeft,
  Home,
  Phone,
  Settings,
} from "lucide-react";

const ChatsListPage = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthUser();

  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100 text-base-content">
        Loading chats...
      </div>
    );
  }

  return (
    <>
      {/* Navbar */}
      <Navbar 
      showActions={false}
      showNotification={true} 
      />

      <div className="min-h-screen bg-base-100 text-base-content p-4">
        <div className="flex gap-6">
          {/* Sidebar */}
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

                <button className="btn btn-primary w-full lg:justify-start">
  <MessageCircleIcon size={18} />
  <span className="hidden lg:inline">Chats</span>
</button>

                <button className="btn btn-ghost w-full lg:justify-start">
                  <Phone size={18} />
                  <span className="hidden lg:inline">Calls</span>
                </button>

                <button
                  onClick={() => navigate("/settings")}
                  className="btn btn-ghost w-full lg:justify-start"
                >
                  <Settings size={18} />
                  <span className="hidden lg:inline">Settings</span>
                </button>
              </div>
            </div>

            {/* User */}
            <div className="flex items-center gap-3 bg-base-300 p-3 rounded-xl">
              <img
                src={authUser?.profilePic}
                alt={authUser?.fullName}
                className="w-10 h-10 rounded-full object-cover"
              />

              <div className="hidden lg:block">
                <h3 className="font-semibold">{authUser?.fullName}</h3>
                <p className="text-success text-sm">Online</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            

            <div className="flex items-center justify-between mb-6">
  <div className="flex items-center gap-3">
    <button
      onClick={() => navigate(-1)}
      className="btn btn-circle btn-ghost"
    >
      <ArrowLeft size={22} />
    </button>

    <h1 className="text-3xl font-bold">
      Chats
    </h1>
  </div>

  {/* <button
    onClick={() => navigate("/create-group")}
    className="btn btn-primary"
  >
    <Users size={18} />
    Create Group
  </button> */}
</div>

            {friends.length === 0 ? (
              <div className="bg-base-200 border border-base-300 rounded-2xl p-8 text-center shadow">
                <MessageCircle
                  className="mx-auto mb-3 text-primary"
                  size={40}
                />

                <h2 className="text-xl font-semibold">
                  No Friends Found
                </h2>

                <p className="text-base-content/70 mt-2">
                  Add friends to start chatting.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {friends.map((friend) => (
                  <div
                    key={friend._id}
                    onClick={() => navigate(`/chat/${friend._id}`)}
                    className="
                      bg-base-200
                      border border-base-300
                      rounded-2xl
                      p-4
                      flex
                      items-center
                      gap-4
                      cursor-pointer
                      hover:bg-base-300
                      transition
                    "
                  >
                    <img
                      src={friend.profilePic}
                      alt={friend.fullName}
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">
                        {friend.fullName}
                      </h3>

                      <p className="text-sm text-base-content/70">
                        Click to start chatting
                      </p>
                    </div>

                    <MessageCircle
                      size={22}
                      className="text-primary shrink-0"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatsListPage;