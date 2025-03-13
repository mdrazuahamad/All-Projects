import { useState } from "react";

function CreateTask({ addNewTask }) {
  const [text, setText] = useState("");
  return (
    <div>
      <h1>Create a New Task</h1>
      <input
        type=' text'
        placeholder='Enter Your Task Name'
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
      />
      <button
        onClick={() => {
          if (text) {
            addNewTask(text);
            setText("");
          } else {
            alert("Please enter a your task name");
          }
        }}>
        Create Task
      </button>
    </div>
  );
}

export default CreateTask;
