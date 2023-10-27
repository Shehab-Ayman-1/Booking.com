import { footer } from "@/constants";
import "./styles/footer.scss";

export const Footer = () => {
	return (
		<footer>
			<nav>
				{footer.map((group, i) => (
					<div className="" key={i}>
						{group.map((link, i) => (
							<div className="flex-start" key={i}>
								<i className="fas fa-chevron-right text-primary" />
								<p className="link">{link}</p>
							</div>
						))}
					</div>
				))}
			</nav>
			<p className="copyright">Copyright © 1996-2022 Booking.com™. All rights reserved.</p>
		</footer>
	);
};
