import { Button, Table, TableColumnsType } from "antd";
import { useGetAllAcademicDepartmentsQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicDepartment } from "../../../types/academicManagement.type";

type TTableData = Pick<TAcademicDepartment, "name" | "academicFaculty">;

const AcademicDepartment = () => {
	const { data: departmentData, isFetching } = useGetAllAcademicDepartmentsQuery(undefined);

	const tableData = departmentData?.data?.map(({ _id, name, academicFaculty }) => ({
		key: _id,
		name,
		academicFaculty,
	}));

	const columns: TableColumnsType<TTableData> = [
		{
			title: "Name",
			dataIndex: "name",
		},
		{
			title: "Academic Faculties",
			dataIndex: "academicFaculty",
			render: (text) => {
				return text?.name;
			},
		},
		{
			title: "Action",
			key: "action",
			render: () => (
				<>
					<Button type="primary">Edit</Button>
				</>
			),
		},
	];

	// const onChange: TableProps<TTableData>["onChange"] = (_pagination, filters, _sorter, _extra) => {
	// 	console.log({ filters,exra });
	// };

	return (
		<div>
			<h1 style={{ textAlign: "center", margin: "30px" }}>Academic Department</h1>
			<Table columns={columns} dataSource={tableData} loading={isFetching} />
		</div>
	);
};

export default AcademicDepartment;
