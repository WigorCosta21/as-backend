import { RequestHandler } from "express";
import * as events from "../services/events";
import { z } from "zod";

export const getAll: RequestHandler = async (req, res) => {
  const items = await events.getAll();

  if (items) return res.json({ events: items });

  res.json({ error: "Ocorreu um erro" });
};

export const getEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const eventItem = await events.getOne(Number(id));

  if (eventItem) return res.json({ event: eventItem });

  res.json({ error: "Ocorreu um erro" });
};

export const addEvent: RequestHandler = async (req, res) => {
  const addEventSchema = z.object({
    title: z.string(),
    description: z.string(),
    grouped: z.boolean(),
  });

  const body = addEventSchema.safeParse(req.body);

  if (!body.success) return res.json({ error: "Dados inválidos" });

  const newEvent = await events.add(body.data);

  if (newEvent) return res.status(200).json({ event: newEvent });

  res.json({ error: "Ocorreu um erro" });
};

export const updateEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const updateEventSchema = z.object({
    status: z.boolean().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    grouped: z.boolean().optional(),
  });

  const body = updateEventSchema.safeParse(req.body);

  if (!body.success) return res.json({ error: "Dados inválido" });

  const updateEvent = await events.update(Number(id), body.data);

  if (updateEvent) {
    if (updateEvent.status) {
    } else {
    }

    return res.json({ event: updateEvent });
  }

  res.json({ error: "Ocorreu um erro" });
};

export const deleteEvent: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const deleteEvent = await events.remove(Number(id));

  if (deleteEvent) return res.json({ event: deleteEvent });

  res.json({ error: "Ocorreu um erro" });
};
