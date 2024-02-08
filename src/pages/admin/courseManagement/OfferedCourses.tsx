import { Button, Table, TableColumnsType } from "antd";
import { useGetAllOfferedCoursesQuery } from "../../../redux/features/admin/courseManagement.api";
import { TOfferedCourse } from "../../../types";

type TTableData = Pick<
	TOfferedCourse,
	"startTime" | "endTime" | "course" | "academicSemester" | "faculty"
>;

const OfferedCourses = () => {
	// const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

	const { data: offeredCourses, isFetching } = useGetAllOfferedCoursesQuery(undefined);

	// const {data : singleCourse} = useGetSingleCourseQuery(offeredCourses)

	const tableData = offeredCourses?.data?.map(
		({ _id, academicSemester, startTime, endTime, course, faculty }) => ({
			key: _id,
			startTime,
			academicSemester,
			endTime,
			course,
			faculty,
		})
	);

	const columns: TableColumnsType<TTableData> = [
		{
			title: "Course",
			key: "course",
			dataIndex: "course",
			render: (item) => {
				return `${item?.title} (${item?.code})`;
			},
		},
		{
			title: "Faculty",
			key: "faculty",
			dataIndex: "faculty",
			render: (item) => {
				return `${item?.name?.firstName} ${item?.name?.middleName} ${item?.name?.lastName}`;
			},
		},
		{
			title: "Semester",
			key: "academicSemester",
			dataIndex: "academicSemester",
			render: (item) => {
				return `${item?.name} ${item?.year}`;
			},
		},
		{
			title: "Start Time",
			key: "startTime",
			dataIndex: "startTime",
		},
		{
			title: "End Time",
			key: "endTime",
			dataIndex: "endTime",
		},

		{
			title: "Action",
			key: "x",
			render: () => {
				return <Button>Update</Button>;
			},
		},
	];

	// const onChange: TableProps<TTableData>["onChange"] = (_pagination, filters, _sorter, extra) => {
	// 	console.log("🚀 ~ AcademicSemester ~ filters:", filters);
	// 	if (extra.action === "filter") {
	// 		const queryParams: TQueryParam[] = [];
	// 		filters.name?.forEach((item) => queryParams.push({ name: "name", value: item }));
	// 		filters.year?.forEach((item) => queryParams.push({ name: "year", value: item }));
	// 		setParams(queryParams);
	// 	}
	// };

	return (
		<div>
			<h1 style={{ textAlign: "center", margin: "30px" }}>Offered Courses</h1>
			<Table columns={columns} dataSource={tableData} loading={isFetching} />
		</div>
	);
};

export default OfferedCourses;
