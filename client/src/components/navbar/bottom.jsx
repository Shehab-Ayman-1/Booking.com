import "./styles/bottom.scss";

export const ButtomSection = () => {
	return (
		<div className="bottom-section">
			<div className="label">
				<label htmlFor="stays">
					<i className="fas fa-bed" /> stays
				</label>
				<input type="radio" name="label" id="stays" defaultChecked />
			</div>
			<div className="label">
				<label htmlFor="flights">
					<i className="fas fa-plane" /> flights
				</label>
				<input type="radio" name="label" id="flights" />
			</div>
			<div className="label">
				<label htmlFor="car-rentals">
					<i className="fas fa-car" /> cars
				</label>
				<input type="radio" name="label" id="car-rentals" />
			</div>
			<div className="label">
				<label htmlFor="attractions">
					<i className="fas fa-bed" /> attractions
				</label>
				<input type="radio" name="label" id="attractions" />
			</div>
			<div className="label">
				<label htmlFor="airport-taxis">
					<i className="fas fa-taxi" /> taxis
				</label>
				<input type="radio" name="label" id="airport-taxis" />
			</div>
		</div>
	);
};
