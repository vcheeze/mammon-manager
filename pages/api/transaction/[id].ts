import { NextApiHandler } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  const {
    method,
    body: { name, amount, date, category: Category },
    query: { id },
  } = req;

  switch (method) {
    case 'PUT': {
      if (!name && !amount && !date && !Category) {
        return res
          .status(400)
          .json({ message: 'No fields to update', success: false });
      }
      const updatedTransaction = await prisma.transaction.update({
        where: { id: +id },
        data: { name, amount, date, Category },
      });
      return res.status(200).json({ data: updatedTransaction, success: true });
    }
    case 'GET': {
      try {
        const transaction = await prisma.transaction.findUnique({
          where: { id: +id },
        });
        return res.status(200).json({ data: transaction, success: true });
      } catch (e) {
        return res.status(500).json({ message: e.message });
      }
    }
    case 'DELETE': {
      const deletedTransaction = await prisma.transaction.delete({
        where: { id: +id },
      });
      return res.status(200).json({ data: deletedTransaction, success: true });
    }
    default:
      res.setHeader('Allow', ['PUT', 'GET', 'DELETE']);
      return res
        .status(405)
        .json({ method: `Method ${method} Not Allowed`, success: false });
  }
};

export default handler;
