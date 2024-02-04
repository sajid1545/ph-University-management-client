import { Button, Space, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { TQueryParam, TStudent } from "../../../types";

type TTableData = Pick<TStudent, "fullName" | "id" | "email" | "contactNumber">;

const StudentData = () => {
	const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
	const { data: StudentData, isFetching } = useGetAllStudentsQuery(params);

	const tableData = StudentData?.data?.map(({ _id, fullName, id, email, contactNumber }) => ({
		key: _id,
		fullName,
		id,
		email,
		contactNumber,
	}));

	const columns: TableColumnsType<TTableData> = [
		{
			title: "Name",
			key: "name",
			dataIndex: "fullName",
		},

		{
			title: "Roll Number",
			key: "id",
			dataIndex: "id",
		},
		{
			title: "Action",
			key: "x",
			render: () => {
				return (
					<Space>
						<Button>Update</Button>
						<Button>Details</Button>
						<Button>Block</Button>
					</Space>
				);
			},
			width: "1%",
		},
	];

	const onChange: TableProps<TTableData>["onChange"] = (_pagination, filters, _sorter, extra) => {
		console.log("🚀 ~ AcademicSemester ~ filters:", filters);
		if (extra.action === "filter") {
			const queryParams: TQueryParam[] = [];
			filters.name?.forEach((item) => queryParams.push({ name: "name", value: item }));
			filters.year?.forEach((item) => queryParams.push({ name: "year", value: item }));
			setParams(queryParams);
		}
	};
	return (
		<div>
			<h1 style={{ textAlign: "center", margin: "30px" }}>Academic Semester</h1>
			<Table columns={columns} dataSource={tableData} onChange={onChange} loading={isFetching} />
		</div>
	);
};

export default StudentData;
