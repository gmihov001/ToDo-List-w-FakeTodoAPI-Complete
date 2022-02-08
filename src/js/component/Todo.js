import React from "react";
import PropTypes from "prop-types";

const Todo = ({ todo, index, deleteTodo }) => {
	return (
		<li className="todo">
			<span>{todo.label}</span>
			<span className="btn-delete" onClick={() => deleteTodo(index)}>
				x
			</span>
		</li>
	);
};

Todo.propTypes = {
	todo: PropTypes.object,
	deleteTodo: PropTypes.func,
	index: PropTypes.number
};

export default Todo;
