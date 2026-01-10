import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

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
