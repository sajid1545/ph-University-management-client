import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { semesterStatusOptions } from "../../../constants/semester";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement.api";
import { TResponse } from "../../../types";

const SemesterRegistration = () => {
	const [addSemester] = useAddRegisteredSemesterMutation();
	const { data: academicSemester } = useGetAllSemestersQuery([{ name: "sort", value: "year" }]);

	const academicSemesterOptions = academicSemester?.data?.map((item) => ({
		value: item._id,
		label: `${item.name} ${item.year}`,
	}));

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const toastId = toast.loading("Creating semester...");

		const semesterData = {
			...data,
			minCredit: Number(data.minCredit),
			maxCredit: Number(data.maxCredit),
		};
		console.log("🚀 ~ semesterData:", semesterData);

		try {
			const res = (await addSemester(semesterData)) as TResponse<any>;
			if (res.error) {
				toast.error(res.error.data.message, { id: toastId });
			} else {
				toast.success("Semester created successfully", { id: toastId });
			}
			console.log("🚀 ~  ~ res:", res);
		} catch (error) {
			toast.error("Something went wrong", { id: toastId });
		}
	};

	return (
		<>
			<h1 style={{ textAlign: "center", margin: "20px" }}>Semester Registration</h1>
			<Flex justify="center" align="center">
				<Col span={6}>
					<PHForm onSubmit={onSubmit}>
						<PHSelect
							label="Academic semester"
							name="academicSemester"
							options={academicSemesterOptions}
						/>
						<PHSelect label="Status" name="status" options={semesterStatusOptions} />

						<PHDatePicker name="startDate" label="Start Date" />
						<PHDatePicker name="endDate" label="End Date" />
						<PHInput label="Min Credit" name="minCredit" type="number" />
						<PHInput label="Max Credit" name="maxCredit" type="number" />

						<Button htmlType="submit">Submit</Button>
					</PHForm>
				</Col>
			</Flex>
		</>
	);
};

export default SemesterRegistration;
