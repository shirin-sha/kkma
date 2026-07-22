import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

/** Mild web compression — keeps clarity while reducing disk size */
const MAX_DIMENSION = 1600
const JPEG_QUALITY = 82

/**
 * Compress an uploaded image in place (or rewrite as .jpg).
 * Returns the final absolute path (extension may change to .jpg).
 */
export async function compressUploadedImage(absPath: string): Promise<string> {
  const dir = path.dirname(absPath)
  const base = path.basename(absPath, path.extname(absPath))
  const tmpPath = path.join(dir, `${base}.tmp.jpg`)
  const finalPath = path.join(dir, `${base}.jpg`)

  await sharp(absPath)
    .rotate()
    .resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toFile(tmpPath)

  // Remove original if it is a different file (e.g. .png / .webp)
  if (path.resolve(absPath) !== path.resolve(finalPath)) {
    await fs.promises.unlink(absPath).catch(() => {})
  } else if (fs.existsSync(finalPath)) {
    // Original was already .jpg — remove before rename
    await fs.promises.unlink(finalPath).catch(() => {})
  }

  await fs.promises.rename(tmpPath, finalPath)
  return finalPath
}

/** Compress a multer file and return the public /uploads/... path under the given folder. */
export async function compressMulterFile(
  file: Express.Multer.File,
  publicFolder: string
): Promise<string> {
  const finalAbs = await compressUploadedImage(file.path)
  const filename = path.basename(finalAbs)
  file.filename = filename
  file.path = finalAbs
  return `/${publicFolder.replace(/^\/+|\/+$/g, '')}/${filename}`
}
