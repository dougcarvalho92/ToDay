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
  DialogTitle,
  Input,
} from "@material-ui/core";
import api from "../../services/api";

function DialogForm(props) {
  const userId = localStorage.getItem("userId");
  const [listaNome, setListNome] = useState("");
  const [listaConcluida, setListConcluida] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState(0);
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setCategoria(Number(event.target.value) || "");
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleGetCategories = async (categoriaId) => {
    await api
      .get("list_categories", {
        headers: {
          authorization: userId,
        },
      })
      .then((response) => {
        setCategorias(response.data);
        setCategoria("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddCategory = async () => {
    const data = { categoria };
    await api
      .post("list_categories", data, {
        headers: {
          authorization: userId,
        },
      })
      .then((response) => {
        console.log(categorias, response.data);
        setCategorias([...categorias, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setListNome(props.update.nome);
    setCategoria(props.update.categoriaId);
    setListConcluida(props.update.concluida === 0 ? false : true);
    handleGetCategories();
  }, [props]);

  return (
    <Dialog
      open={props.open}
      onClose={() => handleClose()}
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
          <Button onClick={handleClickOpen}>Selecione a categoria</Button>
          <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={open}
            onClose={() => handleClose()}
            className="dialog-categorias"
          >
            <DialogTitle className="dialog-title">Lista de Categorias <Button onClick={()=>{handleClose()}}>X</Button></DialogTitle> 
            <DialogContent>
              <FormControl>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={categoria}
                  onChange={handleChange}
                  input={<Input fullWidth />}
                  fullWidth
                >
                  {categorias.map((categoria) => (
                    <MenuItem key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <TextField
                id="standard-full-width"
                placeholder="Nome da Categoria"
                onChange={(item) => setCategoria(item.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={handleAddCategory}
                className="filter_category"
              >
                Adicionar
              </Button>
            </DialogActions>
          </Dialog>
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
                categoriaId: categoria,
                concluida: listaConcluida,
              });
            } else {
              props.handleUpdateList({
                listaId: props.update.id,
                nome: listaNome,
                categoriaId: categoria,
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
