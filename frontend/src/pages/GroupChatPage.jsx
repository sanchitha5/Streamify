// import { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import useAuthUser from "../hooks/useAuthUser";
// import { useQuery } from "@tanstack/react-query";
// import { getStreamToken } from "../lib/api";

// import {
//   Chat,
//   Channel,
//   Window,
//   ChannelHeader,
//   MessageList,
//   MessageInput,
//   Thread,
// } from "stream-chat-react";

// import { StreamChat } from "stream-chat";

// import ChatLoader from "../components/ChatLoader";
// import CallButton from "../components/CallButton";

// import toast from "react-hot-toast";

// const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

// const GroupChatPage = () => {
//   const { id: groupId } = useParams();

//   const { authUser } = useAuthUser();

//   const [chatClient, setChatClient] = useState(null);
//   const [channel, setChannel] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const {
//     data: tokenData,
//     isError: tokenError,
//     error: tokenErrorObj,
//   } = useQuery({
//     queryKey: ["streamToken"],
//     queryFn: getStreamToken,
//     enabled: !!authUser,
//     retry: false,
//   });

//   useEffect(() => {
//     const initChat = async () => {
//       if (!tokenData?.token || !authUser) return;

//       try {
//         const client = StreamChat.getInstance(STREAM_API_KEY);

//         await client.connectUser(
//           {
//             id: authUser._id,
//             name: authUser.fullName,
//             image: authUser.profilePic,
//           },
//           tokenData.token
//         );

//         // Open existing group channel
//         const currChannel = client.channel(
//           "messaging",
//           groupId
//         );

//         await currChannel.watch();

//         setChatClient(client);
//         setChannel(currChannel);
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed to load group chat.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     initChat();

//     return () => {
//       if (chatClient) {
//         chatClient.disconnectUser();
//       }
//     };
//   }, [tokenData, authUser, groupId]);

//   const handleVideoCall = () => {
//     if (!channel) return;

//     const callUrl = `${window.location.origin}/call/${channel.id}`;

//     channel.sendMessage({
//       text: `Join our video call: ${callUrl}`,
//     });

//     toast.success("Video call link sent!");
//   };

//   if (tokenError) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         {tokenErrorObj?.message}
//       </div>
//     );
//   }

//   if (loading || !chatClient || !channel) {
//     return <ChatLoader />;
//   }

//   return (
//     <div className="h-[93vh]">
//       <Chat client={chatClient}>
//         <Channel channel={channel}>
//           <div className="relative w-full">

//             <CallButton
//               handleVideoCall={handleVideoCall}
//             />

//             <Window>
//               <ChannelHeader />
//               <MessageList />
//               <MessageInput focus />
//             </Window>

//           </div>

//           <Thread />
//         </Channel>
//       </Chat>
//     </div>
//   );
// };

// export default GroupChatPage;