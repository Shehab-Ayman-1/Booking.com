import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar as MTNavbar, MobileNav, Typography, IconButton } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function Navbar({ brandName, routes }) {
   const [openNav, setOpenNav] = useState(false);

   useEffect(() => {
      window.addEventListener("resize", () => {
         window.innerWidth >= 960 && setOpenNav(false);
      });
   }, []);

   const navList = (
      <ul className="mb-4 mt-2 flex flex-col gap-2 sm:mb-0 sm:mt-0 sm:flex-row sm:items-center sm:gap-6">
         {routes.map(({ name, path, Icon }) => (
            <Typography key={name} as="li" variant="small" color="blue-gray" className="capitalize">
               <Link to={path} className="flex items-center gap-1 p-1 font-normal">
                  {Icon && <Icon className="mr-1 h-[18px] w-[18px] opacity-50" />}
                  {name}asd
               </Link>
            </Typography>
         ))}
      </ul>
   );

   return (
      <MTNavbar className="p-3">
         <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
            <Link to="/">
               <Typography variant="small" className="mr-4 ml-2 cursor-pointer py-1.5 font-bold">
                  {brandName || " "}
               </Typography>
            </Link>

            <div className="hidden sm:block">{navList}</div>

            <IconButton variant="text" size="sm" className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent sm:hidden" onClick={() => setOpenNav(!openNav)}>
               {openNav ? <XMarkIcon strokeWidth={2} className="h-6 w-6" /> : <Bars3Icon strokeWidth={2} className="h-6 w-6" />}
            </IconButton>
         </div>

         <MobileNav open={openNav}>
            <div className="container mx-auto">{navList}</div>
         </MobileNav>
      </MTNavbar>
   );
}
