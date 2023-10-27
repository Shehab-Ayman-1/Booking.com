import { Routes, Route } from "react-router-dom";
import { ChartPieIcon, UserPlusIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { Login, Register, UpdateUser } from "@/pages";
import { RoleValidation } from "./role-validation";
import { Navbar } from "@/widgets";

export function Auth() {
   const navbarRoutes = [
      { name: "dashboard", path: "/dashboard/home", Icon: ChartPieIcon },
      { name: "register", path: "/auth/register", Icon: UserPlusIcon },
      { name: "login", path: "/auth/login", Icon: ArrowRightOnRectangleIcon },
   ];

   return (
      <div className="relative min-h-screen w-full">
         <div className="container relative z-40 mx-auto p-4">
            <Navbar routes={navbarRoutes} />
         </div>
         <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<RoleValidation />}>
               <Route path="/register" element={<Register />} />
               <Route path="/update-user" element={<UpdateUser />} />
            </Route>
         </Routes>
      </div>
   );
}
