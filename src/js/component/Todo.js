import React from "react";

const Todo = ({ todo, index, deleteTodo }) => {
	return (
		<>
			<div className="todo">
				<h5>{todo}</h5>
				<button
					className="btn-delete"
					onClick={() => deleteTodo(index)}>
					X
				</button>
			</div>
			<div className="line" />
		</>
	);
};

export default Todo;
