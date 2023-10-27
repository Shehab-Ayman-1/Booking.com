import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import { Menu } from "@/components";
import { useAxios } from "@/hooks";
import useContext, { UPDATE_HOTELS } from "@/context";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./styles/hero.scss";

let today = new Date();
export const Hero = () => {
	const { data: cities, error } = useAxios("get", "/hotels/get-list-of?cities=All Locations");
	const { hotelsDispatch } = useContext(0);

	const [calender, setCalender] = useState([{ startDate: today, endDate: today, key: "selection" }]);
	const [options, setOptions] = useState({ adults: 1, children: 1, rooms: 1 });
	const [selectedCity, setSelectedCity] = useState("");

	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("user"));

	const handleIncreament = ({ target }) => {
		let name = target.getAttribute("name");
		setOptions((o) => (o = { ...o, [name]: o[name] + 1 }));
	};

	const handleDecreament = ({ target }) => {
		let name = target.getAttribute("name");
		setOptions((o) => (o = { ...o, [name]: o[name] <= 0 ? o[name] : o[name] - 1 }));
	};

	const handleCity = ({ target }) => {
		setSelectedCity((c) => (c = target.getAttribute("name")));
	};

	const handleNavigate = async () => {
		if (endDate === today) return alert("Please Choose The Date.");

		await hotelsDispatch(UPDATE_HOTELS({ city: selectedCity || "All Locations", calender, options }));
		navigate(`/search`);
	};

	const startDate = new Date(calender[0].startDate).toLocaleDateString();
	const endDate = new Date(calender[0].endDate).toLocaleDateString();
	return (
		<section className="hero-section">
			<div className="hero">
				<h1 className="heading">A Lifetime Of discounts? It's Genius.</h1>
				<p className="description">Get Rewarded For Your Travils - Unlock Instant Saving Of 100% Or More With A Free Booking.com Account</p>
				{!user && (
					<button className="mybtn" data-varient="outline" onClick={() => navigate("/login")}>
						Login / Register
					</button>
				)}
			</div>

			{!error && error !== null && (
				<div className="search">
					<div className="locations">
						<Menu title={`${selectedCity || "Where Are You Going ?"}`} closeable>
							<h3 name="All Locations" onClick={handleCity}>
								All Locations
							</h3>
							{cities.map((selectedCity, i) => (
								<h3 name={selectedCity} onClick={handleCity} key={i}>
									{selectedCity}
								</h3>
							))}
						</Menu>
					</div>

					<div className="calender">
						<Menu
							title={
								<div className="">
									<p className="whitespace-none">From: [{startDate}]</p> <p className="whitespace-none">To: [{endDate}]</p>
								</div>
							}>
							<DateRange editableDateInputs={true} onChange={(item) => setCalender([item.selection])} moveRangeOnFirstSelection={false} ranges={calender} />
						</Menu>
					</div>

					<div className="options">
						<Menu title={`${options.adults} Adults, ${options.children} Children, ${options.rooms} Rooms`}>
							<div className="flex">
								<p className="name"> Adults </p>
								<p className="plus" name="adults" onClick={handleIncreament}>
									+
								</p>
								<p className="count">{options.adults}</p>
								<p className="minus" name="adults" onClick={handleDecreament}>
									-
								</p>
							</div>
							<div className="flex">
								<p className="name"> Children </p>
								<p className="plus" name="children" onClick={handleIncreament}>
									+
								</p>
								<p className="count">{options.children}</p>
								<p className="minus" name="children" onClick={handleDecreament}>
									-
								</p>
							</div>
							<div className="flex">
								<p className="name"> Rooms </p>
								<p className="plus" name="rooms" onClick={handleIncreament}>
									+
								</p>
								<p className="count">{options.rooms}</p>
								<p className="minus" name="rooms" onClick={handleDecreament}>
									-
								</p>
							</div>
						</Menu>
					</div>

					<button className="mybtn" data-varient="fill" onClick={handleNavigate}>
						Search
					</button>
				</div>
			)}
		</section>
	);
};
