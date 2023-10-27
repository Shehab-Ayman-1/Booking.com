import { Routes, Route, Navigate } from "react-router-dom";
import { RoleValidation, Dashboard, Auth } from "@/layouts";

function App() {
   return (
      <Routes>
         {/* Auths */}
         <Route path="/auth/*" element={<Auth />} />

         {/* Dashboard */}
         <Route path="/" element={<RoleValidation />}>
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/*" element={<Navigate to="/dashboard/home" replace />} />
         </Route>
      </Routes>
   );
}

export default App;
