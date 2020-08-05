import React, { useState } from "react";

import { Container, Category, TaskList } from "./styles";

import Card from "./../Card";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  FormControlLabel,
  TextareaAutosize,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import api from "../../services/api";
import { MdMoreVert } from "react-icons/md";

const userId = localStorage.getItem("userId");

function List({ data, ...props }) {
  const [open, setOpen] = useState(false);
  const [editopen, setEditOpen] = useState(false);
  const [taskNome, setTaskNome] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [taskId, setTaskId] = useState(0);
  const [taskChecked, setTaskChecked] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleEditOpen = (id, nome, concluida) => {
    setTaskNome(nome);
    setTaskChecked(concluida);
    setTaskId(id);
    setEditOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setAnchorEl(null);
    setEditOpen(false);
  };
  const handleCreateTask = async (list_id, user_id, categoriaId) => {
    var data = { listaId: list_id, nome: taskNome, concluida: false };

    await api
      .post("task", data, {
        headers: {
          authorization: user_id,
        },
      })
      .then((response) => {
        props.handleGetList(categoriaId);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleUpdateTask = async (id, nome, checked) => {
    var data = {
      taskId: id,
      nome,
      concluida: checked,
    };
    await api
      .put("task", data, {
        headers: {
          authorization: userId,
        },
      })
      .then((response) => {
        props.handleGetList();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(false);
  };
  const handleRemoveTask = async (id) => {
    if (window.confirm("Tem certeza que deseja remover este item?")) {
      await api
        .delete(`task/${id}`, {
          headers: {
            authorization: userId,
          },
        })
        .then((response) => {
          props.handleGetList();
          handleClose();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };
  const renderItems = (tasks, opt) => {
    switch (opt) {
      case "a_fazer": {
        return tasks
          .filter((t) => t.concluida === 0)
          .map((card) =>
            Object.keys(card).length > 0 ? (
              <Card
                key={card.id}
                data={card}
                handleUpdateTask={handleUpdateTask}
                handleEditOpen={handleEditOpen}
                handleRemoveTask={handleRemoveTask}
              />
            ) : (
              ""
            )
          );
      }
      case "feitos": {
        return tasks
          .filter((t) => t.concluida === 1)
          .map((card) =>
            Object.keys(card).length > 0 ? (
              <Card
                key={card.id}
                data={card}
                handleUpdateTask={handleUpdateTask}
                handleEditOpen={handleEditOpen}
                handleRemoveTask={handleRemoveTask}
              />
            ) : (
              ""
            )
          );
      }
      default:
        return tasks.map((card) =>
          Object.keys(card).length > 0 ? (
            <Card
              key={card.id}
              data={card}
              handleEditOpen={handleEditOpen}
              handleRemoveTask={handleRemoveTask}
            />
          ) : (
            ""
          )
        );
    }
  };
  const checkList = (concluida, listaId, nome, categoriaId) => {
    var data = { concluida, listaId, nome, categoriaId };
    api
      .put("list", data, {
        headers: {
          authorization: userId,
        },
      })
      .then(({ data }) => {
        console.log("aqui");
      });
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Container>
      <header>
        <Category done={data.concluida}>
          <small>{data.lc_nome}</small>
        </Category>
        <h3>{data.nome}</h3>

        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MdMoreVert />
        </IconButton>

        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClickOpen}>Adicionar tarefa</MenuItem>
          <MenuItem onClick={() => props.handleSetUpdateDataList(data)}>
            Editar Lista
          </MenuItem>
          <MenuItem onClick={() => props.handleRemoveList(data.id)}>
            Remover Lista
          </MenuItem>
        </Menu>
      </header>
      <TaskList>{renderItems(data.tasks, "a_fazer")}</TaskList>
      <TaskList>{renderItems(data.tasks, "feitos")}</TaskList>
      <Dialog
        open={editopen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="tarefa"
            label="Tarefa"
            type="text"
            fullWidth
            onChange={(item) => {
              setTaskNome(item.target.value);
            }}
            value={taskNome}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleUpdateTask(taskId, taskNome, taskChecked)}
            color="primary"
          >
            Editar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="tarefa"
            label="Tarefa"
            type="text"
            fullWidth
            onChange={(item) => {
              setTaskNome(item.target.value);
            }}
            value={taskNome}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() =>
              handleCreateTask(data.id, data.usuarioId, data.categoriaId)
            }
            color="primary"
          >
            Criar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default List;
