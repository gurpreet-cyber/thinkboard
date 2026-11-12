# Thinkboard (PWA)

A minimal whiteboard: sticky notes, text, images, drawing, link cards and boards inside boards.

## Offline
Everything works offline after the first visit: the app, font, icons, boards and images.
Only two things need a connection: **Play** (YouTube) and **Preview** (web pages).
Offline, they show a short message instead.

## Deploy on GitHub Pages
1. Create a repo and upload the contents of this folder to the repo root (keep `fonts/` and `icons/`).
2. Settings > Pages > Deploy from a branch > `main` / root.
3. Open `https://<you>.github.io/<repo>/` once online, then Add to Home Screen / Install.

## Notes
- Boards, images and videos are saved on the device in IndexedDB. The app sets no limit on how many you add or how large they are; only the free space on the device limits you (the Help sheet shows usage). They do not carry over from the Claude artifact and do not sync between devices. Use one window at a time, because two windows can overwrite each other.
- Some sites refuse to be shown in a frame. Use the arrow button to open them in a new tab.
- When you change any file, bump `CACHE` in `sw.js` (for example `thinkboard-v9`) so installed copies update.
