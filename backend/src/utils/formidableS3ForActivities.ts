import aws from "aws-sdk";
import formidable from "formidable";
import { env } from "process";
import stream from "stream";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      form: {
        fields: formidable.Fields;
        files: formidable.Files;
        s3Files?: aws.S3.ManagedUpload.SendData[];
      };
    }
  }
}

export class FileControllerForActivities {
  counter = 0;
  s3: aws.S3;

  constructor() {
    let credentials = new aws.Credentials({
      accessKeyId: env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
    });
    this.s3 = new aws.S3({
      credentials,
      region: env.S3_REGION,
    });
  }

  upload = (req: Request, res: Response, next: NextFunction) => {
    let uploads: aws.S3.ManagedUpload[] = [];
    let filename = "";
    let form = new formidable.Formidable({
      fileWriteStreamHandler: () => {
        let passThroughStream = new stream.PassThrough();
        let upload = this.s3.upload(
          {
            Body: passThroughStream,
            Bucket: `${env.S3_BUCKET_NAME!}/photos/activities`,
            Key: filename,
          },
          {}
        );
        upload.send();
        uploads.push(upload);
        return passThroughStream;
      },
      filename: (name, ext, part, form) => {
        let field = part.name;
        let timestamp = Date.now();
        this.counter++;
        filename = `${field}-${timestamp}-${this.counter}`;
        console.log({ filename });
        return filename;
      },
    });
    form.parse(req, (err, fields, files) => {
      if (err) {
        uploads.forEach((upload) => upload.abort());
        res.status(400).json({ error: "Failed to parse form data. " + String(err) });
        return;
      }
      Promise.all(uploads.map((upload) => upload.promise()))
        .then((s3Files) => {
          // TODO pass to fileService to store the s3 keys into database
          req.form = { fields, files, s3Files };
          next();
        })
        .catch((err) => {
          uploads.forEach((upload) => upload.abort());
          console.log(err);
          res.status(502).json({ error: "Failed to upload to S3. " + String(err) });
        });
    });
  };
}
