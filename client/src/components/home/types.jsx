import { useAxios } from "@/hooks";
import { typesImages } from "@/constants";
import { Error, Loading } from "@/layout";
import "./styles/types.scss";

export const Types = () => {
	const { data, loading, error } = useAxios("get", "/hotels/get-list-of?types=Hostels,Resorts,Villas,Ryokans");

	const types = data?.map((item, i) => ({ ...item, img: typesImages[i] }));

	return (
		<section className="types-section">
			<h1>Browse By Property Type</h1>
			<div className="types">
				{loading && <Loading limit={3} />}
				{(error || error === null) && <Error message="Types Not Found, Please Try Again" />}
				{types?.map(({ img, type, count }, i) => (
					<div className="type" key={i}>
						<img src={img} alt={type} />
						<h2>{type}</h2>
						<p>
							{count} {type}
						</p>
					</div>
				))}
			</div>
		</section>
	);
};
