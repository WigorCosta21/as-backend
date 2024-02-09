import { RequestHandler } from "express";
import * as people from "../services/people";
import { z } from "zod";

export const getAll: RequestHandler = async (req, res) => {
  const { id_event, id_group } = req.params;

  const items = await people.getAll({
    id_event: Number(id_event),
    id_group: Number(id_group),
  });

  if (items) return res.json({ people: items });

  res.json({ erros: "Ocorreu um erro" });
};

export const getPerson: RequestHandler = async (req, res) => {
  const { id_event, id_group, id } = req.params;

  const personItem = await people.getOne({
    id: Number(id),
    id_event: Number(id_event),
    id_group: Number(id_group),
  });

  if (personItem) return res.json({ person: personItem });

  res.json({ erros: "Ocorreu um erro" });
};

export const addPerson: RequestHandler = async (req, res) => {
  const { id_event, id_group } = req.params;

  const addPersonSchema = z.object({
    name: z.string(),
    cpf: z.string().transform((val) => val.replace(/\.|-/gm, "")),
  });
  const body = addPersonSchema.safeParse(req.body);

  if (!body.success) return res.json({ error: "Dados inválidos" });

  const newPerson = await people.add({
    name: body.data.name,
    cpf: body.data.cpf,
    id_event: Number(id_event),
    id_group: Number(id_group),
  });

  if (newPerson) return res.status(201).json({ person: newPerson });

  res.json({ erros: "Ocorreu um erro" });
};
