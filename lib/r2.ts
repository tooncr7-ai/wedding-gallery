import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const r2Client = new S3Client({
  region: process.env.B2_REGION!,
  endpoint: process.env.B2_ENDPOINT!,
  forcePathStyle: true, // Backblaze B2 ต้องการ path-style URL
  credentials: {
    accessKeyId: process.env.B2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.B2_SECRET_ACCESS_KEY!,
  },
});

export const ALBUMS = ["prewedding", "ceremony", "portrait", "detail"] as const;
export type Album = (typeof ALBUMS)[number];

export const ALBUM_LABELS: Record<Album, string> = {
  prewedding: "Pre-Wedding",
  ceremony: "Ceremony",
  portrait: "Portrait",
  detail: "Detail",
};

export interface PhotoItem {
  key: string;
  url: string;
  album: Album;
  filename: string;
}

function isAlbum(value: string): value is Album {
  return ALBUMS.includes(value as Album);
}

// URL หมดอายุใน 6 ชั่วโมง (คนเปิดเว็บแล้ว reload ก็ได้ URL ใหม่จาก server)
const SIGNED_URL_EXPIRES = 6 * 60 * 60;

async function buildSignedUrl(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: process.env.B2_BUCKET_NAME!,
    Key: key,
  });
  return getSignedUrl(r2Client, command, { expiresIn: SIGNED_URL_EXPIRES });
}

export async function listImages(album?: Album): Promise<PhotoItem[]> {
  const prefix = album ? `${album}/` : undefined;

  const command = new ListObjectsV2Command({
    Bucket: process.env.B2_BUCKET_NAME!,
    Prefix: prefix,
  });

  const response = await r2Client.send(command);
  const objects = response.Contents ?? [];

  const filtered = objects.filter((obj) => {
    if (!obj.Key) return false;
    const parts = obj.Key.split("/");
    if (parts.length < 2) return false;
    const albumFolder = parts[0];
    return isAlbum(albumFolder) && /\.(jpe?g|png|webp|avif)$/i.test(obj.Key);
  });

  // สร้าง signed URL พร้อมกันทุกรูป
  const items = await Promise.all(
    filtered.map(async (obj) => {
      const key = obj.Key!;
      const parts = key.split("/");
      const albumFolder = parts[0] as Album;
      const filename = parts[parts.length - 1];
      const url = await buildSignedUrl(key);
      return { key, url, album: albumFolder, filename };
    })
  );

  return items;
}

export async function getSignedImageUrl(
  key: string,
  expiresIn = 3600
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: process.env.B2_BUCKET_NAME!,
    Key: key,
  });
  return getSignedUrl(r2Client, command, { expiresIn });
}

export async function getAlbumCoverUrl(album: Album): Promise<string | null> {
  const images = await listImages(album);
  return images.length > 0 ? images[0].url : null;
}
