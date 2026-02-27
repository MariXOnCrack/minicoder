# 08 — The DOM Basics

**Goal:** Connect your JavaScript to a real webpage — read from it, change it, and react to what the user does.

---

## What is the DOM?

When a browser loads an HTML page, it creates a live model of it in memory called the **Document Object Model (DOM)**. The DOM represents every element on the page as a JavaScript object, which means you can read and modify your HTML using JS.

```
HTML File  →  Browser parses it  →  DOM (live JS model of the page)
                                          ↑
                                    JavaScript can reach in
                                    and change things here
```

The entry point to the DOM is the global `document` object — it's always available in your scripts.

---

## Selecting Elements

Before you can do anything with an element, you need to grab a reference to it.

### `document.getElementById()`

Selects a single element by its `id` attribute. The fastest and most direct method.

```html
<h1 id="title">Hello, World!</h1>
```

```js
const title = document.getElementById("title");
console.log(title); // <h1 id="title">Hello, World!</h1>
```

### `document.querySelector()`

Selects the **first** element that matches a CSS selector. More flexible — you can target by tag, class, id, or any valid CSS selector.

```html
<p class="description">This is a paragraph.</p>
```

```js
const para  = document.querySelector(".description"); // by class
const title = document.querySelector("#title");        // by id
const first = document.querySelector("p");             // by tag
```

### `document.querySelectorAll()`

Like `querySelector()`, but returns **all** matching elements as a list you can loop through.

```js
const allParagraphs = document.querySelectorAll("p");

allParagraphs.forEach((p) => {
  console.log(p.innerText);
});
```

### Comparison

| Method | Returns | Selector type |
|---|---|---|
| `getElementById("id")` | Single element | ID only |
| `querySelector("selector")` | First match | Any CSS selector |
| `querySelectorAll("selector")` | All matches | Any CSS selector |

---

## Reading and Changing Content

Once you have a reference to an element, you can read or update what's inside it.

### `.innerText`

Gets or sets the visible text content of an element.

```html
<h1 id="title">Hello!</h1>
```

```js
const title = document.getElementById("title");

console.log(title.innerText); // "Hello!"

title.innerText = "Welcome to my page!";
// The h1 on the page now reads "Welcome to my page!"
```

### `.innerHTML`

Gets or sets the full HTML content inside an element, including tags.

```js
title.innerHTML = "<em>Welcome!</em>";
// Renders as italicised text
```

> Prefer `.innerText` for plain text. Only use `.innerHTML` when you specifically need to inject HTML — and never use it with user-provided input, as it can create security vulnerabilities.

---

## Changing Styles

Use the `.style` property to apply inline CSS directly to an element.

```js
const title = document.getElementById("title");

title.style.color = "blue";
title.style.fontSize = "2rem";
title.style.backgroundColor = "lightyellow";
```

> CSS properties with hyphens (`background-color`, `font-size`) become camelCase in JavaScript (`backgroundColor`, `fontSize`).

### A Cleaner Approach — Toggling Classes

For anything more than a quick one-off change, it's better practice to define your styles in CSS and use JavaScript to toggle a class on and off:

```css
/* style.css */
.highlight {
  background-color: yellow;
  font-weight: bold;
}
```

```js
const title = document.getElementById("title");

title.classList.add("highlight");    // adds the class
title.classList.remove("highlight"); // removes it
title.classList.toggle("highlight"); // adds if absent, removes if present
```

---

## Reacting to User Actions — Event Listeners

An **event listener** watches an element and runs a function when something happens to it, such as a click, a keypress, or a mouse hover.

```js
element.addEventListener("event", callbackFunction);
```

### A Button Click

```html
<button id="myButton">Click me</button>
```

```js
const button = document.getElementById("myButton");

button.addEventListener("click", () => {
  console.log("Button was clicked!");
});
```

### Changing the Page on Click

```html
<h1 id="title">Hello!</h1>
<button id="myButton">Change the title</button>
```

```js
const button = document.getElementById("myButton");
const title  = document.getElementById("title");

button.addEventListener("click", () => {
  title.innerText = "You clicked the button!";
  title.style.color = "green";
});
```

### Common Event Types

| Event | Fires when... |
|---|---|
| `"click"` | User clicks the element |
| `"mouseover"` | User hovers over the element |
| `"mouseout"` | User's cursor leaves the element |
| `"keydown"` | User presses a key |
| `"input"` | User types into an input field |
| `"submit"` | User submits a form |

---

## Reading User Input

You can read what a user has typed into an input field using the `.value` property:

```html
<input id="nameInput" type="text" placeholder="Enter your name" />
<button id="greetBtn">Greet me</button>
<p id="output"></p>
```

```js
const input  = document.getElementById("nameInput");
const button = document.getElementById("greetBtn");
const output = document.getElementById("output");

button.addEventListener("click", () => {
  const name = input.value;

  if (name) {
    output.innerText = `Hello, ${name}!`;
  } else {
    output.innerText = "Please enter a name.";
  }
});
```

---

## Putting It All Together

Here's a minimal but complete example using everything from this lesson:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>DOM Basics</title>
  </head>
  <body>
    <h1 id="title">My Counter</h1>
    <p id="count">0</p>
    <button id="incrementBtn">Add 1</button>

    <script src="script.js"></script>
  </body>
</html>
```

```js
// script.js
const countDisplay = document.getElementById("count");
const button       = document.getElementById("incrementBtn");

let count = 0;

button.addEventListener("click", () => {
  count++;
  countDisplay.innerText = count;
});
```

---

## Quick Reference

| Task | Code |
|---|---|
| Select by ID | `document.getElementById("id")` |
| Select by CSS selector | `document.querySelector(".class")` |
| Select all matches | `document.querySelectorAll("p")` |
| Read/set text | `element.innerText` |
| Read/set HTML | `element.innerHTML` |
| Change a style | `element.style.color = "red"` |
| Add a class | `element.classList.add("name")` |
| Toggle a class | `element.classList.toggle("name")` |
| Listen for an event | `element.addEventListener("click", fn)` |
| Read input value | `input.value` |

---


## 🎉 You Made It!

You've completed the JS Basics series. Here's everything you now know:

| Lesson | Topic |
|---|---|
| 00 | Setting up your environment |
| 01 | Variables and data types |
| 02 | Math and operators |
| 03 | Conditionals |
| 04 | Functions |
| 05 | Arrays |
| 06 | Loops |
| 07 | Objects |
| 08 | The DOM |

From here, great next steps are: **DOM events in depth**, **Fetch API and working with data**, or picking up a framework like **React** or **Vue** to build real applications.