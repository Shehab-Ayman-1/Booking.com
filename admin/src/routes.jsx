import { BuildingOfficeIcon, HomeIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { ArrowRightOnRectangleIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Home, Users, Hotels, Login, Register } from "@/pages";

const icon = { className: "w-5 h-5 text-inherit" };

export const routes = [
   {
      layout: "dashboard",
      pages: [
         { icon: <HomeIcon {...icon} />, name: "dashboard", path: "/home", element: <Home /> },
         { icon: <UserGroupIcon {...icon} />, name: "Users", path: "/users", element: <Users /> },
         { icon: <BuildingOfficeIcon {...icon} />, name: "Hotels", path: "/hotels", element: <Hotels /> },
      ],
   },
   {
      title: "auth pages",
      layout: "auth",
      pages: [
         { icon: <ArrowRightOnRectangleIcon {...icon} />, name: "login", path: "/login", element: <Login /> },
         { icon: <UserPlusIcon {...icon} />, name: "register", path: "/register", element: <Register /> },
      ],
   },
];

export default routes;
