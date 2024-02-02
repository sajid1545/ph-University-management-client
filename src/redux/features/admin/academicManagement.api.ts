import { TQueryParam, TResponseRedux } from "../../../types";
import { TAcademicFaculty, TAcademicSemester } from "../../../types/academicManagement.type";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllSemesters: builder.query({
			query: (args) => {
				console.log("🚀 ~ args:", args);

				const params = new URLSearchParams();

				if (args) {
					args.forEach((item: TQueryParam) => {
						params.append(item.name, item.value as string);
					});
				}

				return {
					url: "/academic-semesters",
					method: "GET",
					params: params,
				};
			},
			transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
				return {
					data: response.data,
					meta: response.meta,
				};
			},
		}),
		addAcademicSemester: builder.mutation({
			query: (data) => ({
				url: "/academic-semesters/create-academic-semester",
				method: "POST",
				body: data,
			}),
		}),

		// Academic Faculty

		getAllAcademicFaculties: builder.query({
			query: () => {
				return {
					url: "/academic-faculties",
					method: "GET",
				};
			},
			transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
				return {
					data: response.data,
					meta: response.meta,
				};
			},
		}),

		addAcademicFaculty: builder.mutation({
			query: (data) => ({
				url: "/academic-faculties/create-academic-faculty",
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const {
	useGetAllSemestersQuery,
	useAddAcademicSemesterMutation,
	useAddAcademicFacultyMutation,
	useGetAllAcademicFacultiesQuery,
} = academicManagementApi;
