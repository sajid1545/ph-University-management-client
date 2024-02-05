import { Button, Col, Divider, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../../../../components/form/PHForm";
import PHInput from "../../../../components/form/PHInput";
import PHSelect from "../../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../../constants/global";
import { useGetAllAcademicDepartmentsQuery } from "../../../../redux/features/admin/academicManagement.api";
import {
	useGetSingleFacultyQuery,
	useUpdateFacultyMutation,
} from "../../../../redux/features/admin/userManagement.api";
import { TResponse } from "../../../../types";

const FacultyUpdate = () => {
	const [updateFaculty] = useUpdateFacultyMutation();

	const { data: dData, isLoading: dIsLoading } = useGetAllAcademicDepartmentsQuery(undefined);
	const departmentOptions = dData?.data?.map((item) => ({
		label: `${item.name}`,
		value: item._id,
	}));

	const { facultyId } = useParams();

	const { data, isLoading: facultyLoading } = useGetSingleFacultyQuery(facultyId);

	if (facultyLoading) {
		return <div>Loading...</div>;
	}

	const facultyInfo = data?.data || {};

	const { firstName, middleName, lastName } = facultyInfo.name;

	const studentDefaultData = {
		name: {
			firstName: firstName,
			middleName: middleName,
			lastName: lastName,
		},
		gender: facultyInfo.gender,
		bloodGroup: facultyInfo.bloodGroup,
		profileImage: facultyInfo.profileImage,
		email: facultyInfo.email,
		contactNumber: facultyInfo.contactNumber,
		emergencyContactNo: facultyInfo.emergencyContactNo,
		presentAddress: facultyInfo.presentAddress,
		permanentAddress: facultyInfo.permanentAddress,

		academicDepartment: facultyInfo.academicDepartment,
	};

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const toastId = toast.loading("Updating faculty...");
		const facultyData = {
			faculty: data,
		};

		try {
			const res = (await updateFaculty({
				id: facultyInfo.id,
				data: facultyData,
			})) as TResponse<any>;

			console.log("🚀 ~ onSubmit ~ res:", res);

			toast.success("Faculty updated successfully", { id: toastId });
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

						<Button htmlType="submit">Update Faculty</Button>
					</PHForm>
				</Col>
			</Row>
		</div>
	);
};

export default FacultyUpdate;
