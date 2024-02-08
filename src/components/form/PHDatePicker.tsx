import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TDatePickerProps = {
	name: string;
	label?: string;
	picker?: "date" | "week" | "month" | "quarter" | "year" | "time" | undefined;
};

const PHDatePicker = ({ name, label, picker }: TDatePickerProps) => {
	return (
		<div style={{ marginBottom: "20px" }}>
			<Controller
				name={name}
				render={({ field, fieldState: { error } }) => (
					<Form.Item label={label}>
						<DatePicker size="large" {...field} style={{ width: "100%" }} picker={picker} />
						{error && <small style={{ color: "red" }}>{error.message}</small>}
					</Form.Item>
				)}
			/>
		</div>
	);
};

export default PHDatePicker;
