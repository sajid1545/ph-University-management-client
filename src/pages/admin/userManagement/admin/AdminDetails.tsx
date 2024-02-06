import { Descriptions, DescriptionsProps, Image, Spin } from "antd";
import { useParams } from "react-router-dom";
import { useGetSingleAdminQuery } from "../../../../redux/features/admin/userManagement.api";

const AdminDetails = () => {
	const { adminId } = useParams();

	const { data, isLoading: adminLoading } = useGetSingleAdminQuery(adminId);

	if (adminLoading) {
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

	const admin = data?.data || {};
	console.log("🚀 ~ AdminDetails ~ admin:", admin);

	const items: DescriptionsProps["items"] = [
		{
			key: "1",
			label: "Full Name",
			children: `${admin?.name?.firstName} ${admin?.name?.middleName} ${admin?.name?.lastName}`,
		},
		{
			key: "2",
			label: "Email",
			children: admin?.email,
		},
		{
			key: "3",
			label: "Date Of Birth",
			children: admin?.dateOfBirth,
		},
		{
			key: "4",
			label: "Contact Number",
			children: admin?.contactNumber,
		},
		{
			key: "5",
			label: "Emergency Contact Number",
			children: admin?.emergencyContactNo,
		},
		{
			key: "6",
			label: "Present Address",
			children: admin?.presentAddress,
		},
		{
			key: "7",
			label: "Permanent Address",
			children: admin?.permanentAddress,
		},
		{
			key: "8",
			label: "Blood Group",
			children: admin?.bloodGroup,
		},
		{
			key: "9",
			label: "Gender",
			children: admin?.gender,
		},
		{
			key: "10",
			label: "Designation",
			children: admin?.designation,
		},
		{
			key: "11",
			label: "Profile Image",
			children: (
				<>
					{admin?.profileImage ? (
						<Image width={100} src={admin?.profileImage} />
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
				title={`${admin?.name?.firstName}'s Details`}
				items={items}
				layout="vertical"
				bordered
				column={3}
			/>
		</div>
	);
};

export default AdminDetails;
