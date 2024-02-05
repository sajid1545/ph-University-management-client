import { TQueryParam, TResponseRedux, TStudent } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		// Students
		getAllStudents: builder.query({
			query: (args) => {
				const params = new URLSearchParams();

				if (args) {
					args.forEach((item: TQueryParam) => {
						params.append(item.name, item.value as string);
					});
				}

				return {
					url: "/students",
					method: "GET",
					params: params,
				};
			},
			transformResponse: (response: TResponseRedux<TStudent[]>) => {
				return {
					data: response.data,
					meta: response.meta,
				};
			},
		}),
		getSingleStudent: builder.query({
			query: (id) => ({
				url: `/students/${id}`,
				method: "GET",
			}),
		}),
		addStudent: builder.mutation({
			query: (data) => ({
				url: "/users/create-student",
				method: "POST",
				body: data,
			}),
		}),
		updateStudent: builder.mutation({
			query: ({ id, data }) => ({
				url: `/students/${id}`,
				method: "PATCH",
				body: data,
			}),
		}),

		// Faculties
		getAllFaculties: builder.query({
			query: (args) => {
				const params = new URLSearchParams();

				if (args) {
					args.forEach((item: TQueryParam) => {
						params.append(item.name, item.value as string);
					});
				}

				return {
					url: "/faculties",
					method: "GET",
					params: params,
				};
			},
			transformResponse: (response: TResponseRedux<TStudent[]>) => {
				return {
					data: response.data,
					meta: response.meta,
				};
			},
		}),
		getSingleFaculty: builder.query({
			query: (id) => ({
				url: `/faculties/${id}`,
				method: "GET",
			}),
		}),
		addFaculty: builder.mutation({
			query: (data) => ({
				url: "/users/create-faculty",
				method: "POST",
				body: data,
			}),
		}),
		updateFaculty: builder.mutation({
			query: ({ id, data }) => ({
				url: `/faculties/${id}`,
				method: "PATCH",
				body: data,
			}),
		}),

		// Admins
		getAllAdmins: builder.query({
			query: (args) => {
				const params = new URLSearchParams();

				if (args) {
					args.forEach((item: TQueryParam) => {
						params.append(item.name, item.value as string);
					});
				}

				return {
					url: "/admins",
					method: "GET",
					params: params,
				};
			},
			transformResponse: (response: TResponseRedux<TStudent[]>) => {
				return {
					data: response.data,
					meta: response.meta,
				};
			},
		}),
		getSingleAdmin: builder.query({
			query: (id) => ({
				url: `/admins/${id}`,
				method: "GET",
			}),
		}),
		addAdmin: builder.mutation({
			query: (data) => ({
				url: "/users/create-admin",
				method: "POST",
				body: data,
			}),
		}),
		updateAdmin: builder.mutation({
			query: ({ id, data }) => ({
				url: `/admins/${id}`,
				method: "PATCH",
				body: data,
			}),
		}),
	}),
});

export const {
	useAddStudentMutation,
	useGetAllStudentsQuery,
	useGetSingleStudentQuery,
	useUpdateStudentMutation,
	useAddFacultyMutation,
	useGetAllFacultiesQuery,
	useGetSingleFacultyQuery,
	useUpdateFacultyMutation,
	useAddAdminMutation,
	useGetAllAdminsQuery,
	useGetSingleAdminQuery,
	useUpdateAdminMutation,
} = userManagementApi;
