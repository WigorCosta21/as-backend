import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

type GetAllFilter = { id_event: number; id_group?: number };
export const getAll = async (filters: GetAllFilter) => {
  try {
    return await prisma.eventPeople.findMany({ where: filters });
  } catch (err) {
    return false;
  }
};
