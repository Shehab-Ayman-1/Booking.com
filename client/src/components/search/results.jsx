import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Error } from "@/layout";
import useContext from "@/context";
import "./styles/results.scss";

export const FilterResults = ({ widgetNo, setWidgetNo }) => {
	const [hotels, setHotels] = useState({ data: [], hotelsCount: 1, loading: true, error: false });
	const { hotelsState } = useContext(0);
	const { controller } = useContext(2);
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			let { hotels, hotelsCount, loading, error } = await hotelsState;
			setHotels((h) => (h = { data: hotels, hotelsCount, loading, error }));
		})();
	}, [hotelsState]);

	const nextWidget = () => {
		if (widgetNo + 5 >= hotels.hotelsCount) return;

		setWidgetNo((w) => (w = w + 5));
		setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 200);
	};

	const prevWidget = () => {
		if (widgetNo - 5 <= 0) return;

		setWidgetNo((w) => (w = w - 5));
		setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 200);
	};

	const handleNavigate = async (_id) => {
		let { calender } = await hotelsState;
		if (!calender?.length || calender[0]?.startDate === calender[0]?.endDate) return alert("Please Select The Start, And End Dates To Be Able To Reserve The Hotel Rooms.");
		navigate(`/hotel/${_id}`, { replace: true, preventScrollReset: false });
	};

	return (
		<div className={`right-section ${controller.openSearchPage ? "part-width" : "full-width"}`}>
			{hotels.error && <Error message="Hotels Not Found, Please Try Again." />}
			{!hotels.loading && !hotels.error && !hotels.data?.length && <h3>No Hotels Found.</h3>}
			{hotels.data?.map(({ _id, name, type, address, city, description, distance, price, rating, photos }, i) => (
				<div className="box" key={i}>
					<div className="img">
						<img src={photos[0]} alt={type} />
					</div>
					<div className="content">
						<div className="flex-between">
							<h1 className="title">{name}</h1>
							<span className="rate">
								{rating}
								<i className="fas fa-star" />
							</span>
						</div>
						<p className="address">
							{address} - {city}
						</p>
						<p className="distance">{distance}m From Center </p>
						<span className="green free">Free Airport Taxi</span>
						<h4 className="description">{description}</h4>
						<div className="flex-between">
							<p className="apartments">{type}</p>
							<h1 className="price">${price}</h1>
						</div>
						<div className="flex-between">
							<p className="green">Free Cancellation</p>
							<p className="fees">Includes Taxis And Fees</p>
						</div>
						<div className="flex-between">
							<p className="green">You Can Cancel Later, So Lock In This Great Price Today!</p>
							<button className="mybtn" data-varient="fill" onClick={() => handleNavigate(_id)}>
								See Availability
								<i className="fas fa-chevron-right fa-xs" />
							</button>
						</div>
					</div>
				</div>
			))}
			<div className="next-prev">
				<button className="fa fa-arrow-left text-black bg-white" disabled={hotels.loading} onClick={prevWidget} />
				<div className="">
					<span className="count">{widgetNo / 5 + 1}</span>
					<span className="count"> / {Math.ceil(+hotels.hotelsCount / 5)}</span>
				</div>
				<button className="fa fa-arrow-right text-black bg-white" disabled={hotels.loading} onClick={nextWidget} />
			</div>
		</div>
	);
};
