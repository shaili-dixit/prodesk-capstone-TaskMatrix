import { useTasks } from "../context/TaskContext";
import "./TaskCard.css";

function TaskCard({ task }) {

    const { toggleTask, deleteTask } = useTasks();

    return (
        <div className="task-card">

            <div className="task-card-left">

                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                />

                <div className="task-card-content">

                    <h3
                        className={
                            task.completed
                                ? "task-completed"
                                : ""
                        }
                    >
                        {task.title}
                    </h3>

                    <p>
                        Assigned to: {task.assignedTo}
                    </p>

                </div>

            </div>


            <div className="task-card-right">

                <span
                    className={`task-priority ${
                        task.priority === "High"
                            ? "high"
                            : task.priority === "Medium"
                                ? "medium"
                                : "low"
                    }`}
                >
                    {task.priority}
                </span>


                <button
                    className="delete-task-button"
                    onClick={() => deleteTask(task.id)}
                    title="Delete task"
                >
                    🗑
                </button>

            </div>

        </div>
    );
}

export default TaskCard;