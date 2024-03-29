import { NextApiHandler } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  const {
    method,
    body: { name, color },
  } = req;

  switch (method) {
    // create Category
    case 'POST': {
      if (!name || !color) {
        return res
          .status(400)
          .json({ message: 'Missing required field(s)', success: false });
      }
      const newCategory = await prisma.category.create({
        data: {
          name,
          color,
        },
      });
      return res.status(201).json({ newCategory, success: true });
    }
    // get all Categories
    case 'GET': {
      try {
        const categories = await prisma.category.findMany();
        return res.status(200).json(categories);
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
