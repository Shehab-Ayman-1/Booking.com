import { useCallback, useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { Menu } from "@/components";
import { useAxios } from "@/hooks";
import useContext, { UPDATE_HOTELS } from "@/context";
import "./styles/options.scss";

const today = new Date();
const formState = { city: "All Locations", options: { adults: 1, children: 1, rooms: 1 }, price: { min: 0, max: 0 } };
export const FilterOptions = ({ selectedCity, setSelectedCity, openFilter, setOpenFilter, widgetNo, setWidgetNo, cities }) => {
	const { data: hotels, loading, error, Refetch } = useAxios("get", `/`);
	const { hotelsState, hotelsDispatch } = useContext(0);
	const [formData, setFormData] = useState(formState);
	const [calender, setCalender] = useState([{ startDate: today, endDate: today, key: "selection" }]);
	const [stopRefetch, setStopRefetch] = useState(false);

	useEffect(() => {
		setWidgetNo((w) => (w = 0));
	}, [selectedCity]);

	useEffect(() => {
		setSelectedCity(() => formData.city);
		(async () => await hotelsDispatch(UPDATE_HOTELS({ hotels: hotels.hotels, hotelsCount: hotels.count, loading, error })))();
	}, [hotels, loading, error]);

	useEffect(() => {
		hotelsDispatch(UPDATE_HOTELS({ calender }));
	}, [calender]);

	useEffect(() => {
		(async () => {
			const { city, calender, options } = await hotelsState;
			setFormData((d) => (d = { ...d, city: city || "All Locations", options }));
			setCalender((c) => (c = [{ ...calender[0], key: "selection" }]));
		})();
	}, []);

	useEffect(() => {
		if (!stopRefetch) return setStopRefetch(true);

		Refetch("get", `/hotels/get-hotels?city=${formData.city || "All Locations"}&min=${formData.price.min}&max=${formData.price.max}&from=${widgetNo}`);
	}, [widgetNo, formData.city, stopRefetch]);

	const handleData = useCallback(
		({ target }) => {
			let id = target.getAttribute("id");
			let name = target.getAttribute("name");
			let value = target.value;

			if (id === "city") setFormData((d) => (d = { ...d, city: name }));
			if (id === "price") setFormData((d) => (d = { ...d, price: { ...d.price, [name]: +value } }));
			if (id === "options") setFormData((d) => (d = { ...d, options: { ...d.options, [name]: +value } }));
		},
		[formData.city, formData.price, formData.options]
	);

	const handleCloseMobileOptions = () => {
		setOpenFilter((o) => (o = false));
	};

	const handleRefetch = () => {
		Refetch("get", `/hotels/get-hotels?city=${formData.city || "All Locations"}&min=${formData.price.min}&max=${formData.price.max}`);
		setOpenFilter((o) => (o = false));
		setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 200);
	};

	const startDate = new Date(calender[0].startDate)?.toLocaleDateString();
	const endDate = new Date(calender[0].endDate)?.toLocaleDateString();
	return (
		<div className={`left-section ${openFilter ? "mobile" : ""}`}>
			<div className="heading">
				<i className="fas fa-times close-options-icon text-black" onClick={handleCloseMobileOptions} />
				<h3>Search</h3>
			</div>

			<div>
				<div className="locations">
					<Menu title={`${formData.city}`} closeable>
						<h3 name="All Locations" id="city" onClick={handleData}>
							All Locations
						</h3>
						{cities.map((city, i) => (
							<h3 name={city} id="city" onClick={handleData} key={i}>
								{city}
							</h3>
						))}
					</Menu>
				</div>

				<div className="dates">
					<h3>Check In Dates</h3>
					<div className="calender">
						<Menu
							title={
								<div>
									{<p>From: {startDate}</p>} {<p>To: {endDate}</p>}
								</div>
							}>
							<DateRange editableDateInputs={true} onChange={({ selection }) => setCalender([selection])} moveRangeOnFirstSelection={false} ranges={calender} />
						</Menu>
					</div>
				</div>

				<div className="options">
					<h3>Options</h3>
					<div className="option">
						<p>Min Price Per Night</p>
						<input type="number" id="price" name="min" value={formData.price.min} onChange={handleData} />
					</div>
					<div className="option">
						<p>Max Price Per Night</p>
						<input type="number" id="price" name="max" value={formData.price.max} onChange={handleData} />
					</div>
					<div className="option">
						<p>Adults</p>
						<input type="number" id="options" name="adults" value={formData.options.adults} onChange={handleData} />
					</div>
					<div className="option">
						<p>Children</p>
						<input type="number" id="options" name="children" value={formData.options.children} onChange={handleData} />
					</div>
					<div className="option">
						<p>Rooms</p>
						<input type="number" id="options" name="rooms" value={formData.options.rooms} onChange={handleData} />
					</div>
				</div>

				<button className="mybtn" data-varient="fill" onClick={handleRefetch}>
					Search
				</button>
			</div>
		</div>
	);
};
