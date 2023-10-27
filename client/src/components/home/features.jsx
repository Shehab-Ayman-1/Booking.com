import { useAxios } from "@/hooks";
import { Error, Loading } from "@/layout";
import "./styles/features.scss";

export const Features = () => {
	const { data: features, loading, error } = useAxios("get", "/hotels/get-hotels?featured=true&city=All Locations&limit=4");

	return (
		<section className="features-section">
			<h1>Homes Guests Love</h1>
			<div className="features">
				{loading && <Loading limit={3} />}
				{(error || error === null) && <Error message="Features Not Found, Please Try Again" />}
				{features.map(({ name, city, price, rating, photos }) => (
					<div className="feature" key={name}>
						<img src={photos[0]} alt={name} />
						<h3>{name}</h3>
						<p>{city}</p>
						<h4>Starting From ${price}</h4>
						<div className="rate">
							<span>
								{rating} <i className="fas fa-star" />
							</span>
							<p>{rating > 8 ? "Exceptional" : "Excellent"}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};
