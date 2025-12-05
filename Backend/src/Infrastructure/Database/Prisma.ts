import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({
  adapter: adapter,
  log: [
    { level: 'warn', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'error', emit: 'event' },
  ],
});

prisma.$on('warn', (e: any) => {
  console.log(e);
});

prisma.$on('info', (e: any) => {
  console.log(e);
});

prisma.$on('error', (e: any) => {
  console.log(e);
});

export default prisma;