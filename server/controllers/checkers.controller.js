export const CHECK_AUTHENTICATION = async (req, res, next) => {
	try {
		res.status(200).json({ isAuthenticated: true, info: req.user });
	} catch (error) {
		res.status(404).json(error);
	}
};

export const CHECK_USER = async (req, res) => {
	try {
		res.status(200).json({ isUserLoggedIn: true, params: req.params, info: req.user });
	} catch (error) {
		res.status(404).json(error);
	}
};

export const CHECK_ADMIN = async (req, res) => {
	try {
		res.status(200).json({ isAdmin: true, info: req.user });
	} catch (error) {
		res.status(404).json(error);
	}
};
