from PIL import Image
from pathlib import Path

ROOT = Path(r"c:\wamp64\www\itwebsite\public\logos")
BACKUP = ROOT / "_backup_white_bg"
BACKUP.mkdir(exist_ok=True)
PUBLIC = Path(r"c:\wamp64\www\itwebsite\public")


def remove_white_bg(src: Path, dst: Path, tolerance: int = 32) -> None:
    img = Image.open(src).convert("RGBA")
    w, h = img.size
    px = img.load()

    def is_near_white(r: int, g: int, b: int, tol: int = tolerance) -> bool:
        return (
            r >= 255 - tol
            and g >= 255 - tol
            and b >= 255 - tol
            and max(r, g, b) - min(r, g, b) <= 18
        )

    visited = [[False] * h for _ in range(w)]
    stack: list[tuple[int, int]] = []
    for x in range(w):
        stack.append((x, 0))
        stack.append((x, h - 1))
    for y in range(h):
        stack.append((0, y))
        stack.append((w - 1, y))

    bg: list[tuple[int, int]] = []
    while stack:
        x, y = stack.pop()
        if x < 0 or y < 0 or x >= w or y >= h or visited[x][y]:
            continue
        visited[x][y] = True
        r, g, b, _a = px[x, y]
        if not is_near_white(r, g, b):
            continue
        bg.append((x, y))
        stack.extend(((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)))

    for x, y in bg:
        r, g, b, _ = px[x, y]
        px[x, y] = (r, g, b, 0)

    # Soft fringe / residual near-white (anti-alias + soft shadow)
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            chroma = max(r, g, b) - min(r, g, b)
            brightness = (r + g + b) / 3
            if chroma <= 22 and brightness >= 210:
                alpha = int(max(0, min(255, (255 - brightness) * 6)))
                px[x, y] = (r, g, b, alpha)
            elif chroma <= 28 and brightness >= 235:
                px[x, y] = (r, g, b, 0)

    img.save(dst, "PNG", optimize=True)
    print(f"OK {src.name} -> {dst.name} ({dst.stat().st_size} bytes)")


files = ["omgeaks-icon.png", "omgeaks-logo.png"]
for name in files:
    src = ROOT / name
    backup = BACKUP / name
    if not backup.exists():
        backup.write_bytes(src.read_bytes())
        print(f"backed up {name}")
    remove_white_bg(src, src)

fav = PUBLIC / "favicon-omgeaks.png"
if fav.exists():
    b = BACKUP / "favicon-omgeaks.png"
    if not b.exists():
        b.write_bytes(fav.read_bytes())
    remove_white_bg(fav, fav, tolerance=40)

apple = PUBLIC / "apple-touch-icon.png"
if apple.exists():
    b = BACKUP / "apple-touch-icon.png"
    if not b.exists():
        b.write_bytes(apple.read_bytes())
    remove_white_bg(apple, apple, tolerance=40)

print("done")
