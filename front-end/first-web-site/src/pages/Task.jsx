import { useState } from "react";
import Layout from "../components/layout/Layout";
import CreateTask from "../components/task/CreateTask";
import shortid from "shortid";
import ShowTask from "../components/task/ShowTask";

function Task() {
  const [tasks, setTasks] = useState([]);
  const [visility, setVisivility] = useState("all");

  const addNewTask = (text) => {
    const task = {
      text,
      isCompleted: false,
      createdAt: new Date().getTime(),
      id: shortid.generate(),
    };
    setTasks([task, ...tasks]);
  };
  return (
    <Layout>
      <h1>Task</h1>
      <CreateTask addNewTask={addNewTask} />
      <ShowTask tasks={tasks} />
    </Layout>
  );
}

export default Task;
