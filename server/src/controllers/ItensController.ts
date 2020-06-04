import { Request, Response } from "express";
import knex from "../database/connection";

class ItensController {

    async index (req: Request, res: Response) {
        const itens = await knex('itens').select('*');
        const serializedItens = itens.map((i) => {
          return {
            id: i.id,
            title: i.title,
            //exp://a9-y3a.anonymous.mobile.exp.direct:80
            //exp://a9-y3a.anonymous.mobile.exp.direct:80
            image_url: `http://192.168.15.159:3333/uploads/${i.image}`,
          };
        });
        return res.json(serializedItens);
      }

}

export default ItensController;