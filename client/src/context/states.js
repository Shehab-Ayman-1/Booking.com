const today = new Date();
export const hotelsStates = {
	loading: true,
	error: false,
	hotels: [],
	city: "",
	calender: [{ startDate: today, endDate: today }],
	options: { rooms: 0, adults: 0, children: 0 },
};

export const usersStates = {
	loading: true,
	error: false,
	user: { _id: "", fName: "", lName: "", email: "", createdAt: "", updatedAt: "" },
};

export const configsStates = {
	openSearchPage: true,
};
