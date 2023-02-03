import fs from "fs";
import formidable from "formidable";
import path from "path";
import type { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      form: {
        fields: formidable.Fields;
        files: formidable.Files;
      };
    }
  }
}

// create folder if does not exists
const uploadDir = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "frontend",
  "public",
  "photos",
  "animalNeedHelp"
);
// const uploadDir = path.join(__dirname);
fs.mkdirSync(uploadDir, { recursive: true });

let fileCounter = 0;
const form = formidable({
  uploadDir,
  maxFiles: 1,
  maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
  // filter: (part) => part.mimetype?.startsWith("image/") || false,
  filename: (originalName, originalExt, part, form) => {
    fileCounter++;
    let fieldName = part.name;
    let timestamp = Date.now();
    let ext = part.mimetype?.split("/").pop();
    return `${fieldName}-${timestamp}-${fileCounter}.${ext}`;
  },
});

export const uploadMiddlewareForChatroom = (req: Request, res: Response, next: NextFunction) => {
  // console.log("uploadDir", uploadDir , 'formaidable.ts L38');
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err, "formidable.ts L41");
      res.status(400).json({ message: "cannot upload file" });
      return;
    }
    // console.log(req, 'formidable.ts L44')

    req.form = { fields, files };
    // console.log(req.form.fields, 'succeed in formidable.ts L45')
    // console.log(req.form, ", req form", 'succeed in formidable.ts L46');
    // console.log(req.form.fields.audio[0], ', req form fields')
    console.log(req.form.files, ", req form files", "succeed in formidable.ts L48");
    next();
  });
};
