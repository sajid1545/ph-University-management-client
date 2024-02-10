import { Button, Modal, Table } from "antd";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";
import {
	useAddMarkMutation,
	useGetAllFacultyCoursesQuery,
} from "../../redux/features/faculty/facultyCourses.api";
import { TResponse } from "../../types";

const MyStudents = () => {
	const { registerSemesterId, courseId } = useParams();

	const { data: facultyCoursesData, isFetching } = useGetAllFacultyCoursesQuery([
		{
			name: "semesterRegistration",
			value: registerSemesterId,
		},
		{
			name: "course",
			value: courseId,
		},
	]);

	const tableData = facultyCoursesData?.data?.map(
		({ _id, student, semesterRegistration, offeredCourse }) => ({
			key: _id,
			name: `${student?.name.firstName} ${student?.name.middleName} ${student?.name.lastName}`,
			roll: student.id,
			semesterRegistration: semesterRegistration._id,
			offeredCourse: offeredCourse._id,
			student: student._id,
		})
	);

	const columns = [
		{
			title: "Name",
			key: "name",
			dataIndex: "name",
		},
		{
			title: "Roll",
			key: "roll",
			dataIndex: "roll",
		},

		{
			title: "Action",
			key: "x",
			render: (item) => {
				return (
					<div>
						<AddMarksModal studentInfo={item} />
					</div>
				);
			},
		},
	];

	return (
		<div>
			<h1>This is MyStudents component</h1>
			<Table columns={columns} dataSource={tableData} loading={isFetching} />
		</div>
	);
};

const AddMarksModal = ({ studentInfo }: { studentInfo: any }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [addMark] = useAddMarkMutation();

	const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
		const toastId = toast.loading("Adding faculty...");
		const studentMark = {
			semesterRegistration: studentInfo.semesterRegistration,
			offeredCourse: studentInfo.offeredCourse,
			student: studentInfo.student,
			courseMarks: {
				classTest1: Number(data.classTest1),
				classTest2: Number(data.classTest2),
				midTerm: Number(data.midTerm),
				finalTerm: Number(data.finalTerm),
			},
		};
		console.log("🚀 ~ studentMark:", studentMark);

		try {
			const res = (await addMark(studentMark)) as TResponse<any>;
			if (res?.error) {
				toast.error(res.error.data.message, { id: toastId });
			} else {
				toast.success("Mark added successfully", { id: toastId });
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
			<Button onClick={showModal}>Add Marks</Button>
			<Modal centered title="Basic Modal" open={isModalOpen} onCancel={handleCancel} footer={null}>
				<PHForm onSubmit={handleSubmit}>
					<PHInput name="classTest1" label="Class Test 1" type="text" />
					<PHInput name="midTerm" label="Mid Term" type="text" />
					<PHInput name="classTest2" label="Class Test 2" type="text" />
					<PHInput name="finalTerm" label="Final Term" type="text" />
					<Button htmlType="submit">Submit</Button>
				</PHForm>
			</Modal>
		</>
	);
};
export default MyStudents;
