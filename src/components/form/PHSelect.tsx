/* eslint-disable no-mixed-spaces-and-tabs */
import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
	label: string;
	name: string;
	options:
		| {
				value: string;
				label: string;
				disabled?: boolean;
		  }[]
		| undefined;
	disabled?: boolean;
	mode?: "multiple" | undefined;
};

const PHSelect = ({ label, name, options, disabled, mode }: TPHSelectProps) => {
	return (
		<Controller
			name={name}
			render={({ field, fieldState: { error } }) => (
				<Form.Item label={label}>
					<Select
						mode={mode}
						{...field}
						style={{ width: "100%" }}
						options={options}
						allowClear
						size="large"
						disabled={disabled}
					/>
					{error && <small style={{ color: "red" }}>{error.message}</small>}
				</Form.Item>
			)}
		/>
	);
};

export default PHSelect;
