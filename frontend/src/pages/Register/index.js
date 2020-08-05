import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, RegisterBox } from "./styles";
import api from "../../services/api";
import { Button, TextField } from "@material-ui/core";

function Register() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [nome, setNome] = useState("");
  const handleRegister = async () => {
    const data = { email, senha, nome };
    await api
      .post("register", data)
      .then((response) => {
        console.log(response);
        localStorage.setItem("usuarioId", response.data.id);
        history.push("/list");
      })
      .catch((error) => {
        console.log(error);
        alert("Falha no login, tente novamente!");
      });
  };

  return (
    <Container>
      <RegisterBox>
        <h1>Registro</h1>
        <form>
          <TextField
            style={{ marginBottom: 20 }}
            placeholder="Nome"
            fullWidth
            margin="normal"
            value={nome}
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(value) => setNome(value.target.value)}
          />
          <TextField
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
            style={{ marginBottom: 20 }}
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
          <TextField
            style={{ marginBottom: 50 }}
            placeholder="Confirme a senha"
            fullWidth
            margin="normal"
            value={confirmaSenha}
            type="password"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(value) => setConfirmaSenha(value.target.value)}
          />
          <Button
            color="secondary"
            onClick={handleRegister}
            className="default-button"
          >
            Registrar
          </Button>
        </form>

        <Link to="/" className="decoration-none">
          Já possui uma conta? Faça o login
        </Link>
      </RegisterBox>
    </Container>
  );
}

export default Register;
