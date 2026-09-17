import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import toast from "react-hot-toast";

import useAuthUser from "../hooks/useAuthUser";
import {
  getStreamToken,
  getUserById,
} from "../lib/api";

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";


const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const { authUser } = useAuthUser();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  // Stream Token
  const {
    data: tokenData,
    isError: tokenError,
    error: tokenErrorObj,
  } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  // Fetch other user's data
  const { data: targetUser } = useQuery({
    queryKey: ["user", targetUserId],
    queryFn: () => getUserById(targetUserId),
    enabled: !!targetUserId,
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic || "",
          },
          tokenData.token
        );

        console.log(client.user);

        const channelId = [authUser._id, targetUserId]
          .sort()
          .join("-");

        const currChannel = client.channel(
          "messaging",
          channelId,
          {
            members: [authUser._id, targetUserId],
          }
        );

        await currChannel.watch();
        console.log(currChannel.state.members);
        console.log("Messages:", currChannel.state.messages);

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error(error);
        toast.error("Could not connect to chat.");
      } finally {
        setLoading(false);
      }
    };

    initChat();

    return () => {
      if (chatClient) {
        chatClient.disconnectUser();
      }
    };
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (!channel) return;

    const callUrl = `${window.location.origin}/call/${channel.id}`;

    channel.sendMessage({
      text: `I've started a video call. Join here: ${callUrl}`,
    });

    toast.success("Video call link sent!");
  };

  if (tokenError) {
    return (
      <div className="h-[93vh] flex justify-center items-center">
        {tokenErrorObj?.message}
      </div>
    );
  }

  if (loading || !chatClient || !channel) {
    return <ChatLoader />;
  }

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">

            <Window>

              {/* Custom Header */}
              <div className="flex justify-between items-center px-5 py-4 border-b bg-base-100">

                <div className="flex items-center gap-3">

                  <img
                    src={targetUser?.profilePic || "/avatar.png"}
                    alt={targetUser?.fullName}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <h2 className="font-bold text-lg">
                      {targetUser?.fullName}
                    </h2>

                    <p className="text-sm text-success">
                      Online
                    </p>
                  </div>

                </div>

                <CallButton handleVideoCall={handleVideoCall} />

              </div>

              <MessageList/>

              <MessageInput focus />

            </Window>

          </div>

          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;