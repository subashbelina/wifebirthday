# Wife Birthday

A birthday card web app (HTML/CSS/JS) with messages, photos, and audio.

## How to run

### Option 1: Open in browser (quick)

Double-click `index.html` or open it in your browser:

- **macOS:** `open index.html`
- **Windows:** `start index.html`
- **Linux:** `xdg-open index.html`

Some browsers may restrict audio or scripts when opening from `file://`. If something doesn’t work, use Option 2.

### Option 2: Local server (recommended)

Serve the project folder with a simple HTTP server.

**Using Python 3:**

```bash
# From the project folder
cd WifeBirthday
python3 -m http.server 8000
```

Then open: **http://localhost:8000**

**Using Node.js (npx):**

```bash
npx serve .
```

Then open the URL shown in the terminal (e.g. http://localhost:3000).

**Using PHP:**

```bash
php -S localhost:8000
```

Then open: **http://localhost:8000**

## Requirements

- A modern browser (Chrome, Firefox, Safari, Edge)
- No build step; no npm install needed
- For audio: add `Happy-birthday.mp3` (and optionally `happy-birthday.ogg`) in the `audio/` folder (see `audio/README.txt`)
