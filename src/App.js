/**
 *
 * Welcome to the Student frontend developer challenge!
 *
 * Your task is to complete a simple Todo app in React. I've left in some partial code
 * for you to get started on.
 *
 * Once finished, users should be able to do the following:
 *
 * 1. "Add a todo". Todo is added, when the user types in a text for the todo in the form
 * and presses the "Add" button. Users should not be able to add empty todos. Text field
 * should be cleared once a todo is added. Te added todo should show up at the top of the Todo list.
 *
 * 2. "Show todos". The user should be able to see all added todos.
 *
 * 3. "Complete a todo". When user clicks a checkbox next to the todo, the "complete" state
 * of that Todo should toggle to the opposite value and that state should be reflected in the checkbox
 * i.e. if "complete" is true, checkbox is "checked", else it is "unchecked".
 *
 * 4. "Remove a todo". Once "Remove" button is clicked, the given todo should be removed
 * from the state and also disappear from the todo list.
 *
 * 5. The app should be styled, preferably using https://emotion.sh/, however, any styling
 * approach is acceptable.
 *
 * Note: As much as possible, please try to keep the given boiler plate code so that you can
 * showcase your ability to work with given parameters.
 *
 */

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
// import { css, jsx, Global, ClassNames } from "@emotion/react";

function Todos() {
  const [todos, setTodos] = React.useState([]);
  const [text, setText] = useState("");

  const onCreate = (e) => {
    e.preventDefault();
    console.log(text);
    // only submit the form if the 2 values exist
    if (text) {
      // The object values will be equal to the hooks value, so 'firstname: what the typed name is'
      const todo = {
        id: uuidv4(),
        text: text,
        completed: false,
      };
      console.log("Submit the form");
      // we use the spread operator so we can maintain the previous values, otherwise it will overwrite the same object
      setTodos((p) => {
        return [...p, todo];
      });
      setText("");
    } else {
      console.log("Empty values");
    }
  };

  const onRemove = (id) => {
    console.log("id", id);
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const onToggleComplete = (id) => {
    let mapped = todos.map((todo) => {
      return todo.id === id
        ? { ...todo, completed: !todo.completed }
        : { ...todo };
    });
    setTodos(mapped);
  };

  return (
    <div className="container">
      <main>
        <h1 className="todo-title">TO DO LIST</h1>
        <CreateTodo onCreate={onCreate} />
        {/** Show your "Create todo" form here */}
        <ul className="list">
          {todos.map((todo) => {
            return (
              <Todo
                id={todo.id}
                key={todo.id}
                text={todo.text}
                completed={todo.completed}
                onRemove={onRemove}
                onToggleComplete={onToggleComplete}
              />
            );
          })}
        </ul>
      </main>
    </div>
  );
  function CreateTodo({ onCreate }) {
    return (
      <form className="form" onSubmit={onCreate}>
        <div className="form-control">
          <label htmlFor="text" className="adding-task">
            Tasks:
          </label>
          <input
            autoFocus
            type="text"
            id="text"
            name="text"
            // The value in the forms depends and references on the state value
            value={text}
            // Each time we type on the form, the onChange functions fires and sets the state to the value in the input
            onChange={(e) => setText(e.target.value)}
          ></input>
          <button type="submit" className="button">
            Add
          </button>
        </div>
      </form>
    );
  }
}

function Todo({ id, text, completed, onRemove, onToggleComplete }) {
  const lineThrough = { textDecoration: completed ? "line-through" : "none" };
  return (
    <li key={id} className="listitem">
      <div style={lineThrough}>{text}</div>
      <div className="container-x-checkbox">
        <div>
          <input
            className="checkbox_style"
            type="checkbox"
            onChange={() => onToggleComplete(id)}
            checked={completed}
          ></input>
        </div>
        <div className="x_style" onClick={() => onRemove(id)}>
          X
        </div>
      </div>
    </li>
  );
}

export default function App() {
  return (
    <div className="App">
      <Todos />
    </div>
  );
}
