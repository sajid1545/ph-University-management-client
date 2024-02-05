import { Button, Col, Divider, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../../../../components/form/PHForm";
import PHInput from "../../../../components/form/PHInput";
import PHSelect from "../../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../../constants/global";
import {
	useGetSingleAdminQuery,
	useUpdateAdminMutation,
} from "../../../../redux/features/admin/userManagement.api";
import { TResponse } from "../../../../types";

const AdminUpdate = () => {
	const [updateAdmin] = useUpdateAdminMutation();

	const { adminId } = useParams();

	const { data, isLoading: adminLoading } = useGetSingleAdminQuery(adminId);

	if (adminLoading) {
		return <div>Loading...</div>;
	}

	const adminInfo = data?.data || {};

	const { firstName, middleName, lastName } = adminInfo.name;

	const studentDefaultData = {
		name: {
			firstName: firstName,
			middleName: middleName,
			lastName: lastName,
		},
		gender: adminInfo.gender,
		bloodGroup: adminInfo.bloodGroup,
		profileImage: adminInfo.profileImage,
		email: adminInfo.email,
		contactNumber: adminInfo.contactNumber,
		emergencyContactNo: adminInfo.emergencyContactNo,
		presentAddress: adminInfo.presentAddress,
		permanentAddress: adminInfo.permanentAddress,
	};

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const toastId = toast.loading("Updating admin...");
		const adminData = {
			admin: data,
		};

		try {
			const res = (await updateAdmin({
				id: adminInfo.id,
				data: adminData,
			})) as TResponse<any>;

			console.log("🚀 ~ onSubmit ~ res:", res);

			toast.success("Admin updated successfully", { id: toastId });
		} catch (error) {
			toast.error("Something went wrong", { id: toastId });
		}
	};

	return (
		<div>
			<h1>This is Faculty Update component</h1>
			<Row>
				<Col span={24}>
					<PHForm defaultValues={studentDefaultData} onSubmit={onSubmit}>
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
								<PHSelect label="Gender" name="gender" options={genderOptions} />
							</Col>
							{/* <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHDatePicker label="Date of Birth" name="dateOfBirth" />
							</Col> */}
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHSelect label="Blood Group" name="bloodGroup" options={bloodGroupOptions} />
							</Col>

							{/* <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
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
							</Col> */}

							<Divider>Contact Info</Divider>

							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput type="email" label="Email" name="email" disabled />
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

						<Button htmlType="submit">Update Admin</Button>
					</PHForm>
				</Col>
			</Row>
		</div>
	);
};

export default AdminUpdate;
