import { Button, Pagination, Space, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllFacultiesQuery } from "../../../../redux/features/admin/userManagement.api";
import { TFaculty, TQueryParam } from "../../../../types";

type TTableData = Pick<TFaculty, "id" | "email" | "contactNumber">;

const FacultyData = () => {
	const [params, setParams] = useState<TQueryParam[]>([]);
	const [page, setPage] = useState(1);

	const { data: facultyData, isFetching } = useGetAllFacultiesQuery([
		// { name: "limit", value: 3 },
		{ name: "page", value: page },
		{ name: "sort", value: "id" },
		...params,
	]);

	const metaData = facultyData?.meta;

	const tableData = facultyData?.data?.map(({ _id, id, email, contactNumber }) => ({
		key: _id,
		id,
		email,
		contactNumber,
	}));

	const columns: TableColumnsType<TTableData> = [
		{
			title: "Email",
			key: "email",
			dataIndex: "email",
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
						<Link to={`/admin/faculty-data/${item.key}`}>
							<Button>Details</Button>
						</Link>
						<Link to={`/admin/faculty-update/${item.key}`}>
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
			<h1 style={{ textAlign: "center", margin: "30px" }}>Faculties</h1>
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

export default FacultyData;