import { Button, Col, Divider, Form, Input, Row } from "antd";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHDatePicker from "../../../../components/form/PHDatePicker";
import PHForm from "../../../../components/form/PHForm";
import PHInput from "../../../../components/form/PHInput";
import PHSelect from "../../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../../constants/global";
import { useAddAdminMutation } from "../../../../redux/features/admin/userManagement.api";
import { TResponse } from "../../../../types";

const adminDefaultData = {
	name: {
		firstName: "Sajid",
		middleName: "Abdullah",
		lastName: "Sajjad",
	},
	designation: "Administrator",
	user: "65b9152b9d9d014cc8bce8c2",
	gender: "male",
	email: "clashking1545@gmail.com",
	contactNumber: "43214550",
	emergencyContactNo: "42421413210",
	bloodGroup: "O+",
	presentAddress: "123 Main St, Cityville",
	permanentAddress: "456 Oak St, Townsville",
};

const CreateAdmin = () => {
	const [addAdmin] = useAddAdminMutation();

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const toastId = toast.loading("Creating admin...");
		const adminData = {
			password: "admin12345",
			admin: data,
		};
		const formData = new FormData();

		formData.append("data", JSON.stringify(adminData));
		formData.append("file", data.profileImage);

		try {
			const res = (await addAdmin(formData)) as TResponse<any>;

			toast.success("Admin created successfully", { id: toastId });
		} catch (error) {
			toast.error("Something went wrong", { id: toastId });
		}
	};

	return (
		<Row>
			<Col span={24}>
				<PHForm defaultValues={adminDefaultData} onSubmit={onSubmit}>
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
					</Row>

					<Button htmlType="submit">Create Admin</Button>
				</PHForm>
			</Col>
		</Row>
	);
};

export default CreateAdmin;
