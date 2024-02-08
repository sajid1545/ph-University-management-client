import { z } from "zod";

export const offeredCourseSchema = z.object({
	semesterRegistration: z.string({ required_error: "Please select a semester registration" }),
	academicSemester: z.string({ required_error: "Please select a semester" }),
	academicDepartment: z.string({ required_error: "Please select a department" }),

	course: z.string({ required_error: "Please select a course" }),
	faculty: z.string({ required_error: "Please select a faculty" }),
	maxCapacity: z.string({
		required_error: "Please enter max capacity",
	}),
	section: z.string({
		required_error: "Please enter section",
	}),
	days: z.array(z.string(), { required_error: "Please select a day" }),
	startTime: z.object({}),
	endTime: z.object({}),
});
