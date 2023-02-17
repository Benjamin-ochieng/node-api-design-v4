import prisma from "../db";

export const getManyUpdates = async (req, res) => {
  const product = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = product.reduce((acc, { updates }) => {
    return [...acc, ...updates];
  }, []);
  res.json({ data: updates });
};

export const getOneUpdate = async (req, res) => {
  const id = req.params.id;
  const update = await prisma.update.findUnique({
    where: {
      id,
    },
  });
  res.json({ data: update });
};

export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });

  if (!product) {
    return res.json({ message: "nope" });
  }

  const newUpdate = await prisma.update.create({
    data: req.body,
  });
  res.json({ data: newUpdate });
};

export const updateUpdate = async (req, res) => {
  const product = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = product.reduce((acc, { updates }) => {
    return [...acc, ...updates];
  }, []);
  const match = updates.find(({ id }) => id === req.params.id);
  if (!match) return res.json({ message: "nope" });
  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });
  res.json({ data: updatedUpdate });
};

export const deleteUpdate = async (req, res) => {
  const product = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = product.reduce((acc, { updates }) => {
    return [...acc, ...updates];
  }, []);
  const match = updates.find(({ id }) => id === req.params.id);
  if (!match) return res.json({ message: "nope" });

  const deletedUpdate = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: deletedUpdate });
};

export const deleteUpdate2 = async (req, res) => {
  const product = await prisma.product.findFirst({
    where: {
      belongsToId: req.user.id,
      updates: { some: { id: req.params.id } },
    },
    include: {
      updates: true,
    },
  });

  if (!product) return res.json({ message: "nope" });

  const deletedUpdate = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: deletedUpdate });
};
