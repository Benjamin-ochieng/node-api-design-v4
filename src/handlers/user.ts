import prisma from "../db";

import { createJWT, hashPassword, comparePassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {
  try {
    const hash = await hashPassword(req.body.password);
    const newUser = await prisma.user.create({
      data: {
        userName: req.body.userName,
        password: hash,
      },
    });
    const token = createJWT(newUser);
    res.json({ token });
  } catch(err) {   
    err.type = "input";
    next(err);
  }
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      userName: req.body.userName,
    },
  });

  let invalid = { message: "Incorrect email password combination" };

  const isValidUser = await comparePassword(req.body.password, user.password);
  if (!isValidUser) {
    res.status(401).send(invalid);
  } else {
    const token = createJWT(user);
    res.json({ token });
  }
};
