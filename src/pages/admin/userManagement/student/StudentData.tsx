import { Button, Pagination, Space, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllStudentsQuery } from "../../../../redux/features/admin/userManagement.api";
import { TQueryParam, TStudent } from "../../../../types";

type TTableData = Pick<TStudent, "fullName" | "id" | "email" | "contactNumber">;

const StudentData = () => {
	const [params, setParams] = useState<TQueryParam[]>([]);
	const [page, setPage] = useState(1);

	const { data: studentData, isFetching } = useGetAllStudentsQuery([
		{ name: "page", value: page },
		{ name: "sort", value: "id" },
		...params,
	]);

	const metaData = studentData?.meta;

	const tableData = studentData?.data?.map(({ _id, fullName, id, email, contactNumber }) => ({
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
			render: (item) => {
				return (
					<Space>
						<Link to={`/admin/student-data/${item.key}`}>
							<Button>Details</Button>
						</Link>
						<Link to={`/admin/student-update/${item.key}`}>
							<Button>Update</Button>
						</Link>
						<Button>Block</Button>
					</Space>
				);
			},
			width: "1%",
		},
	];

	const onChange: TableProps<TTableData>["onChange"] = (_pagination, filters, _sorter, extra) => {
		console.log("🚀 ~ StudentData ~ filters:", filters);
		if (extra.action === "filter") {
			const queryParams: TQueryParam[] = [];
			filters.name?.forEach((item) => queryParams.push({ name: "name", value: item }));
			filters.year?.forEach((item) => queryParams.push({ name: "year", value: item }));
			setParams(queryParams);
		}
	};
	return (
		<div>
			<h1 style={{ textAlign: "center", margin: "30px" }}>Students</h1>
			<Table
				columns={columns}
				dataSource={tableData}
				onChange={onChange}
				loading={isFetching}
				pagination={false}
			/>
			<Pagination
				current={page}
				total={metaData?.total}
				onChange={(page) => setPage(page)}
				pageSize={metaData?.limit}
			/>
		</div>
	);
};

export default StudentData;
