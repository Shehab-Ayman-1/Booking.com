import { Card, CardHeader, CardBody, Button, Input, Select, Option, Typography, Avatar } from "@material-tailwind/react";
import { StarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "@/hooks";
import { Hotel } from "@/assets";
import { useEffect } from "react";
import axios from "axios";

const formState = { name: "", title: "", type: "", address: "", city: "", description: "", distance: 0, price: 0, rating: 0, rooms: [], photos: [], featured: false };
export const AddHotel = () => {
   const [formData, setFormData] = useState(formState);
   const { loading, error, refetch } = useAxios("get", "/");
   const { refetch: createHotelRefetch } = useAxios("post", "/");
   const [rooms, setRooms] = useState([]);
   const navigate = useNavigate();

   useEffect(() => {
      (async () => {
         if (rooms.length) return;
         const { data } = await refetch("get", "/rooms/get-rooms?selected=true&title");
         setRooms((r) => (r = data));
      })();
   }, []);

   const handlePhotos = (event) => setFormData((f) => ({ ...f, photos: event.target.files }));
   const handleText = (event) => setFormData((f) => ({ ...f, [event.target.name]: event.target.value }));
   const handleDistance = (event) => setFormData((f) => ({ ...formData, distance: +event.target.value }));
   const handlePrice = (event) => setFormData((f) => ({ ...formData, price: +event.target.value }));
   const handleRating = (value) => setFormData((f) => ({ ...formData, rating: +value }));
   const handleType = (value) => setFormData((f) => ({ ...formData, type: value }));
   const handleFeatured = (value) => setFormData((f) => ({ ...formData, featured: value === "true" ? true : false }));
   const handleRooms = (event) => setFormData((f) => ({ ...formData, rooms: Array.from(event.target.selectedOptions, (option) => option.value) }));

   const handleSubmit = async () => {
      const { featured, ...fields } = formData;

      if (!formData.photos.length) return alert("Atleast 1 Photo Is Required.");
      if (!formData.rooms.length) return alert("Atleast 1 Room Is Required.");
      if (!Object.values(fields).every((item) => item)) return alert("All Fields Are Required.");

      try {
         // GET An Array Contain The Photos URLs After These Photos Upload On cloudinary
         const promise = Array.from(formData.photos).map(async (photo) => {
            const data = new FormData();
            data.append("file", photo);
            data.append("upload_preset", "upload");

            const response = await axios.post("https://api.cloudinary.com/v1_1/dtmsuqzul/upload", data);
            return response.data.url;
         });
         const photosURLs = await Promise.all(promise);

         // POST The FormData With The Photos URLS To The Server
         const { data, loading, error } = await createHotelRefetch("post", "/hotels/create-hotel", { ...formData, photos: photosURLs });
         if (!loading && !error && typeof data === "string") {
            setTimeout(() => navigate("/dashboard/hotels"), 1500);
            alert(data);
         }
         if (!loading && error) alert(error);
      } catch (error) {
         console.log(error);
         alert(error.message);
      }
   };

   return (
      <Card>
         <CardHeader floated shadow variant="gradient" color="blue" className="m-0 flex items-center justify-between p-6">
            <Typography variant="h2" color="white">
               Add New Hotel
            </Typography>
         </CardHeader>
         <CardBody>
            <div className="mx-auto mb-5 w-fit">
               <label htmlFor="photos">
                  <img
                     className="mx-auto h-[150px] w-[150px] cursor-pointer rounded-full border-4 border-black"
                     src={formData.photos.length ? URL.createObjectURL(formData.photos[0]) : Hotel}
                     alt="photos"
                  />
                  <div className="flex w-[300px] items-center justify-center gap-4 overflow-x-auto">
                     {Array.from(formData.photos)
                        .slice(1)
                        .map((img, key) => (
                           <Avatar src={img ? URL.createObjectURL(img) : Hotel} alt="photo" size="md" variant="circular" className={`cursor-pointer border-2 border-white`} key={key} />
                        ))}
                  </div>
               </label>
               <Input type="file" className="w-fit text-center" accept="image/*" multiple name="photos" id="photos" onChange={handlePhotos} />
            </div>
            <div className="mb-4 flex flex-col items-center justify-between gap-4 md:flex-row">
               <Input label="Name" name="name" size="lg" disabled={loading} onChange={handleText} />
               <Input label="Title" name="title" size="lg" disabled={loading} onChange={handleText} />
            </div>
            <div className="mb-4 flex flex-col items-center justify-between gap-4 md:flex-row">
               <Input label="City" name="city" size="lg" disabled={loading} onChange={handleText} />
               <Input label="Address" name="address" size="lg" disabled={loading} onChange={handleText} />
            </div>
            <div className="mb-4 flex flex-col items-center justify-between gap-4 md:flex-row">
               <Input type="number" label="Distance From City Center" name="distance" size="lg" disabled={loading} onChange={handleDistance} />
               <Input type="number" label="Price" name="price" size="lg" disabled={loading} onChange={handlePrice} />
            </div>
            <div className="mb-4 flex flex-col items-center justify-between gap-4 md:flex-row">
               <Select label="Rating" name="rating" size="lg" disabled={loading} onChange={handleRating}>
                  <Option value="1">
                     1 <StarIcon className="inline h-5 w-5 text-inherit" />
                  </Option>
                  <Option value="2">
                     2 <StarIcon className="inline h-5 w-5 text-inherit" />
                  </Option>
                  <Option value="3">
                     3 <StarIcon className="inline h-5 w-5 text-inherit" />
                  </Option>
                  <Option value="4">
                     4 <StarIcon className="inline h-5 w-5 text-inherit" />
                  </Option>
                  <Option value="5">
                     5 <StarIcon className="inline h-5 w-5 text-inherit" />
                  </Option>
                  <Option value="6">
                     6 <StarIcon className="inline h-5 w-5 text-inherit" />
                  </Option>
                  <Option value="7">
                     7 <StarIcon className="inline h-5 w-5 text-inherit" />
                  </Option>
                  <Option value="8">
                     8 <StarIcon className="inline h-5 w-5 text-inherit" />
                  </Option>
                  <Option value="9">
                     9 <StarIcon className="inline h-5 w-5 text-inherit" />
                  </Option>
                  <Option value="10">
                     10 <StarIcon className="inline h-5 w-5 text-inherit" />
                  </Option>
               </Select>
               <Select label="Type" name="type" size="lg" disabled={loading} onChange={handleType}>
                  {["Hotel", "Apartment", "Resort", "Villa", "Cabine"].map((type) => (
                     <Option value={type} key={type}>
                        {type}
                     </Option>
                  ))}
               </Select>
            </div>
            <div className="mb-4 flex flex-col items-center justify-between gap-4 md:flex-row">
               <Select label="Featured" name="featured" size="lg" disabled={loading} onChange={handleFeatured}>
                  <Option value="false">False</Option>
                  <Option value="true">True</Option>
               </Select>
               <div className="relative w-full rounded-lg border border-blue-gray-200 ">
                  <label
                     htmlFor=""
                     className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-4 flex h-full w-full select-none text-[13px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                  >
                     Rooms
                  </label>
                  <select
                     className="peer h-full max-h-[100px] w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                     name="rooms"
                     size="lg"
                     multiple
                     disabled={loading}
                     onChange={handleRooms}
                  >
                     {!loading && !error && rooms?.length ? (
                        rooms.map(({ _id, title }) => (
                           <option value={_id} key={_id} className="font-normal text-blue-gray-400">
                              {title}
                           </option>
                        ))
                     ) : (
                        <option value="">No Rooms Found.</option>
                     )}
                  </select>
               </div>
            </div>
            <div className="mb-4">
               <Input label="Description" name="description" size="lg" disabled={loading} onChange={handleText} />
            </div>
            <Button className="mx-auto max-w-[450px]" variant="gradient" color="blue" size="lg" disabled={loading} onClick={handleSubmit} fullWidth>
               Submit
            </Button>
         </CardBody>
      </Card>
   );
};
