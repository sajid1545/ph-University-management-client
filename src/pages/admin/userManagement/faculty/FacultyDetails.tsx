import { Descriptions, DescriptionsProps, Image, Spin } from "antd";
import { useParams } from "react-router-dom";
import { useGetSingleFacultyQuery } from "../../../../redux/features/admin/userManagement.api";

const FacultyDetails = () => {
	const { facultyId } = useParams();

	const { data, isLoading: facultyLoading } = useGetSingleFacultyQuery(facultyId);

	if (facultyLoading) {
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

	const faculty = data?.data || {};
	console.log("🚀 ~ FacultyDetails ~ faculty:", faculty);

	const items: DescriptionsProps["items"] = [
		{
			key: "1",
			label: "Full Name",
			children: `${faculty?.name?.firstName} ${faculty?.name?.middleName} ${faculty?.name?.lastName}`,
		},
		{
			key: "2",
			label: "Email",
			children: faculty?.email,
		},
		{
			key: "3",
			label: "Date Of Birth",
			children: faculty?.dateOfBirth,
		},
		{
			key: "4",
			label: "Contact Number",
			children: faculty?.contactNumber,
		},
		{
			key: "5",
			label: "Emergency Contact Number",
			children: faculty?.emergencyContactNo,
		},
		{
			key: "6",
			label: "Present Address",
			children: faculty?.presentAddress,
		},
		{
			key: "7",
			label: "Permanent Address",
			children: faculty?.permanentAddress,
		},
		{
			key: "8",
			label: "Blood Group",
			children: faculty?.bloodGroup,
		},
		{
			key: "9",
			label: "Gender",
			children: faculty?.gender,
		},
		{
			key: "10",
			label: "Designation",
			children: faculty?.designation,
		},
		{
			key: "11",
			label: "Profile Image",
			children: (
				<>
					{faculty?.profileImage ? (
						<Image width={200} src={faculty?.profileImage} />
					) : (
						<Image
							width={100}
							src="https://www.bing.com/th?id=OIP.j19LqBcvIY351wR3zBJA8gHaHa&w=150&h=150&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
						/>
					)}
				</>
			),
		},
	];

	return (
		<div>
			<Descriptions
				style={{ marginBottom: "20px" }}
				title={`${faculty?.name?.firstName}'s Details`}
				items={items}
				layout="vertical"
				bordered
				column={4}
			/>
		</div>
	);
};

export default FacultyDetails;
