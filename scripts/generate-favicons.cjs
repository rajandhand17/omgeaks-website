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

  const root = process.cwd();
  const pub = path.join(root, "public");
  const app = path.join(root, "src", "app");
  const srcIcon = path.join(pub, "logos", "omgeaks-icon.png");

  const trimmed = await sharp(srcIcon)
    .trim({ threshold: 12 })
    .png()
    .toBuffer();

  async function squarePng(size, pad = 0.88) {
    const inner = Math.max(1, Math.round(size * pad));
    const mark = await sharp(trimmed)
      .resize(inner, inner, { fit: "inside", withoutEnlargement: false })
      .png()
      .toBuffer();

    return sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      },
    })
      .composite([{ input: mark, gravity: "center" }])
      .png()
      .toBuffer();
  }

  const files = [
    ["favicon-16.png", 16, 0.9],
    ["favicon-32.png", 32, 0.9],
    ["favicon-omgeaks.png", 64, 0.88],
    ["apple-touch-icon.png", 180, 0.86],
    ["icon-192.png", 192, 0.86],
    ["icon-512.png", 512, 0.86],
  ];

  for (const [name, size, pad] of files) {
    const buf = await squarePng(size, pad);
    fs.writeFileSync(path.join(pub, name), buf);
  }

  // App Router icons — these become /icon and /apple-icon (browser favicon)
  fs.writeFileSync(path.join(app, "icon.png"), await squarePng(32, 0.9));
  fs.writeFileSync(path.join(app, "apple-icon.png"), await squarePng(180, 0.86));

  // Multi-resolution ICO (32 + 16) via PNG container browsers accept
  fs.writeFileSync(path.join(pub, "favicon.ico"), await squarePng(32, 0.9));

  console.log("favicons-ok");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
