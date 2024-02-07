import { Button, Modal, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import {
	useAddFacultiesMutation,
	useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import { TCourse, TResponse } from "../../../types";

type TTableData = Pick<TCourse, "title" | "code">;

const Courses = () => {
	const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);

	const tableData = courses?.data?.map(({ _id, title, code }) => ({
		key: _id,
		title,
		code,
	}));

	const columns: TableColumnsType<TTableData> = [
		{
			title: "Title",
			key: "title",
			dataIndex: "title",
		},

		{
			title: "Code",
			key: "code",
			dataIndex: "code",
		},

		{
			title: "Action",
			key: "x",
			render: (item) => {
				return <AddFacultyModal facultyInfo={item} />;
			},
		},
	];

	return (
		<div>
			<h1 style={{ textAlign: "center", margin: "30px" }}>Courses</h1>
			<Table columns={columns} dataSource={tableData} loading={isFetching} />
		</div>
	);
};

const AddFacultyModal = ({ facultyInfo }: { facultyInfo: any }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { data: facultiesData } = useGetAllFacultiesQuery(undefined);

	const [addFaculties] = useAddFacultiesMutation();

	const facultiesOptions = facultiesData?.data?.map((item) => ({
		value: item._id,
		label: `${item.name.firstName} ${item.name.middleName}  ${item.name.lastName}`,
	}));

	const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
		const toastId = toast.loading("Adding faculty...");
		const facultyData = {
			courseId: facultyInfo.key,
			data,
		};

		try {
			const res = (await addFaculties(facultyData)) as TResponse<any>;
			if (res?.error) {
				toast.error(res.error.data.message, { id: toastId });
			} else {
				toast.success("Course added successfully", { id: toastId });
				setIsModalOpen(false);
			}
		} catch (error) {
			toast.error("Something went wrong", { id: toastId });
		}
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Button onClick={showModal}>Add Faculty</Button>
			<Modal centered title="Basic Modal" open={isModalOpen} onCancel={handleCancel} footer={null}>
				<PHForm onSubmit={handleSubmit}>
					<PHSelect label="Faculties" name="faculties" options={facultiesOptions} mode="multiple" />
					<Button htmlType="submit">Submit</Button>
				</PHForm>
			</Modal>
		</>
	);
};

export default Courses;
