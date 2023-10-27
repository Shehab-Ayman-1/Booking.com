import { useState } from "react";
import "./styles/slider.scss";

export const Slider = ({ photos }) => {
	let [open, setOpen] = useState({ state: false, slide: 0 });

	return (
		<section className="slider-section">
			<div className="images-container">
				{photos.map((photo, i) => (
					<img src={photo} alt="photo" key={i} onClick={() => setOpen((o) => (o = { state: true, slide: i }))} />
				))}
			</div>
			<div className={`slider ${open.state ? "" : "hide-display"}`}>
				<div className="overlay" onClick={() => setOpen((o) => (o = { ...o, state: false }))} />
				<i className="fa fa-times-circle close-icon" onClick={() => setOpen((o) => (o = { ...o, state: false }))} />
				<div className="wrapper">
					{photos.map((photo, i) => (
						<img className={`slide ${i === +open.slide ? "active" : ""}`} src={photo} alt="photo" key={i} />
					))}
				</div>
				<i className="fa fa-chevron-right next" onClick={() => setOpen((o) => (o = { ...o, slide: o.slide >= photos.length - 1 ? o.slide : o.slide + 1 }))} />
				<i className="fa fa-chevron-left prev" onClick={() => setOpen((o) => (o = { ...o, slide: o.slide <= 0 ? o.slide : o.slide - 1 }))} />
			</div>
		</section>
	);
};
