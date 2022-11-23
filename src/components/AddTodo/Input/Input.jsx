import { getDiffDates } from "../../../utils/getDiffDates";
import "./Input.less";

const Input = (props) => {
	const { inputError, title, placeholder, type = 'text', value, onChange } = props;

	const getErrorText = () => {
		if (type === 'date' && value) {
			return getDiffDates(value) < 0 ? 'Неверная дата' : '';
		}

		return 'Поле не может быть пустым';
	}

	return (
		<div className="input_container">
			<div className="input_title">{title}</div>
			<input
				className={inputError && 'input_error'}
				placeholder={placeholder}
				type={type}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
			{inputError && <div className="input_error_message">{getErrorText()}</div>}
		</div>
	);
}

export default Input;
