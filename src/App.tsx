import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import TaskContext from "./contexts/task-store";
import useLocalStorage from "./hooks/useLocalStorage";
import ListPage from "./pages/ListPage";
import LoginPage from "./pages/LoginPage";
import { GlobalStyle } from "./styles";
import { Task } from "./types";

const Layout = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 35px;
`;

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <TaskContext.Provider value={[tasks, setTasks]}>
          <Layout>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/todos" element={<ListPage />}></Route>
            </Routes>
          </Layout>
        </TaskContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
