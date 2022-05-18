import { NextApiHandler } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  const year = req.query.year.toString();

  try {
    const results = await prisma.transaction.findMany({
      where: {
        date: {
          gte: new Date(`${year}-01-01`),
          lte: new Date(`${year}-12-31`),
        },
      },
    });

    return res.json(results);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export default handler;
