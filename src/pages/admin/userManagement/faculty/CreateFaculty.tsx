import { Button, Col, Divider, Form, Input, Row } from "antd";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHDatePicker from "../../../../components/form/PHDatePicker";
import PHForm from "../../../../components/form/PHForm";
import PHInput from "../../../../components/form/PHInput";
import PHSelect from "../../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../../constants/global";
import { useGetAllAcademicDepartmentsQuery } from "../../../../redux/features/admin/academicManagement.api";
import { useAddFacultyMutation } from "../../../../redux/features/admin/userManagement.api";
import { TResponse } from "../../../../types";

const facultyDefaultData = {
	name: {
		firstName: "Abdur",
		middleName: "Rahman",
		lastName: "Shah",
	},
	designation: "Assistant  Professor",
	gender: "male",
	email: "faculty3@gmail.com",
	contactNumber: "1234567890",
	emergencyContactNo: "98715543210",
	bloodGroup: "B+",
	presentAddress: "789 Oak Street, Villageton",
	permanentAddress: "567 Pine Lane, Hamletville",

	academicDepartment: "65b908b15181ed1b458fd7ee",
};

const CreateFaculty = () => {
	const [addFaculty] = useAddFacultyMutation();

	const { data: dData, isLoading: dIsLoading } = useGetAllAcademicDepartmentsQuery(undefined);
	const departmentOptions = dData?.data?.map((item) => ({
		label: `${item.name}`,
		value: item._id,
	}));

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const toastId = toast.loading("Creating faculty...");
		const facultyData = {
			password: "faculty12345",
			faculty: data,
		};
		const formData = new FormData();

		formData.append("data", JSON.stringify(facultyData));
		formData.append("file", data.profileImage);
		try {
			const res = (await addFaculty(formData)) as TResponse<any>;

			console.log("🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ res:", res);

			toast.success("Faculty created successfully", { id: toastId });
		} catch (error) {
			toast.error("Something went wrong", { id: toastId });
		}
	};

	return (
		<Row>
			<Col span={24}>
				<PHForm defaultValues={facultyDefaultData} onSubmit={onSubmit}>
					<Divider>Personal Info</Divider>
					<Row gutter={16}>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput type="text" label="First Name" name="name.firstName" />
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput type="text" label="Middle Name" name="name.middleName" />
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput type="text" label="Last Name" name="name.lastName" />
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput type="text" label="Designation" name="designation" />
						</Col>

						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHSelect label="Gender" name="gender" options={genderOptions} />
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHDatePicker label="Date of Birth" name="dateOfBirth" />
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHSelect label="Blood Group" name="bloodGroup" options={bloodGroupOptions} />
						</Col>

						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<Controller
								name="profileImage"
								render={({ field: { value, onChange, ...field } }) => (
									<Form.Item label="Profile Image">
										<Input
											type="file"
											{...field}
											onChange={(e) => onChange(e.target.files?.[0])}
											value={value?.fileName}
										/>
									</Form.Item>
								)}
							/>
						</Col>

						<Divider>Contact Info</Divider>

						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput type="email" label="Email" name="email" />
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput type="text" label="Contact Number" name="contactNumber" />
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput type="text" label="Emergency Contact Number" name="emergencyContactNo" />
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput type="text" label="Present Address" name="presentAddress" />
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput type="text" label="Permanent Address" name="permanentAddress" />
						</Col>

						<Divider>Academic Info</Divider>

						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHSelect
								label="Academic Department"
								name="academicDepartment"
								options={departmentOptions}
								disabled={dIsLoading}
							/>
						</Col>
					</Row>

					<Button htmlType="submit">Create Faculty</Button>
				</PHForm>
			</Col>
		</Row>
	);
};

export default CreateFaculty;
