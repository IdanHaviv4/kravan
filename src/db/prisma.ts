import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export const addCoins = async (id: string, amount: number) => {
  await prisma.user.upsert({
    update: {
      coins: {
        increment: amount,
      },
    },
    create: {
      id,
      coins: amount,
    },
    where: {
      id,
    },
  });
};

export const takeCoins = async (id: string, amount: number) => {
  await prisma.user.update({
    data: {
      coins: {
        decrement: amount,
      },
    },
    where: {
      id,
    },
  });
};

export const getUserCoins = async (id: string) => {
  return (
    (
      await prisma.user.findUnique({
        select: {
          coins: true,
        },
        where: {
          id,
        },
      })
    )?.coins ?? 0
  );
};

export const getTop5Richest = async () => {
  return await prisma.user.findMany({
    take: 5,
    where: {
      coins: {
        gt: 0,
      },
    },
    orderBy: {
      coins: "desc",
    },
  });
};

export { prisma };
