import React, { useState}from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faEraser } from '@fortawesome/free-solid-svg-icons'


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [ inputValue, setInputValue ] = useState("");
	const [ToDos , setToDos] = useState([]);

	

	return (
		<div className="container">
            <h1> <stong>To-Do's</stong></h1>
			<ul>
				<li>
					<input 
					type="text"
					 onChange={(e) => setInputValue(e.target.value)}
					 value={inputValue}
					 onKeyPress={(e) => {
						if (e.key === "Enter" && inputValue.trim() !== "") {
							setToDos(ToDos.concat(inputValue));
							setInputValue(""); // Reset input
						}
					 }}
				 	 placeholder="No To-Do , add a To-Do " ></input>
				</li>
				{ToDos.map((items, index) => (
    <li className="todo-item" key={index}>
        {items}
        <FontAwesomeIcon
            icon={faEraser}
            onClick={() =>
                setToDos(ToDos.filter((t, currentIndex) => index != currentIndex))
            }
        />
    </li>
))}
		
			</ul>
			<div> {ToDos.length} </div>

		</div>
	);
};

export default Home;