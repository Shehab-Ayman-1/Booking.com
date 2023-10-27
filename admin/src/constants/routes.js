const headers = {
   headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer shehab",
   },
   withCredentials: true,
};

export const routes = {
   locale: {
      baseURL: "http://localhost:5000/api",
      ...headers,
   },
   remote: {
      baseURL: "https://booking-com-server.vercel.app/api",
      ...headers,
   },
};
