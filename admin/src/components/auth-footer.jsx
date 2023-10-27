import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

export const AuthFooter = ({ label, navigate }) => {
   const { pathname } = useLocation();

   return (
      <Fragment>
         <Typography variant="small" className="mt-6 flex justify-center">
            {label}
            <Link to={pathname === "/auth/register" ? "/auth/login" : "/auth/register"}>
               <Typography as="span" variant="small" color="blue" className="ml-1 font-bold">
                  {navigate}
               </Typography>
            </Link>
         </Typography>
      </Fragment>
   );
};
