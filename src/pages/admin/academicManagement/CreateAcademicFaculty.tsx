import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";
import { TResponse } from "../../../types";

const CreateAcademicFaculty = () => {
	const [createAcademicFaculty] = useAddAcademicFacultyMutation();

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const toastId = toast.loading("Creating faculty...");
		try {
			const res = (await createAcademicFaculty(data)) as TResponse<any>;
			if (res.error) {
				toast.error(res.error.data.message, { id: toastId });
			} else {
				toast.success("Faculty created successfully", { id: toastId });
			}
		} catch (error) {
			toast.error("Something went wrong", { id: toastId });
		}
	};

	return (
		<>
			<h1 style={{ textAlign: "center", margin: "50px" }}>Create Academic Faculty</h1>
			<Flex justify="center" align="center">
				<Col span={6}>
					<PHForm onSubmit={onSubmit} resolver={zodResolver(academicFacultySchema)}>
						<PHInput type="text" label="Name" name="name" />
						<Button htmlType="submit">Create Faculty</Button>
					</PHForm>
				</Col>
			</Flex>
		</>
	);
};

export default CreateAcademicFaculty;
