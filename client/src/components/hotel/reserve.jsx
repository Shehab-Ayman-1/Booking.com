import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useContext from "@/context";
import "./styles/reserve.scss";

export const Reserve = ({ title, price }) => {
	const { hotelsState } = useContext(0);
	const [calender, setCalender] = useState([{ startDate: "", endDate: "" }]);
	const [days, setDays] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			let { calender } = await hotelsState;
			if (calender.length && calender[0]?.startDate !== calender[0]?.endDate) return setCalender((d) => (d = calender));

			alert("Please Select The Start, And End Dates To Be Able Reserve The Hotel Rooms.");
			navigate("/search");
		})();
	}, [hotelsState]);

	useEffect(() => {
		let date1 = new Date(calender[0].startDate);
		let date2 = new Date(calender[0].endDate);
		let day = 1000 * 60 * 60 * 24;
		let millSecondsOfAllDays = Math.abs(date2.getTime() - date1.getTime());
		let daysCount = Math.ceil(millSecondsOfAllDays / day);
		setDays((d) => (d = daysCount));
	}, [calender]);

	return (
		<section className="reserve-section">
			<div className="description">
				<h1 className="title">{title}</h1>
				<p className="desc">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde odit eligendi voluptas aut, nobis libero, animi quibusdam corrupti natus iusto culpa veniam enim molestiae maxime eos
					excepturi, cupiditate et ex!
				</p>
				<p className="desc">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde odit eligendi voluptas aut, nobis libero, animi quibusdam corrupti natus iusto culpa veniam enim molestiae maxime eos
					excepturi, cupiditate et ex!
				</p>
			</div>
			<div className="reserve">
				<h3 className="title">Perfect For {days} Nights-Stay</h3>
				<p className="desc">Located In The Real Heart Of Krakow.</p>
				<p className="desc">This Property Has An Excellent Location Score Of 9.8</p>
				<div className="flex-start">
					<h1 className="price">${price * days}</h1>
					<p className="nights">({days} Nights)</p>
				</div>
				<button className="mybtn" data-varient="fill">
					Reserve OR Book Now !
				</button>
			</div>
		</section>
	);
};
