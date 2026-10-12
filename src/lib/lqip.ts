import path from "node:path";
import sharp from "sharp";

const cache = new Map<string, Promise<string | undefined>>();

/**
 * Build-time low-quality image placeholder for an image in /public:
 * a ~100 byte blurred WebP as a data URI, shown while the real photo loads.
 */
export function lqip(publicPath: string): Promise<string | undefined> {
  let pending = cache.get(publicPath);
  if (!pending) {
    pending = sharp(path.join(process.cwd(), "public", publicPath))
      .resize(16)
      .blur(1)
      .webp({ quality: 40 })
      .toBuffer()
      .then((buf) => `data:image/webp;base64,${buf.toString("base64")}`)
      // A missing or unreadable photo just falls back to the plain grey box
      .catch(() => undefined);
    cache.set(publicPath, pending);
  }
  return pending;
}
