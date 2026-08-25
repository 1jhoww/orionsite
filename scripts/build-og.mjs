import sharp from "sharp";

await sharp("public/media/og-formula-final.png")
  .resize(1200, 630, { fit: "cover", position: "center" })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile("public/og.png");

console.log("Generated public/og.png");
