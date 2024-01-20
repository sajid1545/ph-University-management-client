import {
	BaseQueryApi,
	BaseQueryFn,
	DefinitionType,
	FetchArgs,
	createApi,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logout, setUser } from "../features/Auth/authSlice";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:5000/api/v1",
	credentials: "include", // backend sends cookies
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).auth.token;
		if (token) {
			headers.set("authorization", `${token}`);
		}
		return headers;
	},
});

const baseQueryWithRefreshToken: BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType> = async (
	args,
	api,
	extraOptions
): Promise<any> => {
	let result = await baseQuery(args, api, extraOptions);
	console.log(result);
	if (result?.error?.status === 401) {
		//* Send refresh token
		console.log("sending refresh token");

		const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
			method: "POST",
			credentials: "include",
		});

		const data = await res.json();

		if (data?.data?.accessToken) {
			const user = (api.getState() as RootState).auth.user;

			api.dispatch(
				setUser({
					user,
					token: data.data.accessToken,
				})
			);

			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(logout());
		}
	}
	return result;
};

export const baseApi = createApi({
	reducerPath: "baseApi",
	baseQuery: baseQueryWithRefreshToken,

	endpoints: () => ({}),
});