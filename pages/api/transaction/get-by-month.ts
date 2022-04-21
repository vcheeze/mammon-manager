import { NextApiHandler } from 'next';
import { PrismaClient } from '@prisma/client';
import { lastDayOfMonth } from 'date-fns';

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  const firstDayOfMonth = new Date(req.query.firstDayOfMonth.toString());
  try {
    const results = await prisma.transaction.findMany({
      where: {
        date: {
          gte: firstDayOfMonth,
          lte: lastDayOfMonth(firstDayOfMonth),
        },
      },
    });

    return res.json(results);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export default handler;
