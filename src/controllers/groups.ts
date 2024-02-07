import { RequestHandler } from "express";
import * as groups from "../services/groups";

export const getAll: RequestHandler = async (req, res) => {
  const { id_event } = req.params;

  const items = await groups.getAll(Number(id_event));

  if (items) return res.json({ groups: items });

  res.json({ error: "Ocorreu um erro" });
};

export const getGroup: RequestHandler = async (req, res) => {
  const { id, id_event } = req.params;

  const groupItem = await groups.getOne({
    id: Number(id),
    id_event: Number(id_event),
  });

  if (groupItem) return res.json({ group: groupItem });

  res.json({ error: "Ocorreu um erro" });
};
