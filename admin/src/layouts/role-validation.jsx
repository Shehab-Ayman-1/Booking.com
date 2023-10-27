import { useNavigate, Navigate, Outlet } from "react-router-dom";
import { useContext } from "@/context";
import jwtDecode from "jwt-decode";

export const RoleValidation = () => {
   const [authsStates, authsDispatch] = useContext(1);
   const navigate = useNavigate();
   const decode = authsStates.auth?.accessToken ? jwtDecode(authsStates.auth?.accessToken) : null;

   if (decode) {
      setTimeout(() => {
         authsDispatch({ type: "RESET" });
         navigate("/auth/login", { state: `You Must To Relogin After ${authsStates.auth.expTime / (60 * 60 * 1000)} hours` });
      }, authsStates.auth.expTime);
   }

   return decode?.isAdmin ? <Outlet /> : <Navigate to="/auth/login" replace />;
};
