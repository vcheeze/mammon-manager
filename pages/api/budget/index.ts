import { NextApiHandler } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  const {
    method,
    body: { amount, startDate, endDate, category: Category, name },
  } = req;

  switch (method) {
    case 'POST': {
      if (!amount || !startDate || !endDate || !Category) {
        return res
          .status(400)
          .json({ message: 'Missing required field(s)', success: false });
      }
      const newBudget = await prisma.budget.create({
        data: {
          amount,
          startDate,
          endDate,
          Category,
          name,
        },
      });
      return res.status(201).json({ newBudget, success: true });
    }
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
