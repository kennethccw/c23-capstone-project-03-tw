import fs from "fs";
import formidable from "formidable";
import path from "path";
import type { Request, Response, NextFunction } from "express";

// declare global {
//   namespace Express {
//     interface Request {
//       form: {
//         fields: formidable.Fields;
//         files: formidable.Files;
//         s3Files: aws.S3.ManagedUpload.SendData[];
//       };
//     }
//   }
// }

// create folder if does not exists
// const uploadDir = path.join(
//   __dirname,
//   "..",
//   "..",
//   "..",
//   "frontend",
//   "public",
//   "photos",
//   "animalNeedHelp"
// );

const uploadDir = path.join(__dirname, "..", "..", "uploads", "animalNeedHelp");
fs.mkdirSync(uploadDir, { recursive: true });

let fileCounter = 0;
const form = formidable({
  uploadDir,
  maxFiles: 1,
  maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
  // filter: (part) => part.mimetype?.startsWith("image/") || false,
  filename: (originalName, originalExt, part) => {
    fileCounter++;
    const fieldName = part.name;
    const timestamp = Date.now();
    const ext = part.mimetype?.split("/").pop();
    return `${fieldName}-${timestamp}-${fileCounter}.${ext}`;
  },
});

export const uploadMiddlewareForChatroom = (req: Request, res: Response, next: NextFunction) => {
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err, "formidable.ts L41");
      res.status(400).json({ message: "cannot upload file" });
      return;
    }

    req.form = { fields, files };
    console.log(req.form.files, ", req form files", "succeed in formidable.ts L48");
    next();
  });
};
