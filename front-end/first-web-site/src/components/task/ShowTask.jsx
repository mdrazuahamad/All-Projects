function ShowTask({ tasks }) {
  return (
    <div>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>{task.text}</li>
          ))}
        </ul>
      ) : (
        <p> No Task</p>
      )}
    </div>
  );
}

export default ShowTask;
