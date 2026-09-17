import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon, ArrowLeft, Home, Phone, Settings, MessageCircleIcon } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import useAuthUser from "../hooks/useAuthUser.js";

const NotificationsPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { authUser } = useAuthUser(); 

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
  <>
    <Navbar 
    showNotification={false}
    showActions={false} />  

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

          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-circle btn-ghost"
            >
              <ArrowLeft size={22} />
            </button>

            <h1 className="text-3xl font-bold">
              Notifications
            </h1>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <>
              {incomingRequests.length > 0 && (
                <section className="space-y-4 mb-8">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <UserCheckIcon className="h-5 w-5 text-primary" />
                    Friend Requests
                    <span className="badge badge-primary">
                      {incomingRequests.length}
                    </span>
                  </h2>

                  <div className="space-y-3">
                    {incomingRequests.map((request) => (
                      <div
                        key={request._id}
                        className="card bg-base-200 shadow-sm"
                      >
                        <div className="card-body p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="w-14 rounded-full">
                                  <img
                                    src={request.sender.profilePic}
                                    alt={request.sender.fullName}
                                  />
                                </div>
                              </div>

                              <div>
                                <h3 className="font-semibold">
                                  {request.sender.fullName}
                                </h3>

                                <div className="flex gap-2 mt-1 flex-wrap">
                                  <span className="badge badge-secondary badge-sm">
                                    Native: {request.sender.nativeLanguage}
                                  </span>

                                  <span className="badge badge-outline badge-sm">
                                    Learning: {request.sender.learningLanguage}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() =>
                                acceptRequestMutation(request._id)
                              }
                              disabled={isPending}
                            >
                              Accept
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {acceptedRequests.length > 0 && (
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <BellIcon className="h-5 w-5 text-success" />
                    New Connections
                  </h2>

                  <div className="space-y-3">
                    {acceptedRequests.map((notification) => (
                      <div
                        key={notification._id}
                        className="card bg-base-200 shadow-sm"
                      >
                        <div className="card-body p-4">
                          <div className="flex items-start gap-3">
                            <div className="avatar">
                              <div className="w-10 rounded-full">
                                <img
                                  src={notification.recipient.profilePic}
                                  alt={notification.recipient.fullName}
                                />
                              </div>
                            </div>

                            <div className="flex-1">
                              <h3 className="font-semibold">
                                {notification.recipient.fullName}
                              </h3>

                              <p className="text-sm my-1">
                                {notification.recipient.fullName} accepted your
                                friend request
                              </p>

                              <p className="text-xs flex items-center opacity-70">
                                <ClockIcon className="h-3 w-3 mr-1" />
                                Recently
                              </p>
                            </div>

                            <div className="badge badge-success">
                              <MessageSquareIcon className="h-3 w-3 mr-1" />
                              New Friend
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {incomingRequests.length === 0 &&
                acceptedRequests.length === 0 && (
                  <NoNotificationsFound />
                )}
            </>
          )}
        </div>
      </div>
    </div>
  </>
);
};
export default NotificationsPage;
