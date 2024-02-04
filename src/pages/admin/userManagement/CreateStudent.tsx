import { Button, Col, Divider, Form, Input, Row } from "antd";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import {
	useGetAllAcademicDepartmentsQuery,
	useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";

const studentDummyData = {
	password: "student12345",
	student: {
		name: {
			firstName: "Sami",
			middleName: "Israr",
			lastName: "ravi",
		},
		gender: "male",
		dateOfBirth: "1990-01-01",
		bloodGroup: "A+",

		email: "student2@example.com",
		contactNumber: "123456410",
		emergencyContactNo: "9876543210",
		presentAddress: "123 Main Street, Cityville",
		permanentAddress: "456 Oak Avenue, Townsville",

		guardian: {
			fatherName: "James Smith",
			fatherOccupation: "Engineer",
			fatherContactNo: "1111111111",
			motherName: "Emily Smith",
			motherOccupation: "Doctor",
			motherContactNo: "2222222222",
		},

		localGuardian: {
			name: "Michael Johnson",
			occupation: "Businessman",
			contactNo: "3333333333",
			address: "789 Pine Road, Villagetown",
		},

		admissionSemester: "65b909b85181ed1b458fd7f4",
		academicDepartment: "65b908b15181ed1b458fd7ee",
	},
};

const studentDefaultData = {
	name: {
		firstName: "Sami",
		middleName: "Israr",
		lastName: "ravi",
	},
	gender: "male",
	bloodGroup: "A+",

	email: "test@gmail.com",
	contactNumber: "123456410",
	emergencyContactNo: "9876543210",
	presentAddress: "123 Main Street, Cityville",
	permanentAddress: "456 Oak Avenue, Townsville",

	guardian: {
		fatherName: "James Smith",
		fatherOccupation: "Engineer",
		fatherContactNo: "1111111111",
		motherName: "Emily Smith",
		motherOccupation: "Doctor",
		motherContactNo: "2222222222",
	},

	localGuardian: {
		name: "Michael Johnson",
		occupation: "Businessman",
		contactNo: "3333333333",
		address: "789 Pine Road, Villagetown",
	},

	admissionSemester: "65b909b85181ed1b458fd7f4",
	academicDepartment: "65b908b15181ed1b458fd7ee",
};

const CreateStudent = () => {
	const [addStudent] = useAddStudentMutation();

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

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const studentData = {
			password: "student12345",
			student: data,
		};
		const formData = new FormData();

		formData.append("data", JSON.stringify(studentData));
		formData.append("file", data.profileImage);

		addStudent(formData);

		//! THIS IS FOR DEVELOPMENT
		// console.log(Object.fromEntries(formData));
	};
	return (
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

						<Divider>Guardian</Divider>

						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput type="text" label="Father Name" name="guardian.fatherName" />
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput type="text" label="Father Occupation" name="guardian.fatherOccupation" />
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput type="text" label="Father Contact Number" name="guardian.fatherContactNo" />
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput type="text" label="Mother Name" name="guardian.motherName" />
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput type="text" label="Mother Occupation" name="guardian.motherOccupation" />
						</Col>
						<Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
							<PHInput type="text" label="Mother Contact Number" name="guardian.motherContactNo" />
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

					<Button htmlType="submit">Create Student</Button>
				</PHForm>
			</Col>
		</Row>
	);
};

export default CreateStudent;
