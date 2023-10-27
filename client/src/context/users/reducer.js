export const usersReducer = async (states, { type, payload }) => {
	const state = await states;

	switch (type) {
		case "SIGN_UP": {
			return state;
		}
		case "SIGN_IN": {
			return state;
		}
		case "SIGN_OUT": {
			return state;
		}
		default: {
			return state;
		}
	}
};
