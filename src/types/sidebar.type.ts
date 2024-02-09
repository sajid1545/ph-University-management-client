/* eslint-disable no-mixed-spaces-and-tabs */
import { ReactNode } from "react";

export type TUserPath = {
	name?: string;
	path?: string;
	element?: ReactNode;
	children?: TUserPath[];
};

export type TRoute = {
	path: string;
	element: ReactNode;
};

export type TSidebarItem =
	| {
			key: string;
			label: ReactNode;
			children?: TSidebarItem[];
	  }
	| undefined;
