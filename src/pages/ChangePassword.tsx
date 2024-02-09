import { Button, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { logout } from "../redux/features/Auth/authSlice";
import { useChangePasswordMutation } from "../redux/features/admin/userManagement.api";
import { useAppDispatch } from "../redux/hooks";
import { TResponse } from "../types";

const ChangePassword = () => {
	const [changePassword] = useChangePasswordMutation();
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const toastId = toast.loading("Changing password...");
		try {
			const res = (await changePassword(data)) as TResponse<any>;
			if (res.data.success) {
				dispatch(logout());
				navigate("/login");
			}
			toast.success("Password changed", { id: toastId });
		} catch (error) {
			toast.error("Something went wrong", { id: toastId });
		}
	};
	return (
		<Row justify="center" align="middle" style={{ height: "100vh" }}>
			<PHForm onSubmit={onSubmit}>
				<PHInput type="text" name="oldPassword" label="Old Password" />
				<PHInput type="text" name="newPassword" label="New Password" />
				<Button type="primary" htmlType="submit">
					Login
				</Button>
			</PHForm>
		</Row>
	);
};

export default ChangePassword;
