# 08 — Final Challenge: Mini Contact List

You've reached the end of the JS Basics series. This challenge is your capstone — it doesn't test one single lesson, it tests **all of them**.

---

## What You're Building

An interactive contact list where the user can add and delete contacts through the page, with a live counter that always reflects how many contacts exist.

---

## Requirements

1. The user fills in a **name** and a **phone number** and clicks **"Add Contact"**.
2. Each contact appears on the page as its own card showing the name and number.
3. Each card has a **"Delete"** button that removes only that contact.
4. If either input is empty when the button is clicked, show a warning message instead of adding a contact.
5. A counter at the top always shows the current number of contacts (e.g. *"You have 3 contact(s)."*).

---

## Skills You'll Need

| Skill | From |
|---|---|
| Variables and data types | Lesson 01 |
| Conditionals (empty input check) | Lesson 03 |
| Functions (keep your code clean) | Lesson 04 |
| An array to store contacts | Lesson 05 |
| A loop to render the list | Lesson 06 |
| Objects to store name + number | Lesson 07 |
| DOM manipulation and event listeners | Lesson 08 |

---

## Starter Files

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Mini Contact List</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>

    <div class="container">
      <h1>Contact List</h1>
      <p id="counter">You have 0 contact(s).</p>

      <div class="form">
        <input id="nameInput" type="text" placeholder="Name" />
        <input id="phoneInput" type="text" placeholder="Phone number" />
        <button id="addBtn">Add Contact</button>
        <p id="warning" class="warning hidden">Please fill in both fields.</p>
      </div>

      <div id="contactList"></div>
    </div>

    <script src="script.js"></script>
  </body>
</html>
```

---

### `style.css`

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: sans-serif;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  padding: 3rem 1rem;
  min-height: 100vh;
}

.container {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  width: 100%;
  max-width: 480px;
  height: fit-content;
}

h1 {
  font-size: 1.6rem;
  margin-bottom: 0.25rem;
  color: #1a1a2e;
}

#counter {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

input {
  padding: 0.65rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #4f46e5;
}

button {
  padding: 0.7rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

#addBtn {
  background-color: #4f46e5;
  color: #fff;
}

#addBtn:hover {
  background-color: #4338ca;
}

.warning {
  color: #e53e3e;
  font-size: 0.875rem;
}

.hidden {
  display: none;
}

.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f8fc;
  border: 1px solid #e8e8f0;
  border-radius: 10px;
  padding: 0.9rem 1.1rem;
  margin-bottom: 0.75rem;
}

.card-info .name {
  font-weight: bold;
  color: #1a1a2e;
}

.card-info .phone {
  font-size: 0.875rem;
  color: #666;
  margin-top: 0.15rem;
}

.delete-btn {
  background-color: #fee2e2;
  color: #e53e3e;
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  border-radius: 6px;
  flex-shrink: 0;
}

.delete-btn:hover {
  background-color: #fecaca;
}
```

---

## Hints

- Store your contacts as an **array of objects**, where each object has a `name` and `phone` property.
- Every time a contact is added or deleted, **re-render the entire list** from the array rather than trying to add or remove individual elements. This is the standard pattern.
- To show or hide the warning, **add and remove the `hidden` class** using `classList` — the CSS is already set up for you.
- Each delete button will need to know **which contact to remove**. Think about how you can use the contact's index in the array to do this.

---

Good luck! When you're done, open the browser and try breaking it — empty inputs, lots of contacts, deleting from the middle of the list. If it handles all of that, you're done.