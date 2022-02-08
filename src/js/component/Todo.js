import React from "react";
import PropTypes from "prop-types";

const Todo = ({ todo, index, deleteTodo }) => {
	return (
		<li className="todo">
			<span>{todo}</span>
			<button className="btn-delete" onClick={() => deleteTodo(index)}>
				X
			</button>
		</li>
	);
};

Todo.propTypes = {
	todo: PropTypes.string,
	deleteTodo: PropTypes.func,
	index: PropTypes.number
};

export default Todo;
