import React, { useState, useEffect } from "react";
import {
  Fab,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  Switch,
  DialogContent,
  TextField,
  Dialog,
  Select,
  DialogActions,
  Button,
} from "@material-ui/core";
import api from "../../services/api";

function DialogForm(props) {
  const userId = localStorage.getItem("userId");
  const [listaNome, setListNome] = useState("");
  const [listaCategoriaId, setListaCategoriaId] = useState(0);
  const [listaConcluida, setListConcluida] = useState(false);

  useEffect(() => {
    setListNome(props.update.nome);
    setListaCategoriaId(props.update.categoriaId);
    setListConcluida(props.update.concluida === 0 ? false : true);
  }, [props]);

  return (
    <Dialog
      open={props.open}
      onClose={() => props.handleClose()}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent>
        <FormControl className="max-width">
          <TextField
            id="standard-basic"
            label="Nome"
            value={listaNome}
            onChange={(item) => setListNome(item.target.value)}
          />
        </FormControl>
        <FormControl className="max-width">
          <InputLabel id="label-category">Categoria</InputLabel>
          <Select
            labelId="label-category"
            onChange={(item) => {
              setListaCategoriaId(item.target.value);
            }}
            value={listaCategoriaId}
          >
            {props.listaCategoria.map((cat) => (
              <MenuItem value={cat.id} key={cat.id}>
                {cat.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className="max-width">
          <FormControlLabel
            control={
              <Switch
                checked={listaConcluida}
                onClick={(item) => setListConcluida(item.target.checked)}
                name="checkedA"
              />
            }
            label="Concluida"
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (!props.update.id) {
              props.handleCreateList({
                nome: listaNome,
                categoriaId: listaCategoriaId,
                concluida: listaConcluida,
              });
            } else {
              props.handleUpdateList({
                listaId: props.update.id,
                nome: listaNome,
                categoriaId: listaCategoriaId,
                concluida: listaConcluida,
              });
            }
          }}
          color="primary"
        >
          {props.update.id ? "Editar" : "Criar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogForm;
