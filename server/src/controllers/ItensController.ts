import { Request, Response } from "express";
import knex from "../database/connection";

class ItensController {

    async index (req: Request, res: Response) {
        const itens = await knex('itens').select('*');
        const serializedItens = itens.map((i) => {
          return {
            id: i.id,
            title: i.title,
            image_url: `http://localhost:3333/uploads/${i.image}`,
          };
        });
        return res.json(serializedItens);
      }

}

export default ItensController;