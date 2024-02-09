import { RequestHandler } from "express";
import * as people from "../services/people";
import { string, z } from "zod";

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

export const updatePerson: RequestHandler = async (req, res) => {
  const { id_event, id_group, id } = req.params;

  const updatePersonSchema = z.object({
    name: string().optional(),
    cpf: z
      .string()
      .transform((val) => val.replace(/\.|-/gm, ""))
      .optional(),
    matched: z.string().optional(),
  });

  const body = updatePersonSchema.safeParse(req.body);
  if (!body.success) return res.json({ error: "Dados inválidos" });

  const updatePerson = await people.update(
    {
      id: Number(id),
      id_event: Number(id_event),
      id_group: Number(id_group),
    },
    body.data
  );

  if (updatePerson) {
    const personItem = await people.getOne({
      id: Number(id),
      id_event: Number(id_event),
    });

    return res.json({ person: personItem });
  }

  res.json({ erros: "Ocorreu um erro" });
};

export const deletePerson: RequestHandler = async (req, res) => {
  const { id_event, id_group, id } = req.params;

  const deletedPerson = await people.remove({
    id: Number(id),
    id_event: Number(id_event),
    id_group: Number(id_group),
  });

  if (deletedPerson) return res.json({ person: deletedPerson });

  res.json({ erros: "Ocorreu um erro" });
};
