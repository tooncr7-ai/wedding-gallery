import {
  S3Client,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";

const r2Client = new S3Client({
  region: process.env.B2_REGION!,
  endpoint: process.env.B2_ENDPOINT!,
  forcePathStyle: true,
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

// ใช้ internal proxy แทน signed URL
function buildProxyUrl(key: string): string {
  return `/api/image?key=${encodeURIComponent(key)}`;
}

export async function listImages(album?: Album): Promise<PhotoItem[]> {
  const prefix = album ? `${album}/` : undefined;

  const command = new ListObjectsV2Command({
    Bucket: process.env.B2_BUCKET_NAME!,
    Prefix: prefix,
  });

  const response = await r2Client.send(command);
  const objects = response.Contents ?? [];

  return objects
    .filter((obj) => {
      if (!obj.Key) return false;
      const parts = obj.Key.split("/");
      if (parts.length < 2) return false;
      const albumFolder = parts[0];
      return isAlbum(albumFolder) && /\.(jpe?g|png|webp|avif)$/i.test(obj.Key);
    })
    .map((obj) => {
      const key = obj.Key!;
      const parts = key.split("/");
      const albumFolder = parts[0] as Album;
      const filename = parts[parts.length - 1];
      return { key, url: buildProxyUrl(key), album: albumFolder, filename };
    });
}

export async function getAlbumCoverUrl(album: Album): Promise<string | null> {
  const images = await listImages(album);
  return images.length > 0 ? images[0].url : null;
}
