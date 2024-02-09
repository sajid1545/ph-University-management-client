import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { TUser, logout, useCurrentToken } from "../../redux/features/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { verifyToken } from "../../utils/verifyToken";

type TProtectedRouteProps = {
	children: ReactNode;
	role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRouteProps) => {
	const location = useLocation();
	const token = useAppSelector(useCurrentToken);

	let user;
	if (token) {
		user = verifyToken(token);
	}

	const dispatch = useAppDispatch();

	if (role !== undefined && role !== (user as TUser)?.role) {
		dispatch(logout());
		return <Navigate to="/login" state={{ from: location }} replace={true} />;
	}

	if (!token) {
		return <Navigate to="/login" state={{ from: location }} replace={true} />;
	}

	return children;
};

export default ProtectedRoute;
