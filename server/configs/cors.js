const whiteList = [
	"https://booking-com-admin.netlify.app",
	"https://booking-com-client.netlify.app",
	"https://booking-app-server.netlify.app",
	"http://localhost:5000",
	"http://localhost:5173",
	"http://localhost:5174",
];

export const corsOrigins = {
	origin: (origin, callback) => {
		const isAcceptable = whiteList.some((site) => site === origin);

		if (isAcceptable || origin === undefined) callback(null, origin); // origin = undefined -> on localhost
		else callback(`${origin}: Not Allowed By CORS`);
	},
	credentials: true,
	optionsSuccessStatus: 200,
};
