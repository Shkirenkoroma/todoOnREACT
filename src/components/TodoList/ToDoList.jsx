import TodoItem from "./TodoItem/TodoItem";
import "./todolist.less";

const ToDoList = ({ todoList, setTodoList }) => (
	<div>
		{!!todoList.length && <div className="todolist">
			<div className="todolist_item">Заголовок</div>
			<div className="todolist_item">Описание</div>
			<div className="todolist_item">Дата завершения</div>
			<div className="todolist_item">Прикрепленные файлы</div>
		</div>
		}
		{todoList.map(todoItem => (
			<div key={todoItem.id}>
				<TodoItem todoItem={todoItem} setTodoList={setTodoList} />
			</div>
		))}
	</div>
);

export default ToDoList;
