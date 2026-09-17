import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuthUser from "../hooks/useAuthUser";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link, useNavigate } from "react-router";
import {
  CheckCircleIcon,
  Search,
  Home,
  MessageSquare,
  Phone,
  Users,
  Settings,
  Plus,
  Video,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
  MessageCircleIcon,
  PhoneCallIcon,
  BellIcon,
  UserIcon,
  SettingsIcon,
  UsersRoundIcon,
} from "lucide-react";

import { capitialize } from "../lib/utils";

import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";



const HomePage = () => {
  const { authUser } = useAuthUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
  <div className="min-h-screen bg-base-100 text-base-content p-4">
    <div className="flex gap-4 min-h-[95vh]">

      {/* SIDEBAR */}
      <div
  className="
  hidden sm:flex
  w-20
  lg:w-64
  shrink-0
  bg-base-200
  border border-base-300
  rounded-3xl
  p-4
  flex-col
  justify-between
"
>
  <div>

    <div className="space-y-2">

      <button className="btn btn-primary w-full lg:justify-start">
        <Home size={18} />
        <span className="hidden lg:inline">Home</span>
      </button>

      <button
        onClick={() => navigate("/chat")}
        className="btn btn-ghost w-full lg:justify-start"
      >
        <MessageCircleIcon size={18} />
        <span className="hidden lg:inline">Chats</span>
      </button>

      {/* <button
  onClick={() => navigate("/groups")}
  className="btn btn-ghost w-full lg:justify-start"
>
  <MessageCircleIcon size={18} />
  <span className="hidden lg:inline">
  View Groups</span>
</button> */}

      <button 
        onClick={() => navigate("/calls")}
        className="btn btn-ghost w-full lg:justify-start">
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

  <div className="bg-base-300 rounded-xl p-3 flex justify-center lg:justify-start items-center gap-3">
    <img
      src={authUser?.profilePic}
      className="w-10 h-10 rounded-full"
      alt=""
    />

    <div className="hidden lg:block">
      <h3 className="font-semibold">
        {authUser?.fullName}
      </h3>

      <p className="text-success text-sm">
        Online
      </p>
    </div>
  </div>
</div>

     {/* MAIN CONTENT */}
<div
  className="
  flex-1
  bg-base-200
  border
  border-base-300
  rounded-3xl
  p-4
  lg:p-6
  overflow-y-auto
"
>

<div className="sm:hidden fixed bottom-0 left-0 right-0 bg-base-200 border-t border-base-300 flex justify-around py-3 z-50">

  <button className="btn btn-ghost btn-circle">
    <Home size={20} />
  </button>

  <button
    onClick={() => navigate("/chat")}
    className="btn btn-ghost btn-circle"
  >
    <MessageCircleIcon size={20} />
  </button>

  <button 
    onClick={() => navigate("/calls")}
    className="btn btn-ghost btn-circle">
    <Phone size={20} />
  </button>

  <button
    onClick={() => navigate("/settings")}
    className="btn btn-ghost btn-circle"
  >
    <Settings size={20} />
  </button>

</div>

  {/* HEADER */}
  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
    <div>
      <h1 className="text-3xl font-bold">
        Welcome Back 👋
      </h1>

      <p className="text-base-content/70">
        Stay connected with your friends.
      </p>
    </div>

    <button className="btn btn-primary px-5 py-3 rounded-xl flex items-center gap-2">
      <Plus size={18} />
      New
    </button>
  </div>

  {/* RECENT CHATS */}
  <div>
    <div className="flex justify-between mb-4">
      <h2 className="text-xl font-semibold">
        Recent Chats
      </h2>

      <span className="text-primary cursor-pointer">
        View All
      </span>
    </div>

    <div className="space-y-3">
      {friends.slice(0, 6).map((friend) => (
        <div
  key={friend._id}
  className="
bg-base-300
rounded-2xl
p-4
flex
flex-col
sm:flex-row
sm:items-center
justify-between
gap-4
border
border-base-300
hover:bg-base-100
transition
"
>
          <div className="flex items-center gap-4">
            <img
              src={friend.profilePic}
              alt={friend.fullName}
              className="w-12 h-12 rounded-full"
            />

            <div>
              <h3 className="font-semibold">
                {friend.fullName}
              </h3>

              <p className="text-sm text-base-content/70">
                Start chatting...
              </p>
            </div>
          </div>

          <button
  onClick={() => navigate(`/chat/${friend._id}`)}
  className="
    btn
    btn-primary
    btn-sm
    w-24
    sm:w-28
    md:w-auto
    self-end
    sm:self-auto
  "
>
  Chat
</button>
        </div>
      ))}
    </div>
  </div>

  {/* FIND NEW FRIENDS */}
  <div className="mt-10">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">
        Find New Friends
      </h2>

      <span className="text-primary cursor-pointer">
        Discover
      </span>
    </div>

    {loadingUsers ? (
      <div className="text-base-content/70">
        Loading users...
      </div>
    ) : recommendedUsers.length === 0 ? (
      <div className="bg-base-300 p-6 rounded-2xl text-center text-base-content/70">
        No new users available.
      </div>
    ) : (
      <div className="
grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-3
gap-4
">
        {recommendedUsers.slice(0, 6).map((user) => (
          <div
            key={user._id}
            className="bg-base-300 rounded-2xl p-5 border border-base-300 hover:border-primary transition"
          >
            <div className="flex flex-col items-center text-center">
              <img
                src={user.profilePic}
                alt={user.fullName}
                className="w-16 h-16 rounded-full mb-3"
              />

              <h3 className="font-semibold">
                {user.fullName}
              </h3>

              <p className="text-sm text-base-content/70 mt-1">
                {user.nativeLanguage &&
                  `${capitialize(user.nativeLanguage)}`}
              </p>

              <button
                disabled={
                  outgoingRequestsIds.has(user._id) || isPending
                }
                onClick={() => sendRequestMutation(user._id)}
                className={`mt-4 w-full py-2 rounded-xl font-medium ${
                outgoingRequestsIds.has(user._id)
                    ? "btn btn-success"
                    : "btn btn-primary"
                }`}
              >
                {outgoingRequestsIds.has(user._id) ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircleIcon size={16} />
                    Request Sent
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <UserPlusIcon size={16} />
                    Add Friend
                  </span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>

</div>

</div>
</div>
);
};
export default HomePage;
