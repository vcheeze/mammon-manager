import { NextApiHandler } from 'next';
import { addMinutes } from 'date-fns';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  const firstDayOfMonth = new Date(req.query.firstDayOfMonth.toString());

  try {
    const results = await prisma.budget.findMany({
      where: {
        startDate: addMinutes(
          firstDayOfMonth,
          firstDayOfMonth.getTimezoneOffset()
        ),
      },
    });

    return res.json(results);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export default handler;
