# 06 — Loops

**Goal:** Automate repetitive tasks by running the same block of code multiple times.

---

## What is a Loop?

Imagine you have an array of 100 users and you want to greet each one. Writing `console.log()` 100 times isn't realistic. A loop does it for you automatically.

```js
// Without a loop — painful
console.log("Hello, Alice!");
console.log("Hello, Bob!");
console.log("Hello, Carol!");

// With a loop — automatic
const users = ["Alice", "Bob", "Carol"];
for (let i = 0; i < users.length; i++) {
  console.log(`Hello, ${users[i]}!`);
}
```

---

## The `for` Loop

The most common loop. It has three parts, all in one line:

```js
for (initialisation; condition; update) {
  // code to repeat
}
```

| Part | Example | Purpose |
|---|---|---|
| Initialisation | `let i = 0` | Set a counter before the loop starts |
| Condition | `i < 5` | Keep looping as long as this is `true` |
| Update | `i++` | Run after each iteration |

```js
for (let i = 0; i < 5; i++) {
  console.log(i);
}
// Output: 0, 1, 2, 3, 4
```

### Looping Through an Array

The most common use of a `for` loop — pair `i` with the array's index:

```js
const colours = ["red", "green", "blue"];

for (let i = 0; i < colours.length; i++) {
  console.log(colours[i]);
}
// Output: "red", "green", "blue"
```

> Using `colours.length` in the condition instead of a hard-coded number means the loop will always work correctly, even if items are added or removed from the array later.

### Looping Backwards

You can run a `for` loop in reverse by starting high and decrementing:

```js
for (let i = colours.length - 1; i >= 0; i--) {
  console.log(colours[i]);
}
// Output: "blue", "green", "red"
```

---

## The `while` Loop

A `while` loop keeps running as long as a condition is `true`. Use it when you don't know in advance how many times you'll need to loop.

```js
while (condition) {
  // code to repeat
}
```

```js
let countdown = 5;

while (countdown > 0) {
  console.log(countdown);
  countdown--;
}
console.log("Blast off!");
// Output: 5, 4, 3, 2, 1, "Blast off!"
```

### ⚠️ Infinite Loops

If the condition never becomes `false`, the loop runs forever and crashes your browser. Always make sure something inside the loop moves it toward the exit condition.

```js
// ❌ Infinite loop — countdown never changes!
let countdown = 5;
while (countdown > 0) {
  console.log(countdown);
  // forgot countdown-- here
}
```

### `for` vs `while` — When to Use Each

- Use a **`for` loop** when you know how many times to repeat (e.g. looping through an array).
- Use a **`while` loop** when you repeat until something happens (e.g. waiting for user input, or running a game loop).

---

## `.forEach()` — Looping Through Arrays

`.forEach()` is an array method that runs a function once for each item. It's cleaner and more readable than a `for` loop when you just need to do something with every element.

```js
const colours = ["red", "green", "blue"];

colours.forEach((colour) => {
  console.log(colour);
});
// Output: "red", "green", "blue"
```

The function you pass in receives each item automatically — no index counter needed.

### Accessing the Index in `.forEach()`

If you do need the index, `.forEach()` passes it as a second argument:

```js
colours.forEach((colour, index) => {
  console.log(`${index}: ${colour}`);
});
// Output:
// "0: red"
// "1: green"
// "2: blue"
```

### `for` loop vs `.forEach()`

| | `for` loop | `.forEach()` |
|---|---|---|
| Works on arrays | ✅ | ✅ |
| Can loop backwards | ✅ | ❌ |
| Can use `break` to stop early | ✅ | ❌ |
| Readability for simple tasks | Verbose | Clean |

> For simply doing something with every item in an array, `.forEach()` is usually the cleaner choice. Reach for `for` when you need more control.

---

## `break` and `continue`

Two keywords that give you extra control inside a `for` or `while` loop:

### `break` — Exit the loop early

```js
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
  console.log(i);
}
// Output: 0, 1, 2, 3, 4
```

### `continue` — Skip the current iteration

```js
for (let i = 0; i < 6; i++) {
  if (i === 3) continue;
  console.log(i);
}
// Output: 0, 1, 2, 4, 5
```

---

## Quick Reference

| Loop | Best used when |
|---|---|
| `for` | You know how many iterations you need |
| `while` | You repeat until a condition changes |
| `.forEach()` | You want to do something with every array item |
| `break` | You need to exit a loop early |
| `continue` | You need to skip a specific iteration |

---

## 🏆 Challenge

1. Use a `for` loop to log every number from 1 to 10.
2. Use a `while` loop to keep halving a number (`128`) until it falls below `2`, logging the value each time.
3. Create an array of five names and use `.forEach()` to log a personalised greeting for each one.
4. **Bonus:** Loop through the numbers 1–20 and log only the even ones. (Hint: `%` from lesson 02.)

```js
// Your code here
```

---

## ✅ Up Next

Now that you can automate repetitive tasks, head to **07 — Objects** to learn how to model real-world things in your code.