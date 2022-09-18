import React, { ChangeEvent, KeyboardEvent, useState } from "react";

import styled from "styled-components";
import Checkbox from "../components/Checkbox";
import IconButton from "../components/IconButton";
import Spacer from "../components/Spacer";
import TextButton from "../components/TextButton";
import useTaskStore from "../hooks/useTaskStore";
import DeleteIcon from "../icons/DeleteIcon";
import EditIcon from "../icons/EditIcon";
import { Task } from "../types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 460px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const List = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: 45px 24px;
`;

const ListItem = styled.label`
  align-items: center;
  display: flex;
  font-size: 18px;
  padding: 4px 0;
`;

const DeleteButton = styled(IconButton)`
  visibility: hidden;
  ${ListItem}:hover & {
    visibility: visible;
  }
`;

const EditButton = styled(IconButton)`
  visibility: hidden;
  ${ListItem}:hover & {
    visibility: visible;
  }
`;

const Input = styled.input`
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 15px;
  color: #fff;
  padding: 20px 24px;
`;

type Props = {};

const ListPage: React.FC<Props> = () => {
  const {
    addTask,
    updateTask,
    deleteTask,
    isEditing,
    setIsEditing,
    tasks,
    setTasks,
    updateTaskCompletion,
  } = useTaskStore();
  const [newTaskLabel, setNewTaskLabel] = useState("");

  const handleNewTaskLabelChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTaskLabel(e.target.value);

  const handleNewTaskKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTaskLabel !== "") {
      if (isEditing && tasks.length > 0) {
        const taskToEdit = (editingTask: Task) => {
          updateTask(editingTask.id, newTaskLabel);
          setIsEditing(false);
        };
        taskToEdit(tasks.filter((task) => isEditing)[0]);
        setIsEditing(false);
        setNewTaskLabel("");
        console.log("yemedi");
      } else {
        addTask({ label: newTaskLabel });
        setNewTaskLabel("");
        setIsEditing(false);
        console.log("agaaaa");
      }
    }
  };

  const handleTaskCompleteChange =
    (task: Task) => (e: ChangeEvent<HTMLInputElement>) => {
      updateTaskCompletion(task.id, e.target.checked);
    };

  const handleTaskDeleteClick = (handledTask: Task) => () => {
    deleteTask(handledTask.id);
    setTasks((tasks) => tasks.filter((task) => task.id !== handledTask.id));
  };

  const handleClearClick = () =>
    setTasks((tasks) => tasks.filter((task) => !task.isComplete));

  const handleTaskEditClick = (editedTask: Task) => () => {
    setIsEditing(true);
    setNewTaskLabel(editedTask.label);
    console.log(editedTask);
  };

  const Username = localStorage.getItem("username");

  return (
    <Container>
      <Header>
        <h1>{Username}'s Todo List</h1>
      </Header>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <Checkbox
              checked={task.isComplete}
              onChange={handleTaskCompleteChange(task)}
            />
            <Spacer width={24} />
            {task.label}
            <Spacer flex={1} />
            <DeleteButton onClick={handleTaskDeleteClick(task)}>
              <DeleteIcon />
            </DeleteButton>
            <EditButton onClick={handleTaskEditClick(task)}>
              <EditIcon />
            </EditButton>
          </ListItem>
        ))}
      </List>
      <Spacer height={30} />
      <Input
        placeholder="Add a task"
        value={newTaskLabel}
        onChange={handleNewTaskLabelChange}
        onKeyPress={handleNewTaskKeyPress}
      />
      <Spacer height={45} />
      <TextButton onClick={handleClearClick} style={{ alignSelf: "center" }}>
        clear completed
      </TextButton>
    </Container>
  );
};

export default ListPage;
