const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const usuarioId = request.headers.authorization;

    const checkUserList = await connection("list")
      .where("usuarioId", usuarioId)
      .select("usuarioId")
      .first();

    if (checkUserList == undefined) {
      return response.status(404).json({ message: "Nenhuma Lista encontrada" });
    }

    lista = await connection("list")
      .select([
        "list.*",
        "lc.nome as lc_nome",
        "tk.nome as tk_nome",
        "tk.id as tk_id",
        "tk.concluida as tk_concluida",
      ])
      .from("list")
      .where("list.usuarioId", usuarioId)
      .leftJoin("tasks as tk", "tk.listaId", "list.id")
      .leftJoin("list_categories as lc", "lc.id", "list.categoriaId");

    var seen = {};
    data = lista.filter(function (entry) {
      var previous,
        infos = {};
      if (entry.tk_id) {
        infos = {
          nome: entry.tk_nome,
          id: entry.tk_id,
          concluida: entry.tk_concluida,
        };
      }

      if (seen.hasOwnProperty(entry.id)) {
        previous = seen[entry.id];
        previous.tasks.push(infos);
        return false;
      }
      if (!Array.isArray(infos)) {
        entry.tasks = [infos];
      }
      delete entry.tk_nome,
        delete entry.tk_id,
        delete entry.tk_concluida,
        (seen[entry.id] = entry);

      return true;
    });

    return response.json(data);
  },
  async create(request, response) {
    const { nome, categoriaId, concluida } = request.body;
    const usuarioId = request.headers.authorization;
    const catID = await connection("list_categories")
      .select("id")
      .where("id", categoriaId)
      .first();

    if (!catID || catID.id != categoriaId) {
      return response.status(401).json({
        error: `Categoria não existe`,
      });
    }

    const [id] = await connection("list").insert({
      nome,
      usuarioId,
      categoriaId,
      concluida
      
    });

    return response.json({ id });
  },
  async update(request, response) {
    const { nome, categoriaId, listaId, concluida } = request.body;
    const usuarioId = request.headers.authorization;

    await connection("list")
      .update({
        nome,
        usuarioId,
        concluida,
        categoriaId,
      })
      .where("id", listaId)
      .andWhere("usuarioId", usuarioId);

    return response.json({ nome, usuarioId, concluida, categoriaId });
  },
  async delete(request, response) {
    const { id } = request.params;
    const usuarioId = request.headers.authorization;

    const list = await connection("list")
      .where("id", id).andWhere("usuarioId", usuarioId)
      .select("usuarioId")
      .first();

    if (list.usuarioId != usuarioId) {
      return response.status(401).json({
        error: "Operation not permitted",
      });
    }
    await connection("list").where("id", id).andWhere("usuarioId", usuarioId).delete();

    return response.status(204).send();
  },
};
