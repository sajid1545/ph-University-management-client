import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicFaculty } from "../../../types/academicManagement.type";

type TTableData = Pick<TAcademicFaculty, "name">;

const AcademicFaculty = () => {
	const { data: facultyData, isFetching } = useGetAllAcademicFacultiesQuery(undefined);

	const tableData = facultyData?.data?.map(({ _id, name }) => ({ key: _id, name }));

	const columns: TableColumnsType<TTableData> = [
		{
			title: "Name",
			dataIndex: "name",
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

	const onChange: TableProps<TTableData>["onChange"] = (pagination, filters, sorter, extra) => {
		console.log("params", pagination, filters, sorter, extra);
	};

	return (
		<div>
			<h1 style={{ textAlign: "center", margin: "30px" }}>Academic Faculty</h1>
			<Table columns={columns} dataSource={tableData} onChange={onChange} loading={isFetching} />
		</div>
	);
};

export default AcademicFaculty;
