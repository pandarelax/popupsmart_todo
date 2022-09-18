export type Task = {
  id: string;
  label: string;
  isComplete: boolean;
};

export type TasksProps = {
  taskToEdit: Task | null;
  setTaskToEdit: Dispatch<SetStateAction<Task | null>>;
  addTask: (task: Pick<Task, "label">) => void;
  focusedTask?: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  shuffleFocusedTask: () => void;
  updateTaskCompletion: (taskId: string, isComplete: boolean) => void;
};
