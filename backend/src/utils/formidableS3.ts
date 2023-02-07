import aws from "aws-sdk";
import formidable from "formidable";
import { env } from "process";
import stream from "stream";
import { Request, Response, NextFunction } from "express";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
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

export class FileS3Controller {
  counter = 0;
  s3: aws.S3;

  constructor() {
    const credentials = new aws.Credentials({
      accessKeyId: env.AWS_ACCESS_KEY_ID ?? "",
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY ?? "",
    });
    this.s3 = new aws.S3({ credentials, region: env.S3_REGION });
  }

  upload = (bucketPath: string) => (req: Request, res: Response, next: NextFunction) => {
    let filename = "";
    const uploads: aws.S3.ManagedUpload[] = [];
    const form = new formidable.Formidable({
      fileWriteStreamHandler: () => {
        const passThroughStream = new stream.PassThrough();
        const upload = this.s3.upload(
          {
            Body: passThroughStream,
            Bucket: `${env.S3_BUCKET_NAME ?? ""}${bucketPath}`,
            Key: filename,
          },
          {}
        );
        upload.send();
        uploads.push(upload);
        return passThroughStream;
      },
      filename: (name, ext, part) => {
        const field = part.name;
        const timestamp = Date.now();
        filename = `${field}-${timestamp}-${++this.counter}`;
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
