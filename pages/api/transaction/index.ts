import { NextApiHandler } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  const {
    method,
    body: { name, amount, date, currency, category: Category },
  } = req;

  switch (method) {
    case 'POST': {
      if (!name || !amount || !date || !currency || !Category) {
        return res.status(400).json({ message: 'Missing required field(s)' });
      }
      const newEntry = await prisma.transaction.create({
        data: {
          name,
          amount,
          date: new Date(date).toISOString(),
          currency,
          Category,
        },
      });
      return res.status(201).json({ data: newEntry, success: true });
    }
    case 'GET': {
      try {
        const transactions = await prisma.transaction.findMany();
        return res.status(200).json(transactions);
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
