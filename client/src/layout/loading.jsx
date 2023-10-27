import "./styles/loading.scss";

export const Loading = ({ limit }) => {
	return (
		<section className="loading-section">
			{[...Array(limit)].map((item, i) => (
				<div className="loading-box" key={i}>
					<div className="big" />
					<div className="thin-1" />
					<div className="thin-2" />
				</div>
			))}
		</section>
	);
};
