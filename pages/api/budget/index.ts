import { NextApiHandler } from 'next';
import { PrismaClient } from '@prisma/client';

import { getUTCDate } from '@/lib/utils';

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  const {
    method,
    body: { amount, startDate, endDate, currency, category, name },
  } = req;

  switch (method) {
    // create Budget
    case 'POST': {
      if (!amount || !startDate || !endDate || !currency || !category) {
        return res
          .status(400)
          .json({ message: 'Missing required field(s)', success: false });
      }
      // A Budget is created using UTC Dates to ensure it is
      // consistent across different timezones.
      const newBudget = await prisma.budget.create({
        data: {
          amount,
          startDate: getUTCDate(new Date(startDate)),
          endDate: getUTCDate(new Date(endDate)),
          currency,
          category,
          name,
        },
      });
      return res.status(201).json({ newBudget, success: true });
    }
    // get all Budgets
    case 'GET': {
      try {
        const budgets = await prisma.budget.findMany();
        return res.status(200).json(budgets);
      } catch (e) {
        return res.status(500).json({ message: e.message, success: false });
      }
    }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res
        .status(405)
        .json({ message: `Method ${method} Not Allowed`, success: false });
  }
};

export default handler;
