import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/features/Auth/authApi";
import { TUser, setUser } from "../redux/features/Auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
	const dispatch = useAppDispatch();

	const { register, handleSubmit } = useForm({
		defaultValues: {
			id: "A-0001",
			password: "admin12345",
		},
	});

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
			navigate(`/${user?.role}/dashboard`);
		} catch (error) {
			toast.error("Something went wrong", { id: toastId, duration: 2000 });
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<label htmlFor="id">Id</label>
				<input type="text" id="id" {...register("id")} />
			</div>
			<div>
				<label htmlFor="password">Password</label>
				<input type="text" id="password" {...register("password")} />
			</div>
			<Button type="primary" htmlType="submit">
				Login
			</Button>
		</form>
	);
};

export default Login;
