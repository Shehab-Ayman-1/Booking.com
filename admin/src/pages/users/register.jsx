import { Card, CardHeader, CardBody, CardFooter, Input, Checkbox, Typography, Button } from "@material-tailwind/react";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signBG, User } from "@/assets";
import { AuthFooter } from "@/components";
import { useAxios } from "@/hooks";
import axios from "axios";

const formState = { avatar: "", fName: "", lName: "", email: "", password: "", isAdmin: true };
export function Register() {
   const { data, loading, error, setError, refetch } = useAxios("post", "/");
   const [formData, setFormData] = useState(formState);
   const navigate = useNavigate();

   const handleChange = ({ target: { name, value, files } }) => {
      if (name === "avatar") setFormData((f) => (f = { ...f, avatar: files[0] }));
      else setFormData((f) => (f = { ...f, [name]: value }));
   };

   const handleSubmit = async () => {
      if (!formData.avatar) return setError(() => "Avatar Image Is A Required Field.");

      const file = new FormData();
      file.append("file", formData.avatar);
      file.append("upload_preset", "upload");

      try {
         const response = await axios.post("https://api.cloudinary.com/v1_1/dtmsuqzul/upload", file);
         const { data, loading, error } = await refetch("post", `/auths/register`, { ...formData, avatar: response.data?.url });

         if (!loading && error === null && typeof data === "string") navigate("/dashboard/home");
      } catch (error) {
         const err = error?.response?.data?.error?.message || error?.response?.data || error?.message;
         console.log(error);
         setError(() => err);
      }
   };

   return (
      <Fragment>
         <img src={signBG} className="absolute inset-0 z-0 h-full w-full object-cover" />

         <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />

         <div className="container mx-auto p-4">
            <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
               <CardHeader variant="gradient" color="blue" className="mb-4 grid h-28 place-items-center">
                  <Typography variant="h3" color="white">
                     Register
                  </Typography>
               </CardHeader>
               <CardBody className="flex flex-col gap-4">
                  {!error && !loading && typeof data === "string" && <h3 className="border-b border-t border-r border-l border-green-900 bg-green-500/20 p-2 text-center text-green-500">{data}</h3>}
                  {error && !loading && <h3 className="border-b border-t border-r border-l border-red-900 bg-red-500/20 p-2 text-center text-red-500">{error}</h3>}
                  <div className="">
                     <label htmlFor="avatar">
                        <img className="mx-auto h-[128px] w-[128px] cursor-pointer rounded-full" src={formData.avatar ? URL.createObjectURL(formData.avatar) : User} alt="avatar" />
                     </label>
                     <input type="file" className="hidden" accept="image/*" name="avatar" id="avatar" onChange={handleChange} />
                  </div>
                  <Input label="First Name" name="fName" size="lg" onChange={handleChange} />
                  <Input label="Last Name" name="lName" size="lg" onChange={handleChange} />
                  <Input type="email" label="Email" name="email" size="lg" onChange={handleChange} />
                  <Input type="password" label="Password" name="password" size="lg" onChange={handleChange} />
                  <div className="-ml-2.5">
                     <Checkbox label="I agree the Terms and Conditions" />
                  </div>
               </CardBody>
               <CardFooter className="pt-0">
                  <Button variant="gradient" disabled={loading} fullWidth onClick={handleSubmit}>
                     Register
                  </Button>
                  <AuthFooter label="Already Have An Account?" navigate="Login" />
               </CardFooter>
            </Card>
         </div>
      </Fragment>
   );
}
