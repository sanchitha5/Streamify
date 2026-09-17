import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import useAuthUser from "../hooks/useAuthUser";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";

import {
  ArrowLeft,
  Home,
  Settings,
  Phone,
  MessageCircleIcon,
  Users,
} from "lucide-react";

const CreateGroupPage = () => {
  const [groupName, setGroupName] = useState("");
const [description, setDescription] = useState("");
const [selectedMembers, setSelectedMembers] = useState([]);

const navigate = useNavigate();
  const { authUser } = useAuthUser();

const { data: friends = [], isLoading } = useQuery({
  queryKey: ["friends"],
  queryFn: getUserFriends,
});

const toggleMember = (id) => {
  if (selectedMembers.includes(id)) {
    setSelectedMembers(selectedMembers.filter((m) => m !== id));
  } else {
    setSelectedMembers([...selectedMembers, id]);
  }
};



const handleCreateGroup = () => {
  if (!groupName.trim()) {
    alert("Please enter a group name");
    return;
  }

  if (selectedMembers.length === 0) {
    alert("Please select at least one member");
    return;
  }

  const members = friends.filter((friend) =>
    selectedMembers.includes(friend._id)
  );

  const newGroup = {
    id: Date.now(),
    name: groupName,
    description,
    members,
  };

  const existingGroups =
    JSON.parse(localStorage.getItem("groups")) || [];

  existingGroups.push(newGroup);

  localStorage.setItem(
    "groups",
    JSON.stringify(existingGroups)
  );

  alert("Group created successfully!");

  navigate("/groups");
};

  



  return (
    <>
      <Navbar showActions={false} showNotification={true} />

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

                <button
                  onClick={() => navigate("/chat")}
                  className="btn btn-ghost w-full lg:justify-start"
                >
                  <MessageCircleIcon size={18} />
                  <span className="hidden lg:inline">Chats</span>
                </button>

                <button
                  onClick={() => navigate("/calls")}
                  className="btn btn-ghost w-full lg:justify-start"
                >
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
                <h3 className="font-semibold">
                  {authUser?.fullName}
                </h3>

                <p className="text-success text-sm">
                  Online
                </p>
              </div>
            </div>
          </div>

         {/* Main Content */}
<div className="flex-1">

  {/* Header */}
  <div className="flex items-center gap-3 mb-6">
    <button
      onClick={() => navigate(-1)}
      className="btn btn-circle btn-ghost"
    >
      <ArrowLeft size={22} />
    </button>

    <h1 className="text-3xl font-bold flex items-center gap-2">
      <Users size={30} />
      Create Group
    </h1>
  </div>

  {/* Card */}
  <div className="bg-base-200 border border-base-300 rounded-3xl shadow p-6 max-w-3xl">

    <div className="space-y-5">

      <input
        type="text"
        placeholder="Group Name"
        className="input input-bordered w-full"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />

      <textarea
        placeholder="Group Description"
        className="textarea textarea-bordered w-full"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div>
        <h2 className="text-lg font-semibold mb-3">
          Select Friends
        </h2>

        {isLoading ? (
          <div className="text-center py-5">
            Loading friends...
          </div>
        ) : friends.length === 0 ? (
          <div className="text-base-content/70">
            You don't have any friends yet.
          </div>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto">

            {friends.map((friend) => (
              <label
                key={friend._id}
                className="flex items-center justify-between bg-base-100 border border-base-300 rounded-2xl p-3 cursor-pointer hover:bg-base-300 transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={friend.profilePic}
                    alt={friend.fullName}
                    className="w-11 h-11 rounded-full object-cover"
                  />

                  <div>
                    <h3 className="font-semibold">
                      {friend.fullName}
                    </h3>

                    <p className="text-sm text-base-content/60">
                      Friend
                    </p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={selectedMembers.includes(friend._id)}
                  onChange={() => toggleMember(friend._id)}
                />
              </label>
            ))}

          </div>
        )}
      </div>

      <button
        onClick={handleCreateGroup}
        className="btn btn-primary w-full"
      >
        Create Group
      </button>

    </div>

  </div>

</div>
           

          </div>

      </div>
    </>
  );
};

export default CreateGroupPage;