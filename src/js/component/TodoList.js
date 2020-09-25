import React, { useState, useEffect } from "react";

import Todo from "./Todo";

const TodoList = () => {
	const [singleTodo, setSingleTodo] = useState("");
	const [todos, setTodos] = useState([
		{ label: "brush teeth" },
		{ label: "make the bed" },
		{ label: "walk dog" }
	]);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jdglez91")
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
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jdglez91", {
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
		fetch("https://assets.breatheco.de/apis/fake/todos/user/jdglez91", {
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
			<form onSubmit={e => e.preventDefault()}>
				<input
					type="text"
					name="todo"
					onChange={e => setSingleTodo(e.target.value)}
					value={singleTodo}
				/>
				<button onClick={handleClick}> Save </button>
			</form>
			{todos.map((value, index) => (
				<Todo
					todo={value.label}
					key={index}
					index={index}
					deleteTodo={deleteTodo}
				/>
			))}
			<div className="remaining-todos"> {todos.length} item left </div>
		</>
	);
};

export default TodoList;
