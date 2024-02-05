import { Button, Col, Divider, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../../../../components/form/PHForm";
import PHInput from "../../../../components/form/PHInput";
import PHSelect from "../../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../../constants/global";
import {
	useGetAllAcademicDepartmentsQuery,
	useGetAllSemestersQuery,
} from "../../../../redux/features/admin/academicManagement.api";
import {
	useGetSingleStudentQuery,
	useUpdateStudentMutation,
} from "../../../../redux/features/admin/userManagement.api";
import { TResponse } from "../../../../types";

const StudentUpdate = () => {
	const [updateStudent] = useUpdateStudentMutation();

	const { data: sData, isLoading: sIsLoading } = useGetAllSemestersQuery(undefined);
	const semesterOptions = sData?.data?.map((item) => ({
		label: `${item.name} ${item.year}`,
		value: item._id,
	}));

	const { data: dData, isLoading: dIsLoading } = useGetAllAcademicDepartmentsQuery(undefined);
	const departmentOptions = dData?.data?.map((item) => ({
		label: `${item.name}`,
		value: item._id,
	}));

	const { studentId } = useParams();

	const { data, isLoading: studentLoading } = useGetSingleStudentQuery(studentId);

	if (studentLoading) {
		return <div>Loading...</div>;
	}

	const studentInfo = data?.data || {};

	const { firstName, middleName, lastName } = studentInfo.name;
	const {
		fatherName,
		fatherOccupation,
		fatherContactNo,
		motherName,
		motherOccupation,
		motherContactNo,
	} = studentInfo.guardian;

	const { name, occupation, contactNo, address } = studentInfo.localGuardian;

	const studentDefaultData = {
		name: {
			firstName: firstName,
			middleName: middleName,
			lastName: lastName,
		},
		gender: studentInfo.gender,
		bloodGroup: studentInfo.bloodGroup,
		profileImage: studentInfo.profileImage,
		email: studentInfo.email,
		contactNumber: studentInfo.contactNumber,
		emergencyContactNo: studentInfo.emergencyContactNo,
		presentAddress: studentInfo.presentAddress,
		permanentAddress: studentInfo.permanentAddress,

		guardian: {
			fatherName,
			fatherOccupation,
			fatherContactNo,
			motherName,
			motherOccupation,
			motherContactNo,
		},

		localGuardian: {
			name,
			occupation,
			contactNo,
			address,
		},

		admissionSemester: studentInfo.admissionSemester._id,
		academicDepartment: studentInfo.academicDepartment._id,
	};

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const toastId = toast.loading("Updating student...");
		const studentData = {
			student: data,
		};
		// console.log(studentData);
		// const formData = new FormData();

		// formData.append("data", JSON.stringify(studentData));
		// formData.append("file", data.profileImage);

		try {
			const res = (await updateStudent({ id: studentId, data: studentData })) as TResponse<any>;

			console.log("🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ res:", res);

			toast.success("Student updated successfully", { id: toastId });
		} catch (error) {
			toast.error("Something went wrong", { id: toastId });
		}
	};

	return (
		<div>
			<h1>This is StudentUpdate component</h1>
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

							<Divider>Guardian</Divider>

							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput type="text" label="Father Name" name="guardian.fatherName" />
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput type="text" label="Father Occupation" name="guardian.fatherOccupation" />
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput
									type="text"
									label="Father Contact Number"
									name="guardian.fatherContactNo"
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput type="text" label="Mother Name" name="guardian.motherName" />
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput type="text" label="Mother Occupation" name="guardian.motherOccupation" />
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput
									type="text"
									label="Mother Contact Number"
									name="guardian.motherContactNo"
								/>
							</Col>

							<Divider>Local Guardian</Divider>

							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput type="text" label="Name" name="localGuardian.name" />
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput type="text" label="Occupation" name="localGuardian.occupation" />
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput type="text" label="Contact Number" name="localGuardian.contactNo" />
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHInput type="text" label="Address" name="localGuardian.address" />
							</Col>

							<Divider>Academic Info</Divider>

							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHSelect
									label="Admission semester"
									disabled={sIsLoading}
									name="admissionSemester"
									options={semesterOptions}
								/>
							</Col>
							<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
								<PHSelect
									label="Academic Department"
									name="academicDepartment"
									options={departmentOptions}
									disabled={dIsLoading}
								/>
							</Col>
						</Row>

						<Button htmlType="submit">Update Student</Button>
					</PHForm>
				</Col>
			</Row>
		</div>
	);
};

export default StudentUpdate;
