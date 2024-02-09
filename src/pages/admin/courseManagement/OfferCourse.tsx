import { Button, Col, Flex } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatcht";
import { useGetAllAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";
import {
	useAddOfferedCourseMutation,
	useGetAllCoursesQuery,
	useGetAllRegisteredSemestersQuery,
	useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement.api";

import moment from "moment";
import { toast } from "sonner";
import PHTimePicker from "../../../components/form/PHTimePicker";
import { daysOption } from "../../../constants/global";
import { TResponse } from "../../../types";

const OfferCourse = () => {
	const [addOfferedCourse] = useAddOfferedCourseMutation();
	const [courseId, setCourseId] = useState("");

	// semester registration
	const { data: registeredSemesterData } = useGetAllRegisteredSemestersQuery(undefined);
	const registeredSemesterOptions = registeredSemesterData?.data?.map((item) => ({
		value: item._id,
		label: `${item?.academicSemester?.name} ${item?.academicSemester?.year}`,
	}));

	// academic departments
	const { data: academicDepartmentData } = useGetAllAcademicDepartmentsQuery(undefined);
	const academicDepartmentOptions = academicDepartmentData?.data?.map((item) => ({
		value: item._id,
		label: `${item.name}`,
	}));

	// courses
	const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);
	const coursesOptions = courses?.data?.map((item) => ({
		value: item._id,
		label: `${item.title}`,
	}));

	// course faculties
	const { data: courseFaculties, isFetching: isFetchingCourseFaculties } =
		useGetCourseFacultiesQuery(courseId, { skip: !courseId });
	const coursesFaculties = courseFaculties?.data?.faculties?.map(
		(item: { _id: string; name: { firstName: string; middleName: string; lastName: string } }) => ({
			value: item._id,
			label: `${item.name.firstName} ${item.name.middleName} ${item.name.lastName}`,
		})
	);

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const toastId = toast.loading("Offering course...");

		const OfferCourseData = {
			...data,
			academicFaculty: academicDepartmentData?.data?.find(
				(item) => item._id === data.academicDepartment
			)?.academicFaculty?._id,
			section: Number(data.section),
			maxCapacity: Number(data.maxCapacity),
			startTime: moment(new Date(data.startTime)).format("HH:mm"),
			endTime: moment(new Date(data.endTime)).format("HH:mm"),
		};

		try {
			const res = (await addOfferedCourse(OfferCourseData)) as TResponse<any>;
			if (res.error) {
				toast.error(res.error.data.message, { id: toastId });
			} else {
				toast.success("Course offered successfully", { id: toastId });
			}
		} catch (error) {
			toast.error("Something went wrong", { id: toastId });
		}
	};

	return (
		<>
			<h1 style={{ textAlign: "center", margin: "20px" }}>Offer Course</h1>
			<Flex justify="center" align="center">
				<Col span={6}>
					<PHForm onSubmit={onSubmit}>
						<PHSelect
							label="Registered semester"
							name="semesterRegistration"
							options={registeredSemesterOptions}
						/>

						<PHSelect
							label="Academic department"
							name="academicDepartment"
							options={academicDepartmentOptions}
						/>

						<PHSelectWithWatch
							onValueChange={(value) => setCourseId(value)}
							disabled={isFetching}
							label="Course"
							name="course"
							options={coursesOptions}
						/>

						<PHSelect
							disabled={!courseId || isFetchingCourseFaculties}
							label="Course faculties"
							name="faculty"
							options={coursesFaculties}
						/>

						<PHInput label="Section" name="section" type="text" />
						<PHInput label="Max Capacity" name="maxCapacity" type="text" />

						<PHSelect label="Days" name="days" options={daysOption} mode="multiple" />

						<PHTimePicker label="Start Time" name="startTime" />

						<PHTimePicker label="End Time" name="endTime" />

						<Button htmlType="submit">Submit</Button>
					</PHForm>
				</Col>
			</Flex>
		</>
	);
};

export default OfferCourse;
