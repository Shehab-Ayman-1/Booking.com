import "./styles/testimonials.scss";

export const Testimonials = () => {
	return (
		<div className="testimonials-section">
			<h1>Save Time, Save Money!</h1>
			<p>Register And We'll Send The Best Deals For You</p>
			<div>
				<input type="email" placeholder="Enter Your Email..." />
				<button className="mybtn" data-varient="outline">
					Subscribe
				</button>
			</div>
		</div>
	);
};
