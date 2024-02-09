import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { useLoginMutation } from "../redux/features/Auth/authApi";
import { TUser, setUser } from "../redux/features/Auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
	const dispatch = useAppDispatch();

	const defaultValues = {
		id: "2025010001",
		password: "student12345",
	};

	const [login] = useLoginMutation();

	const navigate = useNavigate();
	// const location = useLocation();
	// const from = location.state?.from?.pathname || "/";

	const onSubmit = async (data: FieldValues) => {
		const toastId = toast.loading("Logging in...");
		try {
			const userInfo = {
				id: data.id,
				password: data.password,
			};
			const res = await login(userInfo).unwrap();

			const user = verifyToken(res.data.accessToken) as TUser;
			dispatch(setUser({ user: user, token: res.data.accessToken }));
			toast.success("Login success", { id: toastId, duration: 2000 });
			// navigate(from, { replace: true });
			if (res.data?.needsPasswordChange) {
				navigate(`/change-password`);
			} else {
				navigate(`/${user?.role}/dashboard`);
			}
		} catch (error) {
			toast.error("Something went wrong", { id: toastId, duration: 2000 });
		}
	};

	return (
		<Row justify="center" align="middle" style={{ height: "100vh" }}>
			<PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
				<PHInput type="text" name="id" label={"Id"} />
				<PHInput type="text" name="password" label={"Password"} />
				<Button type="primary" htmlType="submit">
					Login
				</Button>
			</PHForm>
		</Row>
	);
};

export default Login;
