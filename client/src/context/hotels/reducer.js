export const hotelsReducer = async (states, { type, payload }) => {
	const state = await states;

	switch (type) {
		case "UPDATE_HOTELS": {
			return { ...state, ...payload };
		}

		default: {
			return state;
		}
	}
};
