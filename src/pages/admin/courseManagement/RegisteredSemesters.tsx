import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";
import {
	useGetAllRegisteredSemestersQuery,
	useUpdateRegisteredSemesterMutation,
} from "../../../redux/features/admin/courseManagement.api";
import { TResponse, TSemester } from "../../../types";

const items = [
	{
		label: "Upcoming",
		key: "UPCOMING",
	},
	{
		label: "Ongoing",
		key: "ONGOING",
	},
	{
		label: "Ended",
		key: "ENDED",
	},
];

type TTableData = Pick<TSemester, "startDate" | "endDate" | "status">;

const RegisteredSemesters = () => {
	// const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

	const [semesterId, setSemesterId] = useState("");

	const { data: semesterData, isFetching } = useGetAllRegisteredSemestersQuery(undefined);

	const [updateSemesterStatus] = useUpdateRegisteredSemesterMutation();

	const tableData = semesterData?.data?.map(
		({ _id, academicSemester, startDate, endDate, status }) => ({
			key: _id,
			name: `${academicSemester.name} ${academicSemester.year}`,
			startDate: moment(new Date(startDate)).format("MMMM"),
			endDate: moment(new Date(endDate)).format("MMMM"),
			status,
		})
	);

	const handleStatusUpdate = async (data: { key: string }) => {
		const toastId = toast.loading("Updating semester status...");

		//* REQ.BODY EXAMPLE
		// {
		// 	"status": "ONGOING"
		// }

		const updateData = {
			id: semesterId,
			data: {
				status: data.key,
			},
		};

		try {
			const res = (await updateSemesterStatus(updateData)) as TResponse<any>;
			if (res?.error) {
				return toast.error(res.error.data.message, { id: toastId });
			}

			toast.success("Semester status updated successfully", { id: toastId });
		} catch (error) {
			toast.error("Something went wrong", { id: toastId });
		}
	};

	const menuProps = {
		items,
		onClick: handleStatusUpdate,
	};

	const columns: TableColumnsType<TTableData> = [
		{
			title: "Name",
			key: "name",
			dataIndex: "name",
		},
		{
			title: "Status",
			key: "status",
			dataIndex: "status",
			render: (text) => {
				let color;
				if (text === "UPCOMING") {
					color = "blue";
				}
				if (text === "ONGOING") {
					color = "green";
				}
				if (text === "ENDED") {
					color = "red";
				}
				return <Tag color={color}>{text}</Tag>;
			},
		},
		{
			title: "Start Date",
			key: "startDate",
			dataIndex: "startDate",
		},
		{
			title: "End Date",
			key: "endDate",
			dataIndex: "endDate",
		},
		{
			title: "Action",
			key: "x",
			render: (item) => {
				return (
					<Dropdown menu={menuProps} trigger={["click"]}>
						<Button onClick={() => setSemesterId(item.key)}>Update</Button>
					</Dropdown>
				);
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
			<h1 style={{ textAlign: "center", margin: "30px" }}>Registered Semesters</h1>
			<Table columns={columns} dataSource={tableData} loading={isFetching} />
		</div>
	);
};

export default RegisteredSemesters;
