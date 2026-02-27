# minicoder.

Minimal local-first code editor and lesson viewer.

Quick start (recommended — Docker Compose):

1. Install Docker and Docker Compose.
2. From the project root run (PowerShell):

```powershell
docker-compose up -d --build
```

3. Open http://localhost:9000 in your browser.

Local alternative (if you don't want Docker):

```powershell
# From the project folder
python -m http.server 9000
```

Notes:
- The app provides a Monaco-based editor, a live preview iframe, a console panel, and a curriculum viewer that reads files from the `curriculum/` folder.
- Curriculum naming convention: use `NN-Name` for folders and `NN-Title.md` for lesson files (use dashes for spaces). This keeps titles clean when rendered.

Tech stack and utilities:
- Monaco Editor (in-browser editing)
- Marked + Prism (lesson rendering)
- JSZip + FileSaver (export/import project zip)

If you use Docker Compose, deploy the included `docker-compose.yml` (service exposes port 9000).

That's it — start the container and open the app in your browser.