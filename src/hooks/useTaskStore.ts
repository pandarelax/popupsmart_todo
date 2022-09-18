// import { shuffle } from "lodash";
import axios from "axios";
import { nanoid } from "nanoid";
import { useContext, useEffect, useState } from "react";
import TaskContext from "../contexts/task-store";
import { Task } from "../types";

const useTaskStore = () => {
  const [tasks, setTasks] = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const getAllTasks = async (tasks: Task[]) => {
    const response = await axios.get(
      "https://63175e5aece2736550b11750.mockapi.io/todos"
    );

    setTasks(response.data);
  };

  useEffect(() => {
    getAllTasks([...tasks]);
  });

  const addTask = async (task: Pick<Task, "label">) => {
    const id = nanoid();

    const request = {
      id,
      label: task.label,
      isComplete: false,
    };

    const response = await axios.post(
      "https://63175e5aece2736550b11750.mockapi.io/todos/",
      request
    );

    setTasks((tasks) => [...tasks, response.data]);
  };

  const updateTaskCompletion = async (taskId: string, isComplete: boolean) => {
    const response = await axios.put(
      "https://63175e5aece2736550b11750.mockapi.io/todos/" + taskId,
      {
        isComplete,
      }
    );
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === taskId) return { ...task, response };
        return task;
      })
    );
    return window.location.reload();
  };

  const deleteTask = async (taskId: string) => {
    await axios.delete(
      "https://63175e5aece2736550b11750.mockapi.io/todos/" + taskId
    );
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
    return window.location.reload();
  };

  const updateTask = async (taskId: string, label: string) => {
    await axios.put(
      "https://63175e5aece2736550b11750.mockapi.io/todos/" + taskId,
      {
        label,
      }
    );
    setTasks((tasks) =>
      tasks.filter((task) => {
        if (task.id === taskId)
          return {
            ...task,
            label,
          };
        return [];
      })
    );
    return window.location.reload();
  };

  const api = {
    addTask,
    updateTask,
    deleteTask,
    tasks,
    setTasks,
    isEditing,
    setIsEditing,
    updateTaskCompletion,
  };

  return api;
};

export default useTaskStore;
