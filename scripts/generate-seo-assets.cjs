const fs = require("fs");
const path = require("path");

async function main() {
  let sharp;
  try {
    sharp = require("sharp");
  } catch {
    const { execSync } = require("child_process");
    execSync("npm install sharp --no-save", { stdio: "inherit" });
    sharp = require("sharp");
  }

  const pub = path.join(process.cwd(), "public");
  const logo = path.join(pub, "logos", "omgeaks-logo.png");
  const icon512 = path.join(pub, "icon-512.png");

  await sharp(icon512)
    .resize(192, 192, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(pub, "icon-192.png"));

  const bg = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 3,
      background: { r: 5, g: 25, b: 55 },
    },
  })
    .png()
    .toBuffer();

  const logoBuf = await sharp(logo).resize({ width: 520, fit: "inside" }).png().toBuffer();
  const meta = await sharp(logoBuf).metadata();
  const left = Math.round((1200 - (meta.width || 520)) / 2);
  const top = Math.round((630 - (meta.height || 200)) / 2) - 20;

  const bar = await sharp({
    create: { width: 280, height: 6, channels: 3, background: { r: 0, g: 174, b: 239 } },
  })
    .png()
    .toBuffer();
  const bar2 = await sharp({
    create: { width: 180, height: 6, channels: 3, background: { r: 241, g: 90, b: 36 } },
  })
    .png()
    .toBuffer();

  await sharp(bg)
    .composite([
      { input: logoBuf, left, top },
      { input: bar, left: 460, top: top + (meta.height || 200) + 36 },
      { input: bar2, left: 560, top: top + (meta.height || 200) + 52 },
    ])
    .png()
    .toFile(path.join(pub, "og-image.png"));

  console.log("assets-ok", fs.existsSync(path.join(pub, "og-image.png")));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
