import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TQueryParam } from "../../../types";
import { TAcademicSemester } from "../../../types/academicManagement.type";

type TTableData = Pick<TAcademicSemester, "name" | "startMonth" | "endMonth" | "year">;

const AcademicSemester = () => {
	const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
	const { data: semesterData, isFetching } = useGetAllSemestersQuery(params);

	const tableData = semesterData?.data?.map(({ _id, name, startMonth, endMonth, year }) => ({
		key: _id,
		name,
		startMonth,
		endMonth,
		year,
	}));

	const columns: TableColumnsType<TTableData> = [
		{
			title: "Name",
			key: "name",
			dataIndex: "name",
			filters: [
				{
					text: "Autumn",
					value: "Autumn",
				},
				{
					text: "Fall",
					value: "Fall",
				},
				{
					text: "Summer",
					value: "Summer",
				},
			],
		},
		{
			title: "Year",
			key: "year",
			dataIndex: "year",
			filters: [
				{
					text: "2024",
					value: "2024",
				},
				{
					text: "2025",
					value: "2025",
				},
				{
					text: "2026",
					value: "2026",
				},
			],
		},
		{
			title: "Start Month",
			key: "startMonth",
			dataIndex: "startMonth",
		},
		{
			title: "End Month",
			key: "endMonth",
			dataIndex: "endMonth",
		},
		{
			title: "Action",
			key: "x",
			render: () => {
				return (
					<div>
						<Button>Update</Button>
					</div>
				);
			},
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
			<h1>This is AcademicSemester component</h1>
			<Table columns={columns} dataSource={tableData} onChange={onChange} loading={isFetching} />
		</div>
	);
};

export default AcademicSemester;
