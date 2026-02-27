# 03 — Conditionals

**Goal:** Make decisions in your code using logic.

---

## What is a Conditional?

A conditional lets your program take different paths depending on whether something is `true` or `false`. Without conditionals, code just runs top to bottom the same way every time — not very useful.

---

## `if`, `else if`, and `else`

The basic building block of decision making in JavaScript.

```js
if (condition) {
  // runs if condition is true
} else if (anotherCondition) {
  // runs if the first condition was false, but this one is true
} else {
  // runs if none of the above conditions were true
}
```

### A Simple Example

```js
const temperature = 30;

if (temperature > 25) {
  console.log("It's hot outside.");
} else if (temperature > 15) {
  console.log("It's a nice day.");
} else {
  console.log("It's cold outside.");
}

// Output: "It's hot outside."
```

> JavaScript checks each condition **from top to bottom** and stops as soon as it finds one that's true. The remaining blocks are skipped entirely.

---

## You Can Have Multiple `else if` Blocks

There's no limit to how many `else if` blocks you can chain:

```js
const score = 72;

if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B");
} else if (score >= 70) {
  console.log("C");
} else if (score >= 60) {
  console.log("D");
} else {
  console.log("F");
}

// Output: "C"
```

---

## Truthy and Falsy Values

In JavaScript, every value has an inherent "truthiness." When used in a condition, some values behave like `false` even if they aren't literally `false`. These are called **falsy** values.

### The 6 Falsy Values

| Value | Type |
|---|---|
| `false` | Boolean |
| `0` | Number |
| `""` (empty string) | String |
| `null` | Null |
| `undefined` | Undefined |
| `NaN` | Not a Number |

**Everything else is truthy** — including `"0"`, `[]`, and `{}`.

```js
if (0) {
  console.log("This won't run."); // 0 is falsy
}

if ("hello") {
  console.log("This will run!"); // non-empty string is truthy
}

if ("") {
  console.log("This won't run."); // empty string is falsy
}
```

### Why Does This Matter?

It lets you write cleaner, shorter conditions. Instead of checking `if (username !== "")`, you can just write:

```js
const username = "Alice";

if (username) {
  console.log(`Welcome, ${username}!`);
} else {
  console.log("Please enter a username.");
}
```

---

## Combining Conditions

Use logical operators from the previous lesson to build more specific conditions:

```js
const age = 20;
const hasID = true;

if (age >= 18 && hasID) {
  console.log("Access granted.");
} else {
  console.log("Access denied.");
}
// Output: "Access granted."
```

---

## The Ternary Operator (Shorthand `if/else`)

For simple two-outcome decisions, you can write an `if/else` on a single line using the **ternary operator**:

```
condition ? valueIfTrue : valueIfFalse
```

```js
const age = 20;
const message = age >= 18 ? "Welcome!" : "Sorry, adults only.";
console.log(message); // "Welcome!"
```

> Use ternaries for simple cases. If the logic is complex, stick to a regular `if/else` — readability matters more than brevity.

---

## 🏆 Challenge: Age Verification

Write a script that checks if a user is old enough to enter a site. The site requires users to be at least 18.

**Requirements:**
- If the user is 18 or older, log `"Access granted. Welcome!"`
- If the user is between 13 and 17, log `"You must be 18 or older to enter."`
- If the user is under 13, log `"This site is not suitable for your age group."`

```js
// Your code here
const userAge = 16;

if (userAge >= 18) {

} else if (userAge >= 13) {

} else {

}
```

**Bonus:** Rewrite the first condition using a ternary operator.

---

## Quick Reference

| Syntax | Purpose |
|---|---|
| `if (condition) {}` | Run code if condition is true |
| `else if (condition) {}` | Check another condition if the first was false |
| `else {}` | Fallback if no conditions matched |
| `condition ? a : b` | Shorthand if/else (ternary) |
| Falsy values | `false`, `0`, `""`, `null`, `undefined`, `NaN` |

---

## ✅ Up Next

Now that your code can make decisions, head to **04 — Functions** to learn how to package logic so you can reuse it.