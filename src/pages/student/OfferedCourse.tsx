import { Button, Col, Row } from "antd";
import { toast } from "sonner";
import {
	useEnrollCourseMutation,
	useGetAllStudentOfferedCoursesQuery,
} from "../../redux/features/student/studentCourseManagement.api";
import { TResponse } from "../../types";

type TCourse = {
	[key: string]: any;
};

const OfferedCourse = () => {
	const { data: offeredCourseData } = useGetAllStudentOfferedCoursesQuery(undefined);
	const [enroll] = useEnrollCourseMutation();

	const singleObject = offeredCourseData?.data?.reduce((acc: TCourse, item) => {
		const key = item.course.title;

		acc[key] = acc[key] || { courseTitle: key, sections: [] };
		acc[key].sections.push({
			section: item.section,
			_id: item._id,
			days: item.days,
			startTime: item.startTime,
			endTime: item.endTime,
		});
		return acc;
	}, {});

	const modifiedData = Object.values(singleObject ? singleObject : {});

	const handleEnroll = async (id: string) => {
		const toastId = toast.loading("Enrolling...");
		const enrollData = {
			offeredCourse: id,
		};
		const res = (await enroll(enrollData)) as TResponse<any>;
		if (res.error) {
			toast.error(res.error.data.message, { id: toastId });
		} else {
			toast.success("Enrolled successfully", { id: toastId });
		}
		console.log("🚀 ~ handleEnroll ~ res:", res);
	};

	if (!modifiedData.length) {
		return <h1>No courses found</h1>;
	}

	return (
		<Row gutter={[0, 20]}>
			{modifiedData.map((item) => {
				return (
					<Col span={24} style={{ border: "solid #d4d4d4 2px" }}>
						<div style={{ padding: "10px" }}>
							<h1>{item.courseTitle}</h1>
						</div>
						<div>
							{item.sections.map((section) => {
								return (
									<Row
										justify={"space-between"}
										align={"middle"}
										style={{ borderTop: "solid #d4d4d4 2px", padding: "10px" }}>
										<Col span={5}>Section: {section.section}</Col>

										<Col span={5}>
											Days:{" "}
											{section.days.map((day) => (
												<span>{day} </span>
											))}
										</Col>
										<Col span={5}>Start Time: {section.startTime}</Col>
										<Col span={5}>End Time: {section.endTime}</Col>
										<Button onClick={() => handleEnroll(section._id)}>Enroll</Button>
									</Row>
								);
							})}
						</div>
					</Col>
				);
			})}
		</Row>
	);
};

export default OfferedCourse;

//* ai format a data gula lagbe
// [
// 	{
// 		courseTitle: "Redux",
// 		sections: [
// 			{

// 				section: 1,
// 				_id: "123",
// 			},
// 			{
// 				section: 2,
// 				_id: "456",
// 			},
// 		],
// 	},
// ];
