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
		getFetch();
	}, []);

	const getFetch = () => {
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
	};

	const updatePut = updatedTodos => {
		fetch(uri, {
			method: "PUT",
			body: JSON.stringify(updatedTodos),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(response => {
				console.log("Success:", response);
				getFetch();
			})
			.catch(error => console.error("Error:", error));
	};

	const addTodo = e => {
		let newTodos = todos.concat({ label: singleTodo, done: false });
		if (e.target.id == "input") {
			if (e.key == "Enter") {
				setTodos(newTodos);
				updatePut(newTodos);
				setSingleTodo("");
			}
		} else if (e.target.id == "button") {
			setTodos(newTodos);
			updatePut(newTodos);
			setSingleTodo("");
		}
	};

	const markDone = index => {
		let newTodos = todos.map((item, ind) => {
			if (ind == index) {
				item.done = !item.done;
				return item;
			} else {
				return item;
			}
		});
		setTodos(newTodos);
		updatePut(newTodos);
	};

	const deleteTodo = index => {
		const newTodos = todos.filter((item, ind) => index != ind);
		setTodos(newTodos);
		updatePut(newTodos);
	};

	return (
		<>
			<input
				type="text"
				id="input"
				name="todo"
				onChange={e => setSingleTodo(e.target.value)}
				onKeyUp={addTodo}
				value={singleTodo}
			/>
			<button id="button" onClick={addTodo}>
				{" "}
				Save{" "}
			</button>

			<ul>
				{" "}
				{todos.map((value, index) => (
					<Todo
						todo={value}
						key={index}
						index={index}
						deleteTodo={deleteTodo}
						markDone={markDone}
					/>
				))}
			</ul>

			<div className="remaining-todos text-secondary">
				{todos.length} items left
			</div>
		</>
	);
};

export default TodoList;
