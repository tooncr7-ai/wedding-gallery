import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = new S3Client({
      region: process.env.B2_REGION!,
      endpoint: process.env.B2_ENDPOINT!,
      forcePathStyle: true,
      credentials: {
        accessKeyId: process.env.B2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.B2_SECRET_ACCESS_KEY!,
      },
    });

    const command = new ListObjectsV2Command({
      Bucket: process.env.B2_BUCKET_NAME!,
    });

    const response = await client.send(command);

    return NextResponse.json({
      bucket: process.env.B2_BUCKET_NAME,
      endpoint: process.env.B2_ENDPOINT,
      region: process.env.B2_REGION,
      totalObjects: response.KeyCount ?? 0,
      objects: (response.Contents ?? []).map((o) => o.Key),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
