import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
	data: {
		message: string;
		stack: string;
		status: number;
	};
};

export type TMeta = {
	limit: number;
	page: number;
	total: number;
	totalPage: number;
};

export type TResponse<T> = {
	data?: T;
	meta?: TMeta;
	error?: TError;
	success: boolean;
	message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
	name: string;
	value: boolean | React.Key;
};
