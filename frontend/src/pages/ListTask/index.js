import React, { useState, useEffect } from "react";
import { loadLists } from "../../services/api";

import { Container, HeaderFilter } from "./styles";
import api from "../../services/api";
import List from "./../../components/List";
import CategoriesDialog from "./../../components/CategoriesDialog";
import { Fab } from "@material-ui/core";
import { MdAdd } from "react-icons/md";
import DialogForm from "../../components/DialogForm";
import { TextField } from "@material-ui/core";
import useDebounce from "./../../hooks/useDeBounce";

function ListTask(props) {
  const [allList, setAllList] = useState([]);
  const userId = localStorage.getItem("userId");
  const [open, setOpen] = useState(false);
  const [listaCategoria, setListaCategoria] = useState([]);
  const [listUpdate, setListUpdate] = useState({});
  const [textFilter, setTextFilter] = useState();
  const filtro = useDebounce(textFilter, 1000);

  useEffect(() => {
    api
      .get("list", {
        headers: {
          authorization: userId,
        },
      })
      .then(({ data }) => {
        if (filtro) {
          let filters = data.filter((ft) => {
            let catNome = ft.lc_nome.toLowerCase().search(filtro.toLowerCase());
            let nome = ft.nome.toLowerCase().indexOf(filtro.toLowerCase());
            if (nome != -1 || catNome != -1) {
              return ft;
            }

            return;
          });

          setAllList(filters);
          return;
        } else {
          setAllList(data);
        }
      });
  }, [filtro]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveList = async (listaid) => {
    if (window.confirm("Tem certeza que deseja remover este item?")) {
      await api
        .delete(`list/${listaid}`, {
          headers: {
            authorization: userId,
          },
        })
        .then((response) => {
          handleGetList();
          handleClose();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const handleGetList = async (categoriaId) => {
    await api
      .get("list", {
        headers: {
          authorization: userId,
        },
      })
      .then(({ data }) => {
        if (categoriaId) {
          let filters = data.filter((ft) => {
            return ft.categoriaId === categoriaId;
          });
          setAllList(filters);
        } else {
          setAllList(data);
        }
      });
  };

  const handleGetCategories = async () => {
    await api
      .get("list_categories", {
        headers: {
          authorization: userId,
        },
      })
      .then(({ data }) => {
        setListaCategoria(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleCreateList = async (data) => {
    await api
      .post("list", data, {
        headers: {
          authorization: userId,
        },
      })
      .then((response) => {
        handleGetList();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleUpdateList = async (data) => {
    // var data = { data };

    await api
      .put("list", data, {
        headers: {
          authorization: userId,
        },
      })
      .then((response) => {
        handleGetList();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSetUpdateDataList = (data) => {
    setListUpdate(data);
    handleClickOpen();
  };
  useEffect(() => {
    handleGetCategories();
  }, []);
  useEffect(() => {
    handleGetList();
  }, []);
  return (
    <>
      <HeaderFilter>
        <TextField
          id="standard-basic"
          label="Pesquisa por Nome Ou Categoria"
          fullWidth
          value={textFilter}
          style={{
            maxWidth: 500,
            margin: "auto",
            display: "flex",
            marginTop: 20,
          }}
          onChange={(item) => setTextFilter(item.target.value)}
        />
        

      </HeaderFilter>
      <Container>
        {allList.map((list) =>
          list.concluida === 0 ? (
            <List
              key={list.id}
              data={list}
              handleGetList={handleGetList}
              handleRemoveList={handleRemoveList}
              handleSetUpdateDataList={handleSetUpdateDataList}
            />
          ) : (
            ""
          )
        )}
      </Container>

      <Container>
        {allList.map((list) =>
          list.concluida == 1 ? (
            <List
              key={list.id}
              data={list}
              handleGetList={handleGetList}
              handleRemoveList={handleRemoveList}
              handleSetUpdateDataList={handleSetUpdateDataList}
            />
          ) : (
            ""
          )
        )}
      </Container>
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: "fixed", bottom: 10, right: 10 }}
        onClick={handleClickOpen}
      >
        <MdAdd />
      </Fab>
      <DialogForm
        listaCategoria={listaCategoria}
        handleClose={handleClose}
        handleUpdateList={handleUpdateList}
        handleCreateList={handleCreateList}
        open={open}
        update={listUpdate}
      />
    </>
  );
}

export default ListTask;
