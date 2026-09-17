// import { Link, useLocation } from "react-router";
// import useAuthUser from "../hooks/useAuthUser";

// import {
//   Home,
//   Users,
//   Bell,
//   Settings,
//   MessageCircle,
//   Video,
// } from "lucide-react";

// const Sidebar = () => {
//   const { authUser } = useAuthUser();
//   const location = useLocation();

//   const menuItems = [
//     {
//       icon: Home,
//       label: "Home",
//       path: "/",
//     },
//     {
//       icon: MessageCircle,
//       label: "Chats",
//       path: "/chat",
//     },
//     {
//       icon: Video,
//       label: "Calls",
//       path: "/calls",
//     },
//     {
//       icon: Users,
//       label: "Friends",
//       path: "/friends",
//     },
//     {
//       icon: Bell,
//       label: "Notifications",
//       path: "/notifications",
//     },
//     {
//       icon: Settings,
//       label: "Settings",
//       path: "/settings",
//     },
//   ];

//   return (
//     <aside className="hidden lg:flex flex-col w-72 bg-[#0B1220] border-r border-white/10 h-screen sticky top-0">

//       {/* Logo */}
//       <div className="p-6 border-b border-white/10">
//         <Link
//           to="/"
//           className="flex items-center gap-3"
//         >
//           <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center">
//             <Video className="h-5 w-5 text-white" />
//           </div>

//           <div>
//             <h1 className="text-xl font-bold text-white">
//               VidChat
//             </h1>

//             <p className="text-xs text-gray-400">
//               Dashboard
//             </p>
//           </div>
//         </Link>
//       </div>

//       {/* Navigation */}
//       <div className="flex-1 p-4">

//         <div className="space-y-2">
//           {menuItems.map((item) => {
//             const active = location.pathname === item.path;

//             return (
//               <Link
//                 key={item.label}
//                 to={item.path}
//                 className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
//                   active
//                     ? "bg-violet-600 text-white"
//                     : "text-gray-400 hover:bg-[#121A2B] hover:text-white"
//                 }`}
//               >
//                 <item.icon size={20} />
//                 <span>{item.label}</span>
//               </Link>
//             );
//           })}
//         </div>

//       </div>

//       {/* User Card */}
//       <div className="p-4 border-t border-white/10">

//         <div className="bg-[#121A2B] rounded-xl p-3 flex items-center gap-3">

//           <img
//             src={authUser?.profilePic}
//             alt="Profile"
//             className="w-12 h-12 rounded-full object-cover"
//           />

//           <div>
//             <h3 className="font-semibold text-white text-sm">
//               {authUser?.fullName}
//             </h3>

//             <div className="flex items-center gap-2 mt-1">
//               <div className="w-2 h-2 rounded-full bg-green-500" />

//               <span className="text-xs text-green-400">
//                 Online
//               </span>
//             </div>
//           </div>

//         </div>

//       </div>
//     </aside>
//   );
// };

// export default Sidebar;