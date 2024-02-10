import { useGetAllEnrolledCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";

const MySchedule = () => {
	const { data, isLoading } = useGetAllEnrolledCoursesQuery(undefined);

	if (isLoading) {
		return <h1>Loading...</h1>;
	}

	return (
		<div>
			<h1>This is MySchedule component</h1>

			{data?.data?.map((item) => {
				return (
					<div>
						<div>Course Name : {item.course.title}</div>
						<div>Section : {item.offeredCourse.section}</div>
						<div>
							Section :{" "}
							{item.offeredCourse.days.map((day) => (
								<span> {day}</span>
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default MySchedule;
