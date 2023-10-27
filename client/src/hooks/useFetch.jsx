import { useEffect, useState } from "react";
import { routes } from "@/constants";
import axios from "axios";

let router;
if (import.meta.env.MODE === "production") router = axios.create(routes.remote);
else router = axios.create(routes.locale);

export const useAxios = (process, url, body) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const fetcher = async (process, url, body) => {
		if (url === "/") return;
		try {
			setLoading((l) => (l = true));
			setError((e) => (e = false));
			if (body) {
				const response = await router[process](url, body);
				setData((d) => (d = response.data));
				return { data: response?.data, loading: false, error: false };
			} else {
				const response = await router[process](url);
				setData((d) => (d = response.data));
				return { data: response?.data, loading: false, error: false };
			}
		} catch (error) {
			const err = error?.response?.data || error?.message || "Something Has An Error.";
			setError(() => err);
			console.warn(error);
			setTimeout(() => setError((e) => (e = null)), 5000);
			return { loading: false, error: err };
		} finally {
			setLoading((l) => (l = false));
		}
	};

	useEffect(() => {
		fetcher(process, url, body);
	}, [process, url, body]);

	const Refetch = async (process, url, body) => await fetcher(process, url, body);

	return { data, loading, error, Refetch };
};
