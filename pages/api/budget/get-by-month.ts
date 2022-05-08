import { NextApiHandler } from 'next';
import { PrismaClient } from '@prisma/client';

import { getUTCDate } from '@/lib/utils';

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  const firstDayOfMonth = new Date(req.query.firstDayOfMonth.toString());
  firstDayOfMonth.setHours(0);

  try {
    const results = await prisma.budget.findMany({
      where: {
        startDate: getUTCDate(firstDayOfMonth),
      },
    });

    return res.json(results);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export default handler;
