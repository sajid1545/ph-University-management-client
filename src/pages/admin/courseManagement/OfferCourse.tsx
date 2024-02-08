import { Button, Col, Flex } from "antd";
import moment from "moment";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatcht";
import { useGetAllAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";
import {
	useGetAllCoursesQuery,
	useGetAllRegisteredSemestersQuery,
	useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement.api";

const OfferCourse = () => {
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

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		// const dates = [moment(data.day1).format("ddd"), moment(data.day2).format("ddd")];
		const dates = [];
		if (data.day) {
			dates.push(moment(data.day).format("ddd"));
		}
		const OfferCourseData = {
			...data,
			academicFaculty: academicDepartmentData?.data?.find(
				(item) => item._id === data.academicDepartment
			)?.academicFaculty?._id,
			section: Number(data.section),
			maxCapacity: Number(data.maxCapacity),
			// days: [...new Set(dates)],
			days: dates,
		};
		console.log("🚀 ~ OfferCourse ~ OfferCourseData:", OfferCourseData);
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

						{/* <Row gutter={16} justify="space-between">
							<Col>
							</Col>
							<Col>
								<PHDatePicker label="Day 2" name="day2" />
							</Col>
						</Row> */}

						<Button htmlType="submit">Submit</Button>
					</PHForm>
				</Col>
			</Flex>
		</>
	);
};

export default OfferCourse;
