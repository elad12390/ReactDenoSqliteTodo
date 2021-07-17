import { useEffect } from "react";

export function useGetRequestHook(url: string, callback: (data: any) => void) {
	return useEffect(() => {
		// POST request using fetch inside useEffect React hook
		const requestOptions = {
			method: 'GET'
		};
		fetch(url, requestOptions)
			.then(response => {
				response.json().then((data) => callback(data));
			});
	}, []);
	
}