import { UserService } from "../services/UserService";
import { Request, Response } from "express";
import formidable from "formidable";
import { User } from "../utils/models";
import jwt from "../utils/jwt";
import fetch from "cross-fetch";
import jwtSimple from "jwt-simple";
import { checkPassword, hashPassword } from "../utils/hash";

export class UserController {
  constructor(private userService: UserService) {}

  register = async (req: Request, res: Response) => {
    // const formFields: User = req.form.fields as any;
    const form: User = req.body;
    const {
      username,
      email,
      password: plainPassword,
      // mobile,
      // birthday,
      // gender,
      // is_experienced,
      // } = formFields;
    } = form;

    const password = await hashPassword(plainPassword as string);

    // const photo = (req.form.files["image"] as formidable.File)?.newFilename || undefined;
    const user: User = {
      username,
      email,
      password,
      // mobile,
      // birthday,
      // gender,
      // is_experienced,
      // photo,
    };
    try {
      const result = await this.userService.register(user);
      console.log(result);
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ message: "帳戶名稱或電郵地址已被採用" });
    }
  };

  loginWithUsernameOrEmail = async (req: Request, res: Response) => {
    const { userIdentity, password } = req.body as { userIdentity: string; password: string };
    if (userIdentity.includes("@")) {
      try {
        const user = await this.userService.loginWithEmail(userIdentity);

        if (await checkPassword(password, user.password)) {
          const payload = {
            id: user.id,
            username: user.username,
          };
          const token = jwtSimple.encode(payload, jwt.jwtSecret);
          // req.session.user = { id: user.id, username: user.username };
          res.status(200).json({ token });
        } else {
          res.status(401).json({ message: "Unauthorised" });
        }
      } catch (e) {
        res.status(400).json({ message: "User not found" });
      }
    } else {
      try {
        const user = await this.userService.loginWithUsername(userIdentity);

        if (await checkPassword(password, user.password)) {
          const payload = {
            id: user.id,
            username: user.username,
          };
          const token = jwtSimple.encode(payload, jwt.jwtSecret);
          // req.session.user = { id: user.id, username: user.username };
          res.status(200).json({ token });
        } else {
          res.status(401).json({ message: "Unauthorised" });
        }
      } catch (e) {
        res.status(400).json({ message: "User not found" });
      }
    }
  };

  loginWithGoogle = async (req: Request, res: Response) => {
    const accessToken = req.session?.["grant"].response.access_token;
    const fetchRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      method: "get",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const data = await fetchRes.json();
    try {
      const user = await this.userService.loginWithEmail(data.email);
      if (!user) {
        res.status(400).json({ email: data.email, message: "User not found" });
        return;
      }
      const payload = {
        id: user.id,
        username: user.username,
      };
      const token = jwtSimple.encode(payload, jwt.jwtSecret);
      res
        // .json({
        //   token: token,
        // })
        .redirect(`${process.env.FRONTEND_URL}/google-callback?token=${token}`);
    } catch (e) {
      res.status(400).json({ email: data.email, message: "User not found" });
    }
  };

  loginWithFacebook = async (req: Request, res: Response) => {
    console.log("facebook login");
    try {
      if (!req.body.code) {
        console.log("dont have code ");
        res.status(401).json({ msg: "Wrong Code!" });
        return;
      }
      console.log("have code");
      const { code } = req.body;
      const fetchResponse = await fetch(`https://graph.facebook.com/oauth/access_token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: process.env.FACEBOOK_CLIENT_ID + "",
          client_secret: process.env.FACEBOOK_CLIENT_SECRET + "",
          code: code + "",
          redirect_uri: `${process.env.FRONTEND_URL}/facebook-callback`,
        }),
      });
      const data = await fetchResponse.json();
      console.log(data);
      if (!data.access_token) {
        res.status(401).json({ msg: "Failed to get access token!" });
        return;
      }
      const profileResponse = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${data.access_token}`
      );
      const profileData = await profileResponse.json();
      // console.log(profileData);
      let user = await this.userService.loginWithEmail(profileData.email);
      console.log("hihi");
      console.log(user);
      // Create a new user if the user does not exist
      if (!user) {
        res.status(400).json({ email: profileData.email, message: "User not found" });
        return;
      }
      const payload = {
        id: user.id,
        username: user.username,
      };
      const token = jwtSimple.encode(payload, jwt.jwtSecret);
      res.json({
        token: token,
      });
    } catch (e) {
      res.status(500).json({ msg: e.toString() });
    }
  };

  getProfile = async (req: Request, res: Response) => {
    // const uid = req.session.user!.id;
    const uid = 7;
    try {
      const result = await this.userService.getProfile(uid);
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ message: "Internal server error" });
    }
  };
  editProfile = async (req: Request, res: Response) => {
    // const uid = req.session.user!.id;
    const uid = 7;

    const formFields: User = req.form.fields as any;

    const { username, email, birthday, gender, is_experienced } = formFields;
    const photo = (req.form.files["image"] as formidable.File)?.newFilename || undefined;

    const user: User = { username, email, birthday, gender, is_experienced, photo };

    try {
      const result = await this.userService.editProfile(uid, user);
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ message: "Internal server error" });
    }
  };

  logout = async (req: Request, res: Response) => {
    req.user = undefined;
    res.status(200).json({ message: "Successful logout" });
  };

  validation = async (req: Request, res: Response) => {
    console.log("validated");
    const token = req.body.token;
    res.status(200).json({ token });
  };
}
