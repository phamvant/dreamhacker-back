import { S3Client } from "@aws-sdk/client-s3";
import CONFIG from "../config/config.js";

const s3Singleton = () => {
  return new S3Client({
    credentials: {
      accessKeyId: CONFIG.AWS.ACCESS_KEY_ID,
      secretAccessKey: CONFIG.AWS.SECRET_ACCESS_KEY,
    },
    region: "ap-northeast-1",
  });
};

declare global {
  var awsBucket: ReturnType<typeof s3Singleton>;
}

const awsBucket = globalThis.awsBucket ?? s3Singleton();

export default awsBucket;

if (process.env.NODE_ENV !== "production") globalThis.awsBucket = awsBucket;
