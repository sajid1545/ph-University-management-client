import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/features/Auth/authApi";
import { setUser } from "../redux/features/Auth/authSlice";
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

	const [login, { error }] = useLoginMutation();

	if (error) {
		console.log(error);
	}

	const location = useLocation();
	const navigate = useNavigate();
	const from = location.state?.from?.pathname || "/";

	const onSubmit = async (data) => {
		const userInfo = {
			id: data.id,
			password: data.password,
		};

		const res = await login(userInfo).unwrap();
		const user = verifyToken(res.data.accessToken);

		dispatch(setUser({ user: user, token: res.data.accessToken }));
		navigate(from, { replace: true });
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
