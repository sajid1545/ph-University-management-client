import { Modal } from "antd";
import { toast } from "sonner";
import { useUpdateUserStatusMutation } from "../../redux/features/admin/userManagement.api";

type TChangeStatusModalProps = {
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	id: string;
};

const ChangeStatusModal = ({ isModalOpen, setIsModalOpen, id }: TChangeStatusModalProps) => {
	console.log("🚀 ~ ChangeStatusModal ~ id:", id);
	const [changeUserStatus] = useUpdateUserStatusMutation();

	const handleOk = async () => {
		const statusData = {
			status: "blocked",
		};

		const res = await changeUserStatus({ id, status: statusData });
		console.log("🚀 ~ handleOk ~ res:", res);
		toast.success("User status changed successfully");

		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	return (
		<>
			<Modal centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
				<h3 style={{ textAlign: "center", margin: "30px", color: "red", fontSize: "20px" }}>
					Are you sure you want to change user status. If yes, click on ok
				</h3>
			</Modal>
		</>
	);
};

export default ChangeStatusModal;
