const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const usuarioId = request.headers.authorization;
    const lista = await connection("tasks")
      .where("usuarioId", usuarioId)
      .select("*");
    return response.json(lista);
  },
  async create(request, response) {
    const { nome, concluida, listaId } = request.body;
    const usuarioId = request.headers.authorization;
    const listID = await connection("list")
      .select("id")
      .where("id", listaId)
      .first();
    if (!listID || listID.id != listaId) {
      return response.status(401).json({
        error: `Lista não existe`,
      });
    }

    const [id] = await connection("tasks").insert({
      nome,
      usuarioId,
      concluida,
      listaId,
    });

    return response.json({ id });
  },
  async update(request, response) {
    const { nome, concluida, taskId } = request.body;
    const usuarioId = request.headers.authorization;
;
    await connection("tasks")
      .update({
        nome,
        concluida,
      })
      .where("id", taskId);

    return response.json({ taskId });
  },
  async delete(request, response) {
    const { id } = request.params;
 
    await connection("tasks").where("id", id).delete();

    return response.status(204).send();
  },
};
