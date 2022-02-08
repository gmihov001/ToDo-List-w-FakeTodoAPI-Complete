import React from "react";
import PropTypes from "prop-types";

const Todo = ({ todo, index, deleteTodo, markDone }) => {
	return (
		<li className={todo.done ? "todo-done" : "todo"}>
			<span className={todo.done ? "text-success" : ""}>
				{todo.label}
			</span>
			<span className="buttons">
				<span className="btn-delete" onClick={() => markDone(index)}>
					<i
						className={
							todo.done
								? "bi bi-check2 text-success"
								: "bi bi-check2"
						}
					/>
				</span>
				<span className="btn-delete" onClick={() => deleteTodo(index)}>
					<i className="bi bi-x-lg" />
				</span>
			</span>
		</li>
	);
};

Todo.propTypes = {
	todo: PropTypes.object,
	deleteTodo: PropTypes.func,
	index: PropTypes.number,
	markDone: PropTypes.func
};

export default Todo;
