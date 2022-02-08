import React from "react";

const Todo = ({ todo, index, deleteTodo }) => {
	return (
		<li className="todo">
			<h5>{todo}</h5>
			<button className="btn-delete" onClick={() => deleteTodo(index)}>
				X
			</button>
		</li>
	);
};

export default Todo;
