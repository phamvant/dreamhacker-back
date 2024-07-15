import { GetObjectCommand } from "@aws-sdk/client-s3";
import awsBucket from "../../../db/s3.js";

export const getBucketObjectByKey = async (key: string) => {
  const res = await awsBucket.send(
    new GetObjectCommand({
      Bucket: "dreamhacker",
      Key: key,
    }),
  );

  return res.Body.transformToByteArray();
};
