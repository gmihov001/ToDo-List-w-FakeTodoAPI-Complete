import React, { useState, useEffect } from "react";

import Todo from "./Todo";

const TodoList = () => {
	const [singleTodo, setSingleTodo] = useState("");
	const [todos, setTodos] = useState([
		// { label: "brush teeth" },
		// { label: "make the bed" },
		// { label: "walk dog" }
	]);

	const uri = "https://assets.breatheco.de/apis/fake/todos/user/Gmihov";

	useEffect(() => {
		fetch(uri)
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				// Read the response as json.
				return response.json();
			})
			.then(function(responseAsJson) {
				// Do stuff with the JSON
				console.log("responseAsJson", responseAsJson);
				setTodos(responseAsJson);
			})
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
	}, []);

	const handleClick = e => {
		fetch(uri, {
			method: "PUT",
			body: JSON.stringify(
				todos.concat({ label: singleTodo, done: false })
			),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(response => console.log("Success:", response))
			.catch(error => console.error("Error:", error));
		setTodos(todos.concat({ label: singleTodo, done: false }));
		setSingleTodo("");
	};

	const deleteTodo = index => {
		const newTodos = todos.filter((item, ind) => index != ind);
		setTodos(newTodos);
		fetch(uri, {
			method: "PUT", // or 'PUT'
			body: JSON.stringify(newTodos), // data can be `string` or {object}!
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(response => console.log("Success:", response))
			.catch(error => console.error("Error:", error));
	};

	return (
		<>
			<input
				type="text"
				name="todo"
				onChange={e => setSingleTodo(e.target.value)}
				value={singleTodo}
			/>
			<button onClick={handleClick}> Save </button>

			<ul>
				{" "}
				{todos.map((value, index) => (
					<Todo
						todo={value}
						key={index}
						index={index}
						deleteTodo={deleteTodo}
					/>
				))}
			</ul>

			<div className="remaining-todos"> {todos.length} items left </div>
		</>
	);
};

export default TodoList;
