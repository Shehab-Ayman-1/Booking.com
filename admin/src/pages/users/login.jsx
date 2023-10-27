import { Card, CardHeader, CardBody, CardFooter, Input, Typography, Button } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signBG } from "@/assets";
import { AuthFooter } from "@/components";
import { useAxios } from "@/hooks";
import { useContext } from "@/context";

const formState = { email: "shehab@gmail.com", password: "123", trust: true };
export function Login() {
   const { data, loading, status, error, refetch } = useAxios("post", "/auths/login", formState);
   const [, authsDispatch] = useContext(1);
   const [formData, setFormData] = useState(formState);
   const jwtMessage = useLocation().state;
   const [jwtExp, setJwtExp] = useState(jwtMessage);
   const navigate = useNavigate();

   useEffect(() => {
      setTimeout(() => setJwtExp((e) => (e = "")), 5000);
   }, []);

   useEffect(() => {
      if (!error && !loading && status === 200 && typeof data === "object") {
         authsDispatch({ type: "GET_AUTH", payload: data });
         navigate("/dashboard/home");
      }
   }, [data, loading, error, status]);

   const handleChange = ({ target: { name, value } }) => {
      setFormData((f) => ({ ...f, [name]: value }));
   };

   const handleSubmit = async () => {
      if (!formData.email || !formData.password) return;
      await refetch("post", "/auths/login", formData);
   };

   return (
      <Fragment>
         <img src={signBG} className="absolute inset-0 z-0 h-full w-full object-cover" />

         <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />

         <div className="container mx-auto p-4">
            <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
               <CardHeader variant="gradient" color="blue" className="mb-4 grid h-28 place-items-center">
                  <Typography variant="h3" color="white">
                     Login
                  </Typography>
               </CardHeader>

               <CardBody className="flex flex-col gap-4">
                  {status !== 203 && !error && !loading && typeof data === "string" && (
                     <h3 className="border-b border-t border-r border-l border-green-900 bg-green-500/20 p-2 text-center text-green-500">{data}</h3>
                  )}
                  {loading && <p>Loading...</p>}
                  {status !== 203 && error && !loading && <h3 className="border-b border-t border-r border-l border-red-900 bg-red-500/20 p-2 text-center text-red-500">{error}</h3>}
                  {jwtExp && <h3 className="border-b border-t border-r border-l border-red-900 bg-red-500/20 p-2 text-center text-red-500">{jwtExp}</h3>}
                  <Input type="email" label={formData.email} name="email" size="lg" disabled={loading} onChange={handleChange} />
                  <Input type="password" label={formData.password} name="password" size="lg" disabled={loading} onChange={handleChange} />
               </CardBody>

               <CardFooter className="pt-0">
                  <Button variant="gradient" disabled={loading} fullWidth onClick={handleSubmit}>
                     Login
                  </Button>
                  <AuthFooter label="Don't Have An Account?" navigate="Register" />
               </CardFooter>
            </Card>
         </div>
      </Fragment>
   );
}
