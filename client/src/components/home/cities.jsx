import { useNavigate } from "react-router-dom";
import { useAxios } from "@/hooks";
import { Loading, Error } from "@/layout";
import { citiesImages } from "@/constants";
import useContext, { UPDATE_HOTELS } from "@/context";
import "./styles/cities.scss";

export const Cities = () => {
	const { data, loading, error } = useAxios("get", "/hotels/get-list-of?cities=Encamp,Arinsal,Ordino");
	const { hotelsDispatch } = useContext(0);
	const navigate = useNavigate();

	const cities = data?.map((item, i) => ({ ...item, img: citiesImages[i] }));

	const handleNavigate = async (cty) => {
		const calender = [{ startDate: new Date(), endDate: new Date(), key: "selection" }];
		const options = { adults: 1, children: 1, rooms: 1 };
		const city = cty || "All Locations";

		await hotelsDispatch(UPDATE_HOTELS({ city, calender, options }));
		navigate("/search");
	};

	if (loading) return <Loading limit={3} />;
	if (error || error === null) return <Error message="Catagories Not Found, Please Try Again Later" />;

	return (
		<section className="widgets-section">
			{cities.map(({ img, city, count }, i) => (
				<div className="widget" key={i} onClick={() => handleNavigate(city)}>
					<img src={img} alt={city} />
					<h1>{city}</h1>
					<h3>{count} Properties</h3>
				</div>
			))}
		</section>
	);
};
