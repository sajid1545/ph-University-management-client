import { TAcademicSemester } from ".";

export type TSemester = {
	_id: string;
	academicSemester: TAcademicSemester;
	status: string;
	startDate: string;
	endDate: string;
	minCredit: number;
	maxCredit: number;
	createdAt: string;
	updatedAt: string;
};

export type TCourse = {
	_id: string;
	title: string;
	prefix: string;
	code: number;
	credits: number;
	isDeleted: boolean;
	preRequisiteCourses: TPreRequisiteCourse[];
	__v: number;
};
export type TPreRequisiteCourse = {
	course: TCourse;
	isDeleted: boolean;
	_id: string;
};

export type TOfferedCourse = {
	_id: string;
	semesterRegistration: string;
	academicSemester: string;
	academicFaculty: string;
	academicDepartment: string;
	course: string;
	faculty: string;
	maxCapacity: number;
	section: number;
	days: string[];
	startTime: string;
	endTime: string;
	createdAt: string;
	updatedAt: string;
};
