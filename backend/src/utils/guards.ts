import jwt from "./jwt";
import jwtSimple from "jwt-simple";
import express from "express";

import { Bearer } from "permit";
import { userService } from "../routes";
import { UserInfo } from "./models";

const permit = new Bearer({
  query: "access_token",
});

export async function isLoggedInAPI(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const token = permit.check(req);
    // console.log(token, "here is token, gurads.ts L20");
    // console.log(token, "here is token");
    if (!token) {
      // console.log("byebye");
      return res.status(401).json({ msg: "Permission Denied" });
    }

    const payload: { id: number; username: string; role: string } = jwtSimple.decode(
      token,
      jwt.jwtSecret
    );
    // Querying Database is not compulsory
    const user: UserInfo = await userService.verifyUser(payload.id, payload.role);
    if (user) {
      req.user = { ...user, role: payload.role };
      console.log(req.user, "guards.ts L31");
      return next();
    } else {
      return res.status(401).json({ msg: "Permission Denied" });
    }
  } catch (e) {
    return res.status(401).json({ msg: "Permission Denied" });
  }
}
