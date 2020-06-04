import express from "express";

import PointsController from "./controllers/PointsController";
import ItensController from "./controllers/ItensController";

//index, show, create, update, delete

const routes = express.Router();
const poinstController = new PointsController();
const itensController = new ItensController();

routes.get("/itens", itensController.index);

routes.post("/points", poinstController.create);
routes.get("/points", poinstController.index);
routes.get("/points/:id", poinstController.show);

export default routes;
