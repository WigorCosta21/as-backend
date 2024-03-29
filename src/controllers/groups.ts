import { RequestHandler } from "express";
import * as groups from "../services/groups";
import { z } from "zod";

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

export const addGroup: RequestHandler = async (req, res) => {
  const { id_event } = req.params;

  const addGroupSchema = z.object({
    name: z.string(),
  });

  const body = addGroupSchema.safeParse(req.body);

  if (!body.success) return res.json({ error: "Dados inválidos" });

  const newGroup = await groups.add({
    name: body.data.name,
    id_event: Number(id_event),
  });

  if (newGroup) return res.status(201).json({ group: newGroup });

  res.json({ erros: "Ocorreu um erro" });
};

export const updateGroup: RequestHandler = async (req, res) => {
  const { id, id_event } = req.params;

  const updateGroupSchema = z.object({
    name: z.string().optional(),
  });

  const body = updateGroupSchema.safeParse(req.body);

  if (!body.success) return res.json({ error: "Dados inválidos" });

  const updateGroup = await groups.update(
    { id: Number(id), id_event: Number(id_event) },
    body.data
  );

  if (updateGroup) return res.json({ group: updateGroup });

  res.json({ error: "Ocorreu um erro" });
};

export const deleteGroup: RequestHandler = async (req, res) => {
  const { id, id_event } = req.params;

  const deleteGroup = await groups.remove({
    id: Number(id),
    id_event: Number(id_event),
  });

  if (deleteGroup) return res.json({ group: deleteGroup });

  res.json({ error: "Ocorreu um erro" });
};
