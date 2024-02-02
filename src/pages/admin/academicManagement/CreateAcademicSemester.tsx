import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { monthOptions } from "../../../constants/global";
import { semesterOptions } from "../../../constants/semester";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { TResponse } from "../../../types/global";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
	value: `${currentYear + number}`,
	label: `${currentYear + number}`,
}));

const CreateAcademicSemester = () => {
	const [addAcademicSemester] = useAddAcademicSemesterMutation();

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const toastId = toast.loading("Creating semester...");

		const name = semesterOptions[Number(data.name) - 1]?.label;

		const semesterData = {
			name,
			code: data.name,
			year: data.year,
			startMonth: data.startMonth,
			endMonth: data.endMonth,
		};

		try {
			const res = (await addAcademicSemester(semesterData)) as TResponse<any>;
			if (res.error) {
				toast.error(res.error.data.message, { id: toastId });
			} else {
				toast.success("Semester created successfully", { id: toastId });
			}
			console.log("🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ res:", res);
		} catch (error) {
			toast.error("Something went wrong", { id: toastId });
		}
	};

	return (
		<>
			<h1 style={{ textAlign: "center", margin: "20px" }}>Create Academic Semester</h1>
			<Flex justify="center" align="center">
				<Col span={6}>
					<PHForm onSubmit={onSubmit} resolver={zodResolver(academicSemesterSchema)}>
						<PHSelect label="Name" name="name" options={semesterOptions} />
						<PHSelect label="Year" name="year" options={yearOptions} />
						<PHSelect label="Start Month" name="startMonth" options={monthOptions} />
						<PHSelect label="End Month" name="endMonth" options={monthOptions} />
						<Button htmlType="submit">Create</Button>
					</PHForm>
				</Col>
			</Flex>
		</>
	);
};

export default CreateAcademicSemester;
