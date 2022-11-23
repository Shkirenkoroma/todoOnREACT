import Header from "./components/Header/Header";
import AddTodo from "./components/AddTodo/AddToDo";
import "./App.less";
import ToDoList from "./components/TodoList/ToDoList";
import { useState } from "react";

const App = () => {
	const [todoList, setTodoList] = useState([]);

	return (
		<div className="App">
			<Header />
			<AddTodo todoList={todoList} setTodoList={setTodoList} />
			<ToDoList todoList={todoList} setTodoList={setTodoList} />
		</div>
	);
}

export default App;
