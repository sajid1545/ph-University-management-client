import { Descriptions, DescriptionsProps, Image, Spin } from "antd";
import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../../redux/features/admin/userManagement.api";

const StudentDetails = () => {
	const { studentId } = useParams();

	const { data, isLoading: studentLoading } = useGetSingleStudentQuery(studentId);

	if (studentLoading) {
		return (
			<div
				style={{
					width: "100%",
					height: "100vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Spin size="large" />
			</div>
		);
	}

	const student = data?.data || {};

	const items: DescriptionsProps["items"] = [
		{
			key: "1",
			label: "Full Name",
			children: student?.fullName,
		},
		{
			key: "2",
			label: "Email",
			children: student?.email,
		},
		{
			key: "3",
			label: "Date Of Birth",
			children: student?.dateOfBirth,
		},
		{
			key: "4",
			label: "Contact Number",
			children: student?.contactNumber,
		},
		{
			key: "5",
			label: "Emergency Contact Number",
			children: student?.emergencyContactNo,
		},
		{
			key: "6",
			label: "Present Address",
			children: student?.presentAddress,
		},
		{
			key: "7",
			label: "Permanent Address",
			children: student?.permanentAddress,
		},
		{
			key: "8",
			label: "Blood Group",
			children: student?.bloodGroup,
		},
		{
			key: "9",
			label: "Gender",
			children: student?.gender,
		},
		{
			key: "10",
			label: "Profile Image",
			children: (
				<>
					{student?.profileImage ? (
						<Image width={100} src={student?.profileImage} />
					) : (
						<Image
							width={100}
							src="https://www.bing.com/th?id=OIP.j19LqBcvIY351wR3zBJA8gHaHa&w=150&h=150&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
						/>
					)}
				</>
			),
		},
		{
			key: "11",
			label: "Admission Semester",
			children: (
				<>
					Admission Semester Name : {student?.admissionSemester?.name}
					<br />
					<br />
					Admission Semester Year : {student?.admissionSemester?.year}
				</>
			),
		},
		{
			key: "12",
			label: "Academic Department",
			children: student?.academicDepartment?.name,
		},

		{
			key: "13",
			label: "Guardian",
			children: (
				<>
					Father Name : {student?.guardian?.fatherName},
					<br />
					<br />
					Father Occupation : {student?.guardian?.fatherOccupation},
					<br />
					<br />
					Father Contact No : {student?.guardian?.fatherContactNo},
					<br />
					<br />
					Mother Name : {student?.guardian?.motherName},
					<br />
					<br />
					Mother Occupation : {student?.guardian?.motherOccupation},
					<br />
					<br />
					Mother Contact No : {student?.guardian?.motherContactNo},
					<br />
					<br />
				</>
			),
		},
		{
			key: "14",
			label: "Local Guardian",
			children: (
				<>
					Name : {student?.localGuardian?.name},
					<br />
					<br />
					Occupation : {student?.localGuardian?.occupation},
					<br />
					<br />
					Contact No : {student?.localGuardian?.contactNo},
					<br />
					<br />
					Address : {student?.localGuardian?.address},
				</>
			),
		},
	];

	return (
		<div>
			<Descriptions
				style={{ marginBottom: "20px" }}
				title={`${student?.name?.firstName}'s Details`}
				items={items}
				layout="vertical"
				bordered
				column={4}
			/>
		</div>
	);
};

export default StudentDetails;
