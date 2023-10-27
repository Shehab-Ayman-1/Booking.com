import { Routes, Route } from "react-router-dom";
import { Home, Hotel, SearchPage, Sign } from "@/pages";

function App() {
	return (
		<Routes>
			<Route path="*" element="This Route Not Defined" />
			<Route path="/" element={<Home />} />
			<Route path="/search" element={<SearchPage />} />
			<Route path="/hotel/:id" element={<Hotel />} />
			<Route path="/login" element={<Sign />} />
			<Route path="/register" element={<Sign />} />
		</Routes>
	);
}

export default App;
