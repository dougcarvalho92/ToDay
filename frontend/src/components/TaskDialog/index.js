import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Button } from "@material-ui/core";
// import { Container } from './styles';

function TaskDialog({ task, ...props }) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
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
            props.setTask(item.target.value);
          }}
          value={task.nome}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() =>
            props.handleCreateTask(task.id, task.usuarioId, task.categoriaId)
          }
          color="primary"
        >
          Criar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TaskDialog;
