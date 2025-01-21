import { useState, useEffect } from "react";
import { AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
import Select from "react-select";
import { useRecoilState } from "recoil";
import { tasksState } from "../recoil/Atomic";

export default function Tasks() {
  const [tasks, setTasks] = useRecoilState(tasksState);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("in-progress");
  const [filterStatus, setFilterStatus] = useState("");
  const [isClient, setIsClient] = useState(false); 

  const statusOptions = [
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  // Delay client-side rendering logic to prevent mismatch
  useEffect(() => {
    setIsClient(true); // Set to true once component is mounted on the client
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (title && deadline) {
      const newTask = {
        id: Date.now(),
        title,
        deadline,
        status,
      };
      setTasks((prev) => [...prev, newTask]);
      setTitle("");
      setDeadline("");
      setStatus("in-progress");
    }
  };

  const toggleStatus = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "in-progress" ? "completed" : "in-progress" }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => (filterStatus ? task.status === filterStatus : true));

  // Return null or loading state during SSR until client-side rendering completes
  if (!isClient) {
    return null;
  }

  return (
    <div className="ml-4 mt-4 p-4">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      {/* Task Form */}
      <form onSubmit={addTask} className="flex flex-col space-y-3 w-full sm:w-2/3 md:w-1/2 mx-auto">
        <input
          className="rounded p-1 text-black"
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="rounded p-1 text-black"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <select
          className="rounded p-1 text-black"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 py-1 rounded hover:bg-blue-700 sm:w-full md:w-auto"
        >
          Add Task
        </button>
      </form>

      {/* Filter by Status */}
      <div className="mt-4 w-1/2 sm:w-1/3 mx-auto">
        <Select
          options={statusOptions}
          onChange={(selectedOption) => setFilterStatus(selectedOption.value)}
          placeholder="Filter by Status"
          className="w-full text-black"
        />
      </div>

      {/* Task List */}
      <ul className="mt-6 space-y-4">
        {filteredTasks.map((task) => (
          <li key={task.id} className="flex flex-col md:flex-row md:justify-between items-start md:items-center p-4 rounded bg-gray-800">
            <div>
              <p className="font-bold">{task.title}</p>
              <p className="text-sm">Deadline: {task.deadline}</p>
              <p className={`font-bold ${task.status === "completed" ? "text-green-500" : "text-yellow-500"}`}>
                Status: {task.status}
              </p>
            </div>
            <div className="flex space-x-2 mt-2 md:mt-0">
              <button
                className="text-white bg-green-500 rounded px-2 hover:bg-green-600"
                onClick={() => toggleStatus(task.id)}
              >
                <AiOutlineCheck />
              </button>
              <button
                className="text-white bg-red-900 rounded px-2 hover:bg-red-600"
                onClick={() => deleteTask(task.id)}
              >
                <AiOutlineDelete />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
