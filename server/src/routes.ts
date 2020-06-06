import express from "express";
import multer from "multer";
import multerConfig from "../config/multer";
import { celebrate, Joi } from "celebrate";

import PointsController from "./controllers/PointsController";
import ItensController from "./controllers/ItensController";

//index, show, create, update, delete

const routes = express.Router();
const upload = multer(multerConfig);

const poinstController = new PointsController();
const itensController = new ItensController();

routes.get("/itens", itensController.index);

routes.get("/points", poinstController.index);
routes.get("/points/:id", poinstController.show);

routes.post(
  "/points",
  upload.single("image"),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      itens: Joi.string().required(),
    }),
  }, {
      abortEarly: false
  }),
  poinstController.create
);

export default routes;
