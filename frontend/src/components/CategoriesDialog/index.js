import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import api from "../../services/api";
import { MdFilterList } from "react-icons/md";
import {
  Dialog,
  DialogTitle,
  ListItemText,
  ListItem,
  List,
  Input,
  TextField,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import { Container } from "./styles";
export default function CategoriesDialog(props) {
  const [categorias, setCategorias] = useState([]);
  const [open, setOpen] = useState(false);
  const [categoria, setCategoria] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    handleGetCategories();
  }, []);

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
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
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

  return (
    <div>
      <Container>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
          className="filter_category"
        >
          <MdFilterList size={24} color="7159C1" />
        </Button>
        <Dialog
          onClose={handleClose}
          aria-labelledby="simple-dialog-title"
          open={open}
        >
          <DialogTitle id="simple-dialog-title">Categorias</DialogTitle>
          <DialogContent>
            <List>
              {categorias.map((categoria) => (
                <ListItem key={categoria.id}>
                  
                  <ListItemText primary={categoria.nome} />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <ListItem autoFocus style={{ display: "grid" }}>
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
                Adicionar Nova
              </Button>
            </ListItem>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}
