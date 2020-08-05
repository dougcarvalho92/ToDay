import React, { useState, useEffect } from "react";

import {
  Container,
  ButtonGroupHeader,
  DeleteButton,
  EditButton,
} from "./styles";
import { MdRemove, MdEdit } from "react-icons/md";
import { Checkbox, FormControlLabel } from "@material-ui/core";

function Card({ data, ...props }) {
  const [checked, setChecked] = useState(data.concluida === 0 ? false : true);
  useEffect(() => {
    props.handleUpdateTask(data.id, data.nome, checked);
  }, [checked]);
  return (
    <Container done={data.concluida}>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={(item) => setChecked(item.target.checked)}
            name={data.nome}
            color="primary"
          />
        }
        label={data.nome}
      />
      <ButtonGroupHeader>
        <EditButton
          done={data.concluida}
          onClick={() => props.handleEditOpen(data.id, data.nome, checked)}
        >
          <MdEdit size={10} color="fff" />
        </EditButton>
        <DeleteButton
          done={data.concluida}
          onClick={() => props.handleRemoveTask(data.id)}
        >
          <MdRemove size={10} color="fff" />
        </DeleteButton>
      </ButtonGroupHeader>
    </Container>
  );
}

export default Card;
