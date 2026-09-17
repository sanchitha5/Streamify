import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import useAuthUser from "../hooks/useAuthUser";

import {
  ArrowLeft,
  Home,
  Phone,
  Settings,
  MessageCircleIcon,
  PhoneIncoming,
  PhoneOutgoing,
  Video,
} from "lucide-react";

const callHistory = [
  {
    id: 1,
    name: "John Doe",
    type: "incoming",
    mode: "video",
    time: "Today • 10:30 AM",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    type: "outgoing",
    mode: "audio",
    time: "Yesterday • 8:15 PM",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Alex Johnson",
    type: "incoming",
    mode: "video",
    time: "Yesterday • 4:00 PM",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Emily Brown",
    type: "outgoing",
    mode: "video",
    time: "2 days ago • 7:20 PM",
    image: "https://i.pravatar.cc/150?img=4",
  },
];

const CallHistory = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthUser();

  return (
    <>
      {/* Same Navbar as Chat & Settings */}
      <Navbar showActions={false} showNotification={true} />

      <div className="min-h-screen bg-base-100 text-base-content p-4">
        <div className="flex gap-6">

          {/* Sidebar */}
          <div
            className="
              w-20
              lg:w-64
              bg-base-200
              border
              border-base-300
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
                  <span className="hidden lg:inline">
                    Home
                  </span>
                </button>

                <button
                  onClick={() => navigate("/chat")}
                  className="btn btn-ghost w-full lg:justify-start"
                >
                  <MessageCircleIcon size={18} />
                  <span className="hidden lg:inline">
                    Chats
                  </span>
                </button>

                {/* Active */}
                <button className="btn btn-primary w-full lg:justify-start">
                  <Phone size={18} />
                  <span className="hidden lg:inline">
                    Calls
                  </span>
                </button>

                <button
                  onClick={() => navigate("/settings")}
                  className="btn btn-ghost w-full lg:justify-start"
                >
                  <Settings size={18} />
                  <span className="hidden lg:inline">
                    Settings
                  </span>
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

          {/* Main */}
          <div className="flex-1">

            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <button
                onClick={() => navigate(-1)}
                className="btn btn-circle btn-ghost"
              >
                <ArrowLeft size={22} />
              </button>

              <div>
                <h1 className="text-3xl font-bold">
                  Call History
                </h1>

              </div>
            </div>

            {/* Call Cards */}
<div className="space-y-4">
  {callHistory.map((call) => (
    <div
      key={call.id}
      className="bg-base-200 border border-base-300 rounded-2xl p-5 flex items-center justify-between hover:bg-base-300 transition"
    >
      <div className="flex items-center gap-4">
        <img
          src={call.image}
          alt={call.name}
          className="w-14 h-14 rounded-full object-cover"
        />

        <div>
          <h3 className="font-semibold text-lg">
            {call.name}
          </h3>

          <div className="flex items-center gap-2 text-sm text-base-content/70">
            {call.type === "incoming" ? (
              <PhoneIncoming
                size={16}
                className="text-success"
              />
            ) : (
              <PhoneOutgoing
                size={16}
                className="text-primary"
              />
            )}

            <span>
              {call.type === "incoming"
                ? "Incoming Call"
                : "Outgoing Call"}
            </span>

            <span>•</span>

            <span className="capitalize">
              {call.mode} Call
            </span>
          </div>

          <p className="text-xs text-base-content/60 mt-1">
            {call.time}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="btn btn-success btn-square">
          <Phone size={18} />
        </button>

        <button className="btn btn-primary btn-square">
          <Video size={18} />
        </button>
      </div>
    </div>
  ))}
</div>


                {/* Empty State */}
        {callHistory.length === 0 && (
          <div className="bg-base-200 border border-base-300 rounded-2xl p-10 text-center mt-8">
            <Phone className="mx-auto text-primary mb-4" size={50} />

            <h2 className="text-2xl font-semibold">
              No Calls Yet
            </h2>

            <p className="text-base-content/70 mt-2">
              Your recent voice and video calls will appear here.
            </p>
          </div>
        )}

      </div>
    </div>
  </div>
</>
  );
};

export default CallHistory;

