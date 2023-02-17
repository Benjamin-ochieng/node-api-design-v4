import prisma from "../db";
import { Prisma } from "@prisma/client";

export const getManyProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });
  res.json({ data: user.products });
};

export const getOneProduct = async (req, res) => {
  const id = req.params.id;
  const product = await prisma.product.findFirst({
    where: {
      id,
      belongsToId: req.user.id,
    },
  });
  res.json({ data: product });
};

export const createProduct = async (req, res) => {
  try {
      const newProduct = await prisma.product.create({
        data: {
          name: req.body.name,
          belongsToId: req.user.id,
        },
      });

      res.json({ data: newProduct });

  } catch (err) {
    console.log(err.code);
    
  }
};

export const updateProduct = async (req, res) => {
  const updatedProduct = await prisma.product.update({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
    data: {
      name: req.body.name,
    },
  });

  res.json({ data: updateProduct });
};

export const deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id,
        },
      },
    });

    res.json({ data: deletedProduct });
  } catch (err) {
    err.type = "input";
    next(err);
  }
};
