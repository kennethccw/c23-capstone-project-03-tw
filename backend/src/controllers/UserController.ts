import { UserService } from "../services/UserService";
import { Request, Response } from "express";
import formidable from "formidable";
import { User } from "../utils/model";
import { checkPassword, hashPassword } from "../utils/hash";

export class UserController {
  constructor(private userService: UserService) {}

  register = async (req: Request, res: Response) => {
    const formFields: User = req.form.fields as any;

    const {
      username,
      email,
      password: plainPassword,
      mobile,
      birthday,
      gender,
      is_experienced,
    } = formFields;

    const password = await hashPassword(plainPassword as string);

    const photo = (req.form.files["image"] as formidable.File)?.newFilename || undefined;
    const user: User = {
      username,
      email,
      password,
      mobile,
      birthday,
      gender,
      is_experienced,
      photo,
    };
    try {
      const result = await this.userService.register(user);
      console.log(result);
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ message: "Intenal Server Error" });
    }
  };

  loginWithUsernameOrEmail = async (req: Request, res: Response) => {
    const { userIdentity, password } = req.body as { userIdentity: string; password: string };
    if (userIdentity.includes("@")) {
      try {
        const user = await this.userService.loginWithEmail(userIdentity);

        if (await checkPassword(password, user.password)) {
          req.session.user = { id: user.id, username: user.username };
          res.status(200).json(user);
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
          req.session.user = { id: user.id, username: user.username };
          res.status(200).json(user);
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
      req.session.user = { id: user.id, username: user.username };
      res.status(200).json(user);
    } catch (e) {
      res.status(400).json({ email: data.email, message: "User not found" });
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
    req.session.user = undefined;
    res.status(200).json({ message: "Successful logout" });
  };
}
