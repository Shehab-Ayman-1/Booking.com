import { Fragment, useState, useEffect } from "react";
import { Navbar } from "@/layout";
import { useAxios } from "@/hooks";
import { FilterOptions, FilterResults } from "@/components";
import "./styles/search.scss";

export const SearchPage = () => {
	const { data: cities } = useAxios("get", `/hotels/get-list-of?cities=All Locations`);
	const [widgetNo, setWidgetNo] = useState(0);
	const [openFilter, setOpenFilter] = useState(false);
	const [selectedCity, setSelectedCity] = useState("All Locations");

	useEffect(() => {
		setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 200);
	}, []);

	const handleOpenFilter = () => setOpenFilter((o) => (o = true));

	const filterOptions = { selectedCity, setSelectedCity, openFilter, setOpenFilter, widgetNo, setWidgetNo, cities };
	const filterResults = { widgetNo, setWidgetNo };

	return (
		<Fragment>
			<Navbar />
			<main className="main-section">
				<FilterOptions {...filterOptions} />
				<FilterResults {...filterResults} />
				<button className="mybtn filter-btn" data-varient="outline" onClick={handleOpenFilter}>
					Filter
				</button>
			</main>
		</Fragment>
	);
};
