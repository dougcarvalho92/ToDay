const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const lista_categorias = await connection("list_categories").select("*");
    return response.json(lista_categorias);
  },
  async create(request, response) {
    const { categoria } = request.body;
    const [id] = await connection("list_categories").insert({
      nome: categoria,
    });
    return response.json({ id, nome: categoria });
  },
  async update(request, response) {
    const { categoria, categoriaid } = request.body;
    await connection("list_categories")
      .update({
        nome: categoria,
      })
      .where("id", categoriaid);
    return response.json({ id: categoriaid, nome: categoria });
  },
};
