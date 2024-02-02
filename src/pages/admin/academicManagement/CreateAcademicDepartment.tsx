import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
	useAddAcademicDepartmentMutation,
	useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";
import { TResponse } from "../../../types";

const CreateAcademicDepartment = () => {
	const { data: facultyData, isLoading } = useGetAllAcademicFacultiesQuery(undefined);

	const [createAcademicDepartment] = useAddAcademicDepartmentMutation();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	const facultyOptions = facultyData?.data?.map(({ _id, name }) => ({
		value: _id,
		label: name,
	})) as { value: string; label: string }[];

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const toastId = toast.loading("Creating department...");
		const facultyData = {
			name: data.name,
			academicFaculty: data.academicFaculty,
		};

		try {
			const res = (await createAcademicDepartment(facultyData)) as TResponse<any>;
			if (res.error) {
				toast.error(res.error.data.message, { id: toastId });
			} else {
				toast.success("Department created successfully", { id: toastId });
			}
		} catch (error) {
			toast.error("Something went wrong", { id: toastId });
		}
	};

	return (
		<>
			<h1 style={{ textAlign: "center", margin: "50px" }}>Create Academic Department</h1>
			<Flex justify="center" align="center">
				<Col span={6}>
					<PHForm onSubmit={onSubmit} resolver={zodResolver(academicDepartmentSchema)}>
						<PHInput type="text" label="Name" name="name" />
						<PHSelect label="Academic Faculties" name="academicFaculty" options={facultyOptions} />
						<Button htmlType="submit">Create Department</Button>
					</PHForm>
				</Col>
			</Flex>
		</>
	);
};

export default CreateAcademicDepartment;
