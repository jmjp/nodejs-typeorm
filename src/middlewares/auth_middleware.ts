import { Request, Response, NextFunction } from "express";

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  var isAuth: boolean = false;
  if (!isAuth) {
      return res.status(401).json("not auth");
  }
  next();
}

export default authMiddleware;
