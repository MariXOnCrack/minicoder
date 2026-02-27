# 00 — Introduction

**Goal:** Set up your environment so you're ready to write and test JavaScript.

---

## What You'll Need

- A code editor (e.g. [VS Code](https://code.visualstudio.com/))
- A web browser (e.g. Chrome or Firefox)
- A basic HTML file to work inside
- Or minicoder.

---

## Step 1: Create Your Project Files

If you are on something like VsCode, create a folder for your project and add two files inside it:

```
my-project/
├── index.html
└── script.js
```

---

## Step 2: Link Your JavaScript File to HTML

Open `index.html` and add the following boilerplate. The key line is the `<script>` tag — it tells the browser to load and run your `script.js` file.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>JS Basics</title>
  </head>
  <body>
    <h1>Open the Console!</h1>

    <!-- Link your JS file here, just before the closing body tag -->
    <script src="script.js"></script>
  </body>
</html>
```

> **Why at the bottom?** Placing the `<script>` tag just before `</body>` ensures the HTML content loads before the JavaScript runs.

---

## Step 3: Write Your First Line of JavaScript

Open `script.js` and add this line:

```js
console.log("Hello, World!");
```

---

## Step 4: See Your Output in the Browser

1. Open `index.html` in your browser. Or look at the preview window.
2. Click `console` to open the **Console** tab.
3. You should see `Hello, World!` printed there.

`console.log()` is your best friend as a beginner — use it constantly to check what your code is doing.

---

## Quick Reference

| Concept | Example | What it does |
|---|---|---|
| Link a JS file | `<script src="script.js"></script>` | Loads your JS into the HTML page |
| Print to console | `console.log("Hi!")` | Displays output in DevTools |
| Open DevTools | `F12` or Right-click → Inspect | Opens the browser developer tools |

---

## ✅ You're Ready!

Once you can see your message in the console, your environment is working correctly. Move on to **01 — Variables and Data Types** to start writing real code.