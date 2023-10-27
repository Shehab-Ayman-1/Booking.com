import { Card, CardHeader, CardBody, CardFooter, Input, Typography, Button } from "@material-tailwind/react";
import { Fragment, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signBG, User } from "@/assets";
import { useAxios } from "@/hooks";
import axios from "axios";

export function UpdateUser() {
   const { data, loading, error, refetch } = useAxios("post", "/");
   const [formData, setFormData] = useState({});
   const { state } = useLocation();
   const navigate = useNavigate();

   const handleChange = ({ target: { name, value, files } }) => {
      if (name === "avatar") setFormData((f) => (f = { ...f, avatar: files[0] }));
      else setFormData((f) => (f = { ...f, [name]: value }));
   };

   const handleSubmit = async () => {
      try {
         if (formData?.avatar) {
            const file = new FormData();
            file.append("file", formData.avatar);
            file.append("upload_preset", "upload");

            const response = await axios.post("https://api.cloudinary.com/v1_1/dtmsuqzul/upload", file);
            const { data, loading, error } = await refetch("put", `/users/update-user/${state._id}`, { ...formData, avatar: response.data?.url || "" });
            if (!loading && error === null && typeof data === "string") setTimeout(() => navigate("/dashboard/Users"), 2000);
         } else {
            const { data, loading, error } = await refetch("put", `/users/update-user/${state._id}`, formData);
            if (!loading && error === null && typeof data === "string") setTimeout(() => navigate("/dashboard/Users"), 2000);
         }
      } catch (error) {
         console.log(error);
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
                     Update User
                  </Typography>
               </CardHeader>
               <CardBody className="flex flex-col gap-4">
                  {!error && !loading && typeof data === "string" && <h3 className="border-b border-t border-r border-l border-green-900 bg-green-500/20 p-2 text-center text-green-500">{data}</h3>}
                  {error && !loading && <h3 className="border-b border-t border-r border-l border-red-900 bg-red-500/20 p-2 text-center text-red-500">{error}</h3>}
                  <div className="w-full text-center">
                     <label htmlFor="avatar">
                        <img className="mx-auto h-[128px] w-[128px] cursor-pointer rounded-full" src={formData.avatar ? URL.createObjectURL(formData.avatar) : state?.avatar || User} alt="avatar" />
                     </label>
                     <input type="file" className="m-auto block w-fit" accept="image/*" name="avatar" id="avatar" onChange={handleChange} />
                  </div>
                  <Input label={state.fName} name="fName" size="lg" onChange={handleChange} />
                  <Input label={state.lName} name="lName" size="lg" onChange={handleChange} />
                  <Input label={state.email} name="email" size="lg" type="email" onChange={handleChange} />
                  <Input label="Password..." name="password" size="lg" type="password" onChange={handleChange} />
               </CardBody>
               <CardFooter className="pt-0">
                  <Button variant="gradient" disabled={loading} fullWidth onClick={handleSubmit}>
                     Update
                  </Button>
               </CardFooter>
            </Card>
         </div>
      </Fragment>
   );
}
