const generateUniqueId = require("../utils/generateUniqueID");
const connection = require("../database/connection");
const bcrypt = require("bcrypt");
module.exports = {
  async index(request, response) {
    const { email, senha } = request.body;

    const user = await connection("users")
      .select("*")
      .where("email", email)
      .first();

    if (user != undefined) {
      var result = bcrypt.compareSync(senha, user.senha);
      if (result) {
        return response.json({ id: user.id });
      } else {
        return response
          .status(401)
          .json({ message: "Usuário ou senha incorretos" });
      }
    } else {
      return response.status(401).json({ message: "Usuário não existe" });
    }
  },
  async create(request, response) {
    const { nome, email, senha } = request.body;
    const user = await connection("users")
      .select("*")
      .where("email", email)
      .first();
    if (user) {
      return response.status(401).json({ message: "Usuário já existe" });
    }
    const id = generateUniqueId();
    const hash = bcrypt.hashSync(senha, 8);
    await connection("users").insert({
      id,
      nome,
      email,
      senha: hash,
    });

    return response.json({ id });
  },
};
