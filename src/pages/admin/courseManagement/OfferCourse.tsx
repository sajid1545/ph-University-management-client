import { Button, Col, Flex } from "antd";
import { useState } from "react";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatcht";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";

const OfferCourse = () => {
	const [id, setId] = useState("");
	console.log("🚀 ~ INSIDE PARENT ~ id:", id);

	const { data: academicFacultyData } = useGetAllAcademicFacultiesQuery(undefined);

	const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
		value: item._id,
		label: `${item.name}`,
	}));

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		console.log("🚀 ~ onSubmit ~ data:", data);
	};

	return (
		<>
			<h1 style={{ textAlign: "center", margin: "20px" }}>Offer Course</h1>
			<Flex justify="center" align="center">
				<Col span={6}>
					<PHForm onSubmit={onSubmit}>
						<PHSelectWithWatch
							onValueChange={(value) => setId(value)}
							label="Academic semester"
							name="academicSemester"
							options={academicFacultyOptions}
						/>

						<PHInput disabled={!id} label="Course code" name="code" type="text" />

						<Button htmlType="submit">Submit</Button>
					</PHForm>
				</Col>
			</Flex>
		</>
	);
};

export default OfferCourse;
