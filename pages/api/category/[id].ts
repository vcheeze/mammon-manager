import { NextApiHandler } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler: NextApiHandler = async (req, res) => {
  const {
    method,
    body: { name, color },
    query: { id },
  } = req;

  switch (method) {
    case 'PUT': {
      if (!name && !color) {
        return res
          .status(400)
          .json({ message: 'No fields to update', success: false });
      }
      const updatedCategory = await prisma.category.update({
        where: { id: +id },
        data: { name, color },
      });
      return res.status(200).json({ data: updatedCategory, success: true });
    }
    case 'GET': {
      try {
        const category = await prisma.category.findUnique({
          where: { id: +id },
        });
        return res.status(200).json({ data: category, success: true });
      } catch (e) {
        return res.status(500).json({ message: e.message });
      }
    }
    case 'DELETE': {
      const deletedCategory = await prisma.category.delete({
        where: { id: +id },
      });
      return res.status(200).json({ data: deletedCategory, success: true });
    }
    default:
      res.setHeader('Allow', ['PUT', 'GET', 'DELETE']);
      return res
        .status(405)
        .json({ message: `Method ${method} Not Allowed`, success: false });
  }
};

export default handler;
