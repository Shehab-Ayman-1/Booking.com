import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReserveModel } from "..";
import "./styles/banner.scss";

export const Banner = ({ hotel: { _id, name, description, distance, rating } }) => {
	const [open, setOpen] = useState(false);
	const [user, setUser] = useState(null);
	const { pathname } = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		let user = JSON.parse(localStorage.getItem("user"));
		if (!user?.email) return;
		setUser((u) => (u = user));
	}, []);

	const openReserve = () => {
		if (user) return setOpen((o) => (o = true));

		let confirm = window.confirm("You must be registered to be available to book any hotel rooms.");
		if (confirm) navigate("/login", { state: { fromPathname: pathname } });
	};

	return (
		<section className="banner-section">
			<div className="banner">
				<div className="flex-between">
					<h1 className="title">{name}</h1>
					<button className="mybtn" data-varient="fill" onClick={openReserve}>
						Reserve Now !
					</button>
				</div>
				<div className="">
					<div className="flex-start">
						<i className="fas fa-bed text-dimWhite bed-icon" />
						<p className="description">{description}</p>
					</div>
					<p className="rate">
						{rating}
						<i className="fas fa-star text-black fa-xs" /> {rating > 8 ? "Excellent" : "Good"} Location - {distance}m From Center
					</p>
					<p className="green">Book A Stay Over $114 At This Property And Get A Free Airport Taxi</p>
				</div>
			</div>
			{_id && <ReserveModel hotelID={_id} open={open} setOpen={setOpen} />}
		</section>
	);
};
