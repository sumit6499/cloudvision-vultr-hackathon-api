import { S3Client } from "@aws-sdk/client-s3";


if (!Bun.env.AWS_ACCESS_KEY_ID || !Bun.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error("AWS credentials are not set in the environment variables");
}

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: Bun.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: Bun.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default s3Client;
