import sharp from "sharp";

// Preserve the full-size source for high-density screens; generate display-sized variants.
for (const width of [720, 1200]) {
  const result = await sharp("public/media/hero-perfume-lab.webp")
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 88, effort: 6 })
    .toFile(`public/media/hero-perfume-lab-${width}.webp`);
  console.log(`${width}px: ${result.size} bytes`);
}
