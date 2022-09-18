import React, { ChangeEvent, KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  width: 460px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 15px;
  color: #fff;
  padding: 20px 24px;
  width: 100%;
  margin: 20px auto;
`;

const Nav = styled.button`
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 15px;
  color: #fff;
  padding: 20px 24px;
  width: 100%;
  :hover {
    background-color: rgba(66, 66, 69, 0.5);
  }
`;

const LoginPage = () => {
  const [username, setUsername] = React.useState("");

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleLoginKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && username !== "") {
      localStorage.setItem("username", username);
      window.location.href = "/todos";
      setUsername("");
    }
  };

  const handleLoginClick = () => {
    if (username !== "") {
      localStorage.setItem("username", username);
    }
  };

  return (
    <Section>
      <Container>
        <Header>LOGIN TO CONTINUE</Header>
        <Input
          value={username}
          placeholder="Enter your username..."
          onChange={handleUsernameChange}
          onKeyPress={handleLoginKeyPress}
          type="text"
        />
        <Link to="/todos" onClick={handleLoginClick}>
          <Nav type="submit" disabled={username === ""}>
            LOGIN
          </Nav>
        </Link>
      </Container>
    </Section>
  );
};

export default LoginPage;
