import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'],
});

async function start() {
  const fastify = Fastify({
    logger: true,
  });
  
  await fastify.register(cors, {
    origin: true,
  });

  fastify.get('/bets/count', async () => {
    const totalBets = await prisma.bets.count();
    return {totalBets};
  });

  await fastify.listen({port: 3333, host: '0.0.0.0'});
}

start();