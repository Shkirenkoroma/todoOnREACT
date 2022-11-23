import { useState } from "react";
import DragAndDrop from "./DragAndDrop/DragAndDrop";
import Input from "./Input/Input";
import "./DragAndDrop/DragAndDrop";
import "./addtodo.less";
import dayjs from "dayjs";
import { getDiffDates } from "../../utils/getDiffDates";

const AddTodo = ({ todoList, setTodoList }) => {
	const [title, setTitle] = useState("");
	const [describe, setDescribe] = useState("");
	const [date, setDate] = useState("");
	const [uploadedFile, setUploadedFile] = useState(null);
	const [isCheckForm, setIsCheckForm] = useState(false);

	const titleInputError = isCheckForm && !title;
	const describeInputError = isCheckForm && !describe;
	const dateInputError = isCheckForm && (!date || getDiffDates(date) < 0);
	const fileInputError = isCheckForm && !uploadedFile;
	
	const saveTodo = () => {
		const allowedFileSize = (uploadedFile?.size / 1024) < 4096;

		if (title && describe && date && allowedFileSize && getDiffDates(date) > 0) {
			setTodoList([
				...todoList,
				{
					id: Math.random(),
					title: title,
					status: true,
					data: date,
					describe: describe,
					uploadedFile: uploadedFile
				},
			]);
			setTitle('');
			setDescribe('');
			setDate('');
			setUploadedFile(null);
			setIsCheckForm(false);
		} else {
			setIsCheckForm(true)
		}
	};

	return (
		<div className="todo_container">
			<div className="todo_content">
				<div className="todo_inputs">
					<Input
						inputError={titleInputError}
						title="Заголовок"		
						placeholder="Введите заголовок"
						value={title}
						onChange={setTitle}
						/>
					<Input 
						inputError={describeInputError}
						title="Описание"		
						placeholder="Описание задачи"
						value={describe}
						onChange={setDescribe}
						/>
					<Input 
						inputError={dateInputError}
						title="Дата завершения"		
						type="date"
						placeholder="Введите дату выполнения"
						value={date}
						onChange={setDate}
					
					/>
				</div>
				<div className="todo_drag">
					<DragAndDrop file={uploadedFile} setFile={setUploadedFile} isError={fileInputError} />
				</div>
			</div>
			<button className="btn" onClick={saveTodo}>
				<span className="text">Добавить</span>
			</button>
		</div>
	);
};

export default AddTodo;
