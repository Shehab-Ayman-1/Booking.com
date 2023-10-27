import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import { Sidenav, DashboardNavbar, Configurator } from "@/widgets";
import { useContext, setOpenConfigurator } from "@/context";
import { AddHotel, UpdateHotel } from "@/pages";
import routes from "@/routes";

export function Dashboard() {
   const [, dispatch] = useContext();

   return (
      <div className="min-h-screen bg-blue-gray-50/50">
         <Sidenav routes={routes} />
         <div className="p-4 xl:ml-80">
            <DashboardNavbar />
            <Configurator />
            <IconButton size="lg" color="white" className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10" ripple={false} onClick={() => setOpenConfigurator(dispatch, true)}>
               <Cog6ToothIcon className="h-5 w-5" />
            </IconButton>
            <Routes>
               {routes.map(({ layout, pages }) => {
                  return (
                     layout === "dashboard" &&
                     pages.map(({ path, element }) => {
                        return <Route exact path={path} element={element} />;
                     })
                  );
               })}
               <Route path="/add-hotel" element={<AddHotel />} />
               <Route path="/update-hotel" element={<UpdateHotel />} />
            </Routes>
         </div>
      </div>
   );
}
