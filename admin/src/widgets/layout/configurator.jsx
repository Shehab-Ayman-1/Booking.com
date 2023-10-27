import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Switch, Typography } from "@material-tailwind/react";
import { useContext, setOpenConfigurator, setSidenavColor, setSidenavType, setFixedNavbar } from "@/context";

export function Configurator() {
   const [controller, dispatch] = useContext();
   const { openConfigurator, sidenavColor, sidenavType, fixedNavbar } = controller;

   const sidenavColors = {
      blue: "from-blue-100 to-blue-900",
      "blue-gray": "from-blue-gray-100 to-blue-gray-900",
      green: "from-green-100 to-green-900",
      orange: "from-orange-100 to-orange-900",
      red: "from-red-100 to-red-900",
      pink: "from-pink-100 to-pink-900",
   };

   return (
      <aside className={`fixed top-0 right-0 z-50 h-screen w-96 bg-white px-2.5 shadow-lg transition-transform duration-300 ${openConfigurator ? "translate-x-0" : "translate-x-96"}`}>
         <div className="flex items-start justify-between px-6 pt-8 pb-6">
            <div>
               <Typography variant="h5" color="blue-gray">
                  Dashboard Configurator
               </Typography>
               <Typography className="font-normal text-blue-gray-600">See our dashboard options.</Typography>
            </div>
            <IconButton variant="text" color="blue-gray" onClick={() => setOpenConfigurator(dispatch, false)}>
               <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
            </IconButton>
         </div>
         <div className="py-4 px-6">
            <div className="mb-12">
               <Typography variant="h6" color="blue-gray">
                  Sidenav Colors
               </Typography>
               <div className="mt-3 flex items-center gap-2">
                  {Object.keys(sidenavColors).map((color) => (
                     <span
                        key={color}
                        className={`h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 ${sidenavColors[color]} ${
                           sidenavColor === color ? "border-black" : "border-transparent"
                        }`}
                        onClick={() => setSidenavColor(dispatch, color)}
                     />
                  ))}
               </div>
            </div>
            <div className="mb-12">
               <Typography variant="h6" color="blue-gray">
                  Sidenav Types
               </Typography>
               <Typography variant="small" color="gray">
                  Choose between 3 different sidenav types.
               </Typography>
               <div className="mt-3 flex items-center gap-2">
                  <Button variant={sidenavType === "dark" ? "gradient" : "outlined"} onClick={() => setSidenavType(dispatch, "dark")}>
                     Dark
                  </Button>
                  <Button variant={sidenavType === "transparent" ? "gradient" : "outlined"} onClick={() => setSidenavType(dispatch, "transparent")}>
                     Transparent
                  </Button>
                  <Button variant={sidenavType === "white" ? "gradient" : "outlined"} onClick={() => setSidenavType(dispatch, "white")}>
                     White
                  </Button>
               </div>
            </div>
            <div className="mb-12">
               <hr />
               <div className="flex items-center justify-between py-5">
                  <Typography variant="h6" color="blue-gray">
                     Navbar Fixed
                  </Typography>
                  <Switch id="navbar-fixed" value={fixedNavbar} onChange={() => setFixedNavbar(dispatch, !fixedNavbar)} />
               </div>
            </div>
         </div>
      </aside>
   );
}
