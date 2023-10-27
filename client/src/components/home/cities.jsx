import { useAxios } from "@/hooks";
import { Loading, Error } from "@/layout";
import { citiesImages } from "@/constants";
import "./styles/cities.scss";

export const Cities = () => {
	const { data, loading, error } = useAxios("get", "/hotels/get-list-of?cities=Sispony,Arinsal,Ordino");
	const cities = data?.map((item, i) => ({ ...item, img: citiesImages[i] }));

	if (loading) return <Loading limit={3} />;
	if (error || error === null) return <Error message="Catagories Not Found, Please Try Again Later" />;

	return (
		<section className="widgets-section">
			{cities.map(({ img, city, count }, i) => (
				<div className="widget" key={i}>
					<img src={img} alt={city} />
					<h1>{city}</h1>
					<h3>{count} Properties</h3>
				</div>
			))}
		</section>
	);
};
