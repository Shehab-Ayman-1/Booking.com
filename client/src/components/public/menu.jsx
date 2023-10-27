import { useState } from "react";
import "./styles/menu.scss";

export const Menu = ({ children, title, closeable, useArrow = true, hidden }) => {
	const [open, setOpen] = useState(false);
	const handleMenu = () => setOpen((o) => !o);
	const closeMenu = () => setOpen((o) => false);

	return (
		<div className={`menu-section ${hidden ? "hidden" : ""}`}>
			<div className={`menu-layer ${open ? "" : "hide-display"}`} onClick={closeMenu} />

			<div className="flex-between" onClick={handleMenu}>
				{typeof title === "string" ? <p>{title}</p> : title}
				{useArrow && <i className={`fas ${open ? "fa-chevron-down" : "fa-chevron-up"} text-black`} />}
			</div>

			{closeable && (
				<div className={`menu ${!open ? "hide-scale" : ""}`} onClick={handleMenu}>
					{children}
				</div>
			)}

			{!closeable && <div className={`menu ${!open ? "hide-scale" : ""}`}>{children}</div>}
		</div>
	);
};
