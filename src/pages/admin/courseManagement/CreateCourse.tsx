/* eslint-disable no-mixed-spaces-and-tabs */
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import {
	useAddCourseMutation,
	useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { TResponse } from "../../../types";

const CreateCourse = () => {
	const [addCourse] = useAddCourseMutation();
	const { data: courses } = useGetAllCoursesQuery(undefined);

	const coursesOptions = courses?.data?.map((item) => ({
		value: item._id,
		label: item.title,
	}));

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const toastId = toast.loading("Creating semester...");

		const courseData = {
			...data,
			isDeleted: false,
			credits: Number(data.credits),
			code: Number(data.code),
			preRequisiteCourses: data.preRequisiteCourses
				? data.preRequisiteCourses.map((item: any) => ({
						course: item,
						isDeleted: false,
				  }))
				: [],
		};

		try {
			const res = (await addCourse(courseData)) as TResponse<any>;
			if (res.error) {
				toast.error(res.error.data.message, { id: toastId });
			} else {
				toast.success("Semester created successfully", { id: toastId });
			}
			console.log("🚀 ~  ~ res:", res);
		} catch (error) {
			toast.error("Something went wrong", { id: toastId });
		}
	};

	return (
		<>
			<h1 style={{ textAlign: "center", margin: "20px" }}>Create Course</h1>
			<Flex justify="center" align="center">
				<Col span={6}>
					<PHForm onSubmit={onSubmit}>
						<PHInput label="Title" name="title" type="text" />
						<PHInput label="Prefix" name="prefix" type="text" />
						<PHInput label="Code" name="code" type="text" />
						<PHInput label="Credits" name="credits" type="text" />
						<PHSelect
							label="Pre Requisite Courses"
							name="preRequisiteCourses"
							options={coursesOptions}
							mode="multiple"
						/>

						<Button htmlType="submit">Submit</Button>
					</PHForm>
				</Col>
			</Flex>
		</>
	);
};

export default CreateCourse;
