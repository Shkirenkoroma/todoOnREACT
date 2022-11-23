import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faPenToSquare, faBan } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import dayjs from "dayjs";
import { useEffect } from "react";
import EditInput from "./EditInput/EditInput";
import "./todoItem.less";

const TodoItem = ({ setTodoList, todoItem }) => {
	const [edit, setEdit] = useState(false);
	const [title, setTitle] = useState(todoItem.title);
	const [describe, setDescribe] = useState(todoItem.describe);
	const [date, setDate] = useState(todoItem.data);
	const [file, setFile] = useState(todoItem.uploadedFile);

	


	useEffect(() => {
		const difTime = dayjs(date).diff(dayjs());
		setTimeout(() => {
			setTodoList(
				prev => [...prev.map(item =>
					item.id === todoItem.id ? { ...item, status: false } : { ...item }
				)]
			);
		}, difTime);
	}, [date]);

	const deleteTodo = (id) => {
		setTodoList(prev => [...prev.filter((item) => item.id !== id)]);
	}

	const updateStatusTodo = (id) => {
		setTodoList(prev => [
			...prev.map((item) =>
				item.id === id ? { ...item, status: !item.status } : { ...item }
			)
		]);
	}

	const saveTodoList = (e) => {
		console.log('saveTodoList');
		e.stopPropagation();
		setTodoList(prev => [...prev.map(
			(item) => item.id === todoItem.id
				? { ...item, title: title, describe: describe, data: date, uploadedFile: file }
				: { ...item })]);
		setEdit(false);
	}

	const onEditInputFileClick = (e) => {
		const selectedFile = e.target.files[0];
		console.log('selectedFile: ', selectedFile);
		if (selectedFile) {
			const size = file.size / 1024;
			size <= 4096 && setFile(selectedFile)
		}
	};

	return (
		<div className="wrap-content">
			{edit ? (
				<div className="todoItem_ul">
					<EditInput value={title} onChange={setTitle} />
					<EditInput value={describe} onChange={setDescribe} />
					<EditInput value={date} type="date" onChange={setDate} />
					<EditInput value={file.name} onChange={onEditInputFileClick} type="file">
						<button className="save_button" onClick={saveTodoList}>
							<FontAwesomeIcon icon={faFloppyDisk} />
						</button>
					</EditInput>
				</div>
			) : (
				<>
					<div className={todoItem.status === true ? "todoItem_ul" : "todoItem_ul items"}>
						<div className="todoItem_li">{todoItem.title}</div>
						<div className="todoItem_li">{todoItem.describe}</div>
						<div className="todoItem_li">{todoItem.data}</div>
						<div className="todoItem_li">
							{todoItem.uploadedFile.name}
							<div className="buttons">
								<button onClick={() => deleteTodo(todoItem.id)}>
									<span className="text">
										<FontAwesomeIcon icon={faTrash} />
									</span>
								</button>
								<button onClick={() => updateStatusTodo(todoItem.id)}>
									<span className="text">
										<FontAwesomeIcon
											icon={todoItem.status ? faCheck : faBan}
										/>
									</span>
								</button>
								<button onClick={() => setEdit(true)}>
									<span className="text">
										<FontAwesomeIcon icon={faPenToSquare} />
									</span>
								</button>
							</div>

						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default TodoItem;
