import { Request, Response } from "express";
import knex from "../database/connection";

class PointsController {
  async index(req: Request, res: Response) {
    //cidade, uf, itens
    const { city, uf, itens } = req.query;

    const parsedItens = String(itens)
      .split(",")
      .map((i) => Number(i.trim()));

    const points = await knex("points")
      .join("point_itens", "point_id", "=", "point_itens.point_id")
      .whereIn("point_itens.item_id", parsedItens)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");

    const serializedPoints = points.map((point) => {
      return {
        ...point,
        image_url: `http://192.168.15.159:3333/uploads/${point.image}`,
      };
    });

    return res.json(serializedPoints);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex("points").where("id", id).first();

    if (!point) {
      return res.status(400).json({ msg: "Ponto não encontrado." });
    }

    const serializedPoint = {
      ...point,
      image_url: `http://192.168.15.159:3333/uploads/${point.image}`,
    };

    const itens = await knex("itens")
      .join("point_itens", "itens.id", "=", "point_itens.item_id")
      .where("point_itens.point_id", id)
      .select("title");

    return res.json({ point: serializedPoint, itens });
  }

  async create(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      itens,
    } = req.body;

    const trx = await knex.transaction();

    const point = {
      image: req.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };
    const insertedIds = await trx("points").insert(point);

    const point_id = insertedIds[0];
    const pointItens = itens
      .split(",")
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => {
        return {
          item_id,
          point_id,
        };
      });

    await trx("point_itens").insert(pointItens);

    await trx.commit();

    return res.json({
      id: point_id,
      ...point,
    });
  }
}

export default PointsController;
