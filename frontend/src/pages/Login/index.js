import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, LoginBox } from "./styles";
import api from "../../services/api";
import { Button, TextField } from "@material-ui/core";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const history = useHistory();
  const userId = localStorage.getItem("usuarioId");
  if (userId) {
    history.push("/list");
  }
  async function handleLogin(e) {
    e.preventDefault();

    const data = { email, senha };
    console.log(data);
    await api
      .post("login", data, {
        headers: {
          authorization: "",
        },
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem("usuarioId", response.data.id);
        history.push("/list");
      })
      .catch((error) => {
        console.log(error);
        console.log(error);
        alert("Falha no login, tente novamente!");
      });
  }

  return (
    <Container>
      <LoginBox>
        <h1>Entrar</h1>
        <form>
          <TextField
            id="standard-full-width"
            style={{ marginBottom: 20 }}
            placeholder="E-mail"
            fullWidth
            margin="normal"
            value={email}
            type="email"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(value) => setEmail(value.target.value)}
          />
          <TextField
            id="standard-full-width"
            style={{ marginBottom: 50 }}
            placeholder="Senha"
            fullWidth
            margin="normal"
            value={senha}
            type="password"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(value) => setSenha(value.target.value)}
          />

          <Button
            color="secondary"
            onClick={handleLogin}
            className="default-button"
          >
            Entrar
          </Button>
        </form>
        <Link to="/register" className="decoration-none">
          Não possui conta? Registre-se
        </Link>
      </LoginBox>
    </Container>
  );
}

export default Login;
