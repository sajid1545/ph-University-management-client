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
			transformResponse: (response: TResponseRedux<TStudentOfferedCourse[]>) => {
				return {
					data: response.data,
					meta: response.meta,
				};
			},
		}),

		// addStudent: builder.mutation({
		// 	query: (data) => ({
		// 		url: "/users/create-student",
		// 		method: "POST",
		// 		body: data,
		// 	}),
		// 	invalidatesTags: ["Student"],
		// }),
	}),
});

export const { useGetAllStudentOfferedCoursesQuery } = studentCourseApi;
