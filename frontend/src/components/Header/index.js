import React from "react";
import { Container } from "./styles";
import CategoriesDialog from "./../CategoriesDialog";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function Header() {
  const history = useHistory();
  return (
    <Container>
      <h1>ToDay</h1>
      <Button onClick={()=>{
        localStorage.setItem('usuarioId', '');
        history.push("/");
      }} color="ligth">Sair</Button>
    </Container>
  );
}

export default Header;
