import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authorize = (req, res, next) => {
   const header = req?.headers.authorization;
   if (!header) {
      res.status(400).json({ error: "token not provided" });
   }
   const token = header.split(" ")[1];
   jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
      if (err) return res.sendStatus(403);
      req.body = data;
      next();
   });
};
