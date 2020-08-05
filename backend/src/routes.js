const express = require("express");

const { celebrate, Segments, Joi } = require("celebrate");

const UsersController = require("./controllers/UsersController");
const ListController = require("./controllers/ListController");
const TaskController = require("./controllers/TaskController");
const CategoryController = require("./controllers/CategoryController");

const routes = express.Router();
/*user*/
routes.post(
  "/login",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      senha: Joi.string().required(),
    }),
  }),
  UsersController.index
);
routes.post(
  "/register",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().required(),
      email: Joi.string().required().email(),
      senha: Joi.string().required(),
    }),
  }),
  UsersController.create
);

/*list_categories*/
routes.get("/list_categories", CategoryController.index);
routes.post(
  "/list_categories",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      categoria: Joi.string().required(),
    }),
  }),
  CategoryController.create
);

routes.put(
  "/list_categories",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      categoriaid: Joi.number().required(),
      categoria: Joi.string().required(),
    }),
  }),
  CategoryController.update
);

/*list*/
routes.get(
  "/list",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  ListController.index
);

routes.post(
  "/list",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().required(),
      categoriaId: Joi.number().required(),
      concluida: Joi.boolean().required(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  ListController.create
);

routes.put(
  "/list",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().required(),
      categoriaId: Joi.number().required(),
      concluida: Joi.boolean().required(),
      listaId: Joi.number().required(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  ListController.update
);

routes.delete(
  "/list/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  ListController.delete
);

/*task*/
routes.get("/task", TaskController.index);
routes.post(
  "/task",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      nome: Joi.string().required(),
      listaId: Joi.number().required(),
      concluida: Joi.boolean().required(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  TaskController.create
);
routes.put(
  "/task",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      taskId: Joi.number().required(),
      nome: Joi.string().required(),
      concluida: Joi.boolean().required(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  TaskController.update
);
routes.delete(
  "/task/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  TaskController.delete
);
module.exports = routes;
