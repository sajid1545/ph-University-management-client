import { TQueryParam, TResponseRedux } from "../../../types";
import { TStudentOfferedCourse } from "../../../types/studentCourse.type";
import { baseApi } from "../../api/baseApi";

const studentCourseApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllStudentOfferedCourses: builder.query({
			query: (args) => {
				const params = new URLSearchParams();

				if (args) {
					args.forEach((item: TQueryParam) => {
						params.append(item.name, item.value as string);
					});
				}

				return {
					url: "/offered-courses/my-offered-courses",
					method: "GET",
					params: params,
				};
			},
			providesTags: ["offeredCourse"],
			transformResponse: (response: TResponseRedux<TStudentOfferedCourse[]>) => {
				return {
					data: response.data,
					meta: response.meta,
				};
			},
		}),
		getAllEnrolledCourses: builder.query({
			query: (args) => {
				const params = new URLSearchParams();

				if (args) {
					args.forEach((item: TQueryParam) => {
						params.append(item.name, item.value as string);
					});
				}

				return {
					url: "/enrolled-courses/my-enrolled-courses",
					method: "GET",
					params: params,
				};
			},
			providesTags: ["offeredCourse"],
			transformResponse: (response: TResponseRedux<any[]>) => {
				return {
					data: response.data,
					meta: response.meta,
				};
			},
		}),

		enrollCourse: builder.mutation({
			query: (data) => ({
				url: "/enrolled-courses/enroll-into-course",
				method: "POST",
				body: data,
			}),
			invalidatesTags: ["offeredCourse"],
		}),
	}),
});

export const {
	useGetAllStudentOfferedCoursesQuery,
	useEnrollCourseMutation,
	useGetAllEnrolledCoursesQuery,
} = studentCourseApi;
