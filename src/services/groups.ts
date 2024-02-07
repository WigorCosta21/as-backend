import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const getAll = async (id_event: number) => {
  try {
    return await prisma.eventGroup.findMany({ where: { id_event } });
  } catch (err) {
    return false;
  }
};

type GetOneFilters = { id: number; id_event: number };
export const getOne = async (filter: GetOneFilters) => {
  try {
    return await prisma.eventGroup.findFirst({ where: filter });
  } catch (err) {
    return false;
  }
};
