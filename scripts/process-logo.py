from PIL import Image
import os

src = r"c:\wamp64\www\itwebsite\public\logos\omgeaks-logo-source.png"
img = Image.open(src).convert("RGBA")
pixels = img.load()
w, h = img.size

for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        # Pure / near-white -> transparent
        if r >= 248 and g >= 248 and b >= 248:
            pixels[x, y] = (255, 255, 255, 0)
            continue

        # Soft white fringe: un-premultiply white blend for navy text / soft shadows
        # Detect pixels that are washed toward white (high luminance but not brand colors)
        mn = min(r, g, b)
        mx = max(r, g, b)
        # Near-white soft edges
        if mn > 200 and mx - mn < 40:
            # Fade alpha based on distance from white
            dist = 255 - ((r + g + b) / 3)
            alpha = int(max(0, min(255, dist * 6)))
            # Recover approximate original color by removing white mix
            # Assume mix: result = color * t + 255 * (1-t)
            t = alpha / 255.0
            if t > 0.05:
                cr = int(max(0, min(255, (r - 255 * (1 - t)) / t)))
                cg = int(max(0, min(255, (g - 255 * (1 - t)) / t)))
                cb = int(max(0, min(255, (b - 255 * (1 - t)) / t)))
                pixels[x, y] = (cr, cg, cb, alpha)
            else:
                pixels[x, y] = (r, g, b, 0)
            continue

        # Semi-white antialias on dark navy text (grayish navy blends)
        # If pixel is lighter than typical navy due to white blend
        if r < 80 and g < 100 and b > 80 and (r + g + b) / 3 > 90:
            # likely navy blended with white — recover navy
            # estimate mix amount from how light it is
            # typical navy ~ (0, 35, 102)
            target_luma = 45
            current_luma = (r + g + b) / 3
            if current_luma > target_luma:
                t = (255 - current_luma) / (255 - target_luma)
                t = max(0.15, min(1.0, t))
                cr = int(max(0, min(255, (r - 255 * (1 - t)) / t)))
                cg = int(max(0, min(255, (g - 255 * (1 - t)) / t)))
                cb = int(max(0, min(255, (b - 255 * (1 - t)) / t)))
                pixels[x, y] = (cr, cg, cb, int(t * 255))

out_full = r"c:\wamp64\www\itwebsite\public\logos\omgeaks-logo.png"
img.save(out_full, "PNG", optimize=True)
print("saved full", img.size, os.path.getsize(out_full))

bbox = img.getbbox()
print("bbox", bbox)

if bbox:
    left, top, right, bottom = bbox
    content_h = bottom - top
    # Emblem only — cut before wordmark (~top 68% of content)
    emblem_bottom = top + int(content_h * 0.68)
    emblem = img.crop((left, top, right, emblem_bottom))
    eb = emblem.getbbox()
    if eb:
        emblem = emblem.crop(eb)
    pad = 10
    padded = Image.new("RGBA", (emblem.width + pad * 2, emblem.height + pad * 2), (0, 0, 0, 0))
    padded.paste(emblem, (pad, pad), emblem)
    out_icon = r"c:\wamp64\www\itwebsite\public\logos\omgeaks-icon.png"
    padded.save(out_icon, "PNG", optimize=True)
    print("saved icon", padded.size, os.path.getsize(out_icon))

    side = max(padded.size)
    sq = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    sq.paste(padded, ((side - padded.width) // 2, (side - padded.height) // 2), padded)
    for size, path in [
        (32, r"c:\wamp64\www\itwebsite\public\favicon-32.png"),
        (64, r"c:\wamp64\www\itwebsite\public\favicon-omgeaks.png"),
        (180, r"c:\wamp64\www\itwebsite\public\apple-touch-icon.png"),
    ]:
        sq.resize((size, size), Image.Resampling.LANCZOS).save(path, "PNG")
        print("saved", path)

# Also keep exact original (with white bg) for reference
print("done")
