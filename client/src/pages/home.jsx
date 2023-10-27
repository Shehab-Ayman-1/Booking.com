import { Navbar, Footer } from "@/layout";
import { Hero, Cities, Types, Features, Testimonials } from "@/components";

export const Home = () => {
	return (
		<div className="page">
			<Navbar />
			<Hero />
			<Cities />
			<Types />
			<Features />
			<Testimonials />
			<Footer />
		</div>
	);
};
