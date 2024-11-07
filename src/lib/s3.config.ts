import { S3Client } from "@aws-sdk/client-s3";

const hostname=Bun.env.VULTR_HOST_NAME


if (!Bun.env.VULTR_ACCESS_KEY_ID || !Bun.env.VULTR_SECRET_ACCESS_KEY || !hostname) {
  throw new Error("AWS credentials are not set in the environment variables");
}

const s3Client = new S3Client({
  region: hostname.split('.')[0],
  endpoint: "https://" + hostname,
  credentials: {
    accessKeyId: Bun.env.VULTR_ACCESS_KEY_ID,
    secretAccessKey: Bun.env.VULTR_SECRET_ACCESS_KEY,
  },
});

export default s3Client;
