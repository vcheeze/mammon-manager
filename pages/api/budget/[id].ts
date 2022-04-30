import { NextApiHandler } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  const {
    method,
    body: { amount, startDate, endDate, category, name },
    query: { id },
  } = req;

  switch (method) {
    case 'PUT': {
      if (!amount && !startDate && !endDate && !category && !name) {
        return res
          .status(400)
          .json({ message: 'No fields to update', success: false });
      }
      const updatedBudget = await prisma.budget.update({
        where: { id: +id },
        data: { amount, startDate, endDate, category, name },
      });
      return res.status(200).json({ data: updatedBudget, success: true });
    }
    case 'GET': {
      try {
        const budget = await prisma.budget.findUnique({
          where: { id: +id },
        });
        return res.status(200).json({ data: budget, success: true });
      } catch (e) {
        return res.status(500).json({ message: e.message });
      }
    }
    case 'DELETE': {
      const deletedBudget = await prisma.budget.delete({
        where: { id: +id },
      });
      return res.status(200).json({ data: deletedBudget, success: true });
    }
    default:
      res.setHeader('Allow', ['PUT', 'GET', 'DELETE']);
      return res
        .status(405)
        .json({ message: `Method ${method} Not Allowed`, success: false });
  }
};

export default handler;
