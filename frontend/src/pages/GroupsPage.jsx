// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
// import Navbar from "../components/Navbar";
// import useAuthUser from "../hooks/useAuthUser";

// import {
//   ArrowLeft,
//   Home,
//   Phone,
//   Settings,
//   MessageCircleIcon,
//   Users,
// } from "lucide-react";

// const GroupsPage = () => {
//   const navigate = useNavigate();
//   const { authUser } = useAuthUser();
//   const [groups, setGroups] = useState([]);

//   useEffect(() => {
//     const savedGroups =
//       JSON.parse(localStorage.getItem("groups")) || [];
//     setGroups(savedGroups);
//   }, []);

//   return (
//     <>
//       <Navbar showActions={false} showNotification={true} />

//       <div className="min-h-screen bg-base-100 text-base-content p-4">
//         <div className="flex gap-6">

//           {/* Sidebar */}
//           <div className="w-20 lg:w-64 bg-base-200 border border-base-300 rounded-3xl p-4 flex flex-col justify-between h-[calc(100vh-7rem)] sticky top-24">

//             <div className="space-y-2">
//               <button
//                 onClick={() => navigate("/")}
//                 className="btn btn-ghost w-full lg:justify-start"
//               >
//                 <Home size={18} />
//                 <span className="hidden lg:inline">Home</span>
//               </button>

//               <button
//                 onClick={() => navigate("/chat")}
//                 className="btn btn-ghost w-full lg:justify-start"
//               >
//                 <MessageCircleIcon size={18} />
//                 <span className="hidden lg:inline">Chats</span>
//               </button>

//               <button
//                 onClick={() => navigate("/calls")}
//                 className="btn btn-ghost w-full lg:justify-start"
//               >
//                 <Phone size={18} />
//                 <span className="hidden lg:inline">Calls</span>
//               </button>

//               <button className="btn btn-primary w-full lg:justify-start">
//                 <Users size={18} />
//                 <span className="hidden lg:inline">Groups</span>
//               </button>

//               <button
//                 onClick={() => navigate("/settings")}
//                 className="btn btn-ghost w-full lg:justify-start"
//               >
//                 <Settings size={18} />
//                 <span className="hidden lg:inline">Settings</span>
//               </button>
//             </div>

//             <div className="flex items-center gap-3 bg-base-300 p-3 rounded-xl">
//               <img
//                 src={authUser?.profilePic}
//                 alt={authUser?.fullName}
//                 className="w-10 h-10 rounded-full"
//               />

//               <div className="hidden lg:block">
//                 <h3 className="font-semibold">
//                   {authUser?.fullName}
//                 </h3>
//                 <p className="text-success text-sm">
//                   Online
//                 </p>
//               </div>
//             </div>

//           </div>

//           {/* Main */}
//           <div className="flex-1">

//             <div className="flex items-center gap-3 mb-8">
//               <button
//                 onClick={() => navigate(-1)}
//                 className="btn btn-circle btn-ghost"
//               >
//                 <ArrowLeft size={22} />
//               </button>

//               <div>
//                 <h1 className="text-3xl font-bold">
//                   Groups
//                 </h1>

//                 <p className="text-base-content/70">
//                   Manage your groups
//                 </p>
//               </div>
//             </div>

//             {groups.length === 0 ? (
//               <div className="bg-base-200 rounded-3xl p-10 text-center border border-base-300">
//                 <Users
//                   size={50}
//                   className="mx-auto text-primary mb-4"
//                 />

//                 <h2 className="text-2xl font-bold">
//                   No Groups Yet
//                 </h2>

//                 <button
//                   className="btn btn-primary mt-6"
//                   onClick={() => navigate("/create-group")}
//                 >
//                   Create Group
//                 </button>
//               </div>
//             ) : (
//               <div className="grid gap-5">
//                 {groups.map((group) => (
//                   <div
//   key={group.id}
//   onClick={() => navigate(`/group/${group.id}`)}
//   className="bg-base-200 border border-base-300 rounded-3xl p-6 shadow-sm cursor-pointer hover:bg-base-300 transition"
// >
//                     <h2 className="text-xl font-bold">
//                       {group.name}
//                     </h2>

//                     <p className="mt-2 text-base-content/70">
//                       {group.description}
//                     </p>

//                     <p className="mt-4 font-semibold">
//                       👥 {group.members.length} Members
//                     </p>

//                     <div className="flex flex-wrap gap-3 mt-4">
//                       {group.members.map((member) => (
//                         <div
//                           key={member._id}
//                           className="badge badge-primary badge-lg"
//                         >
//                           {member.fullName}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//           </div>

//         </div>
//       </div>
//     </>
//   );
// };

// export default GroupsPage;