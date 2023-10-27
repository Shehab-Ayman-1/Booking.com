import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "@/hooks";
import { Footer, Navbar } from "@/layout";
import { Banner, Reserve, Slider, Testimonials } from "@/components";

const formState = { _id: "", name: "", title: "", rating: "", distance: "", description: "", price: "" };
export const Hotel = () => {
	const { id } = useParams();
	const { data, loading, error } = useAxios("get", `/hotels/get-hotel/${id}`);
	const [hotel, setHotel] = useState(formState);

	useEffect(() => {
		if (!loading && !error) setHotel((h) => (h = data));
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [data]);

	return (
		<Fragment>
			<Navbar />
			<Banner hotel={hotel} />
			<Slider photos={data?.photos || []} />
			<Reserve title={hotel.title} price={hotel.price} />
			<Testimonials />
			<Footer />
		</Fragment>
	);
};
