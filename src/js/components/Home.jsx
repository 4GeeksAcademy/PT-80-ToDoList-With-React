import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser } from "@fortawesome/free-solid-svg-icons";

const APIBaseURL = "https://playground.4geeks.com/todo";
const username = "Mocha";

//create your first component
const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [ToDos, setToDos] = useState([]);

  //this is the API URL for fetching the tasks on start
  const fetchTasks = async () => {
    const response = await fetch(`${APIBaseURL}/users/${username}`);
    const data = await response.json();
    setToDos(data.todos || []);
  };

  const createUser = async () => {
    await fetch(`${APIBaseURL}/users/${username}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( [] ),
    });
  };

  useEffect(() => {
    createUser().then(fetchTasks);
  }, []);

  const addTask = async (label) => {
    const task = { label, done: false };
    await fetch(`${APIBaseURL}/todos/${username}`, {
      method: "POST",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${APIBaseURL}/todos/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
  };

  const clearAllTasks = async () => {
    // Delete each task one by one
    await Promise.all(
      ToDos.map((task) =>
        fetch(`${APIBaseURL}/todos/${task.id}`, { method: "DELETE" })
      )
    );
    setToDos([]);
  };

  return (
    <div className="container">
      <h1>
        {" "}
        <strong>To-Do's</strong>
      </h1>
      <ul>
        <li>
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyPress={async (e) => {
              if (e.key === "Enter" && inputValue.trim() !== "") {
                await addTask(inputValue.trim());
                setInputValue("");
              }
            }}
            placeholder="No To-Do , add a To-Do "
          ></input>
        </li>
        {ToDos.map((item, index) => (
          <li className="todo-item" key={item.id}>
            {item.label}
            <FontAwesomeIcon
              icon={faEraser}
              onClick={() => deleteTask(item.id)}
              style={{ cursor: "pointer", marginLeft: "10px" }}
            />
          </li>
        ))}
      </ul>
      <div> {ToDos.length} </div>
      <button onClick={clearAllTasks} className="btn btn-danger" style={{ marginTop: "10px" }}>
        Clear list 
      </button>
    </div>
  );
};

export default Home;
