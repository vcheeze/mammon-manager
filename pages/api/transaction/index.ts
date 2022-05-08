import { NextApiHandler } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  const {
    method,
    body: { name, amount, date, type, currency, category },
  } = req;

  switch (method) {
    // create Transaction
    case 'POST': {
      if (!name || !amount || !date || !currency || !category) {
        return res.status(400).json({ message: 'Missing required field(s)' });
      }
      const newEntry = await prisma.transaction.create({
        data: {
          name,
          amount,
          date: new Date(date).toISOString(),
          type,
          currency,
          category,
        },
      });
      return res.status(201).json({ data: newEntry, success: true });
    }
    // get all Transaction
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
