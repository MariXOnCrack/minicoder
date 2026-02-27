# 04 — Functions

**Goal:** Package your logic so you can reuse it without repeating yourself (DRY — Don't Repeat Yourself).

---

## What is a Function?

A function is a reusable block of code that you define once and can run as many times as you need. Instead of copying the same logic in multiple places, you write it once and call it by name.

```js
// Without a function — repetitive
console.log("Good morning, Alice!");
console.log("Good morning, Bob!");
console.log("Good morning, Carol!");

// With a function — clean and reusable
function greet(name) {
  console.log(`Good morning, ${name}!`);
}

greet("Alice");
greet("Bob");
greet("Carol");
```

---

## Function Declarations

The most straightforward way to define a function. Start with the `function` keyword, give it a name, and wrap the logic in `{}`.

```js
function sayHello() {
  console.log("Hello!");
}

sayHello(); // Hello!
```

### Parameters and Arguments

**Parameters** are the named inputs you define when creating the function. **Arguments** are the actual values you pass in when calling it.

```js
function add(a, b) {        // a and b are parameters
  console.log(a + b);
}

add(10, 5);                 // 10 and 5 are arguments
// Output: 15
```

### Return Values

Functions can send a value back to wherever they were called using `return`. Once a `return` is hit, the function stops immediately.

```js
function multiply(a, b) {
  return a * b;
}

const result = multiply(4, 5);
console.log(result); // 20
```

> **`console.log` vs `return`:** `console.log` just prints something for you to see. `return` actually sends a value out of the function so your code can use it. In real projects, you'll use `return` far more.

---

## Function Expressions

A function can also be stored in a variable. This is called a **function expression**.

```js
const square = function(n) {
  return n * n;
};

console.log(square(6)); // 36
```

The function works the same way — the key difference is *when* it's available. Function declarations are **hoisted** (available anywhere in the file), while function expressions are **not** (only available after the line they're defined on).

---

## Arrow Functions

Arrow functions are a shorter, modern syntax for writing functions. They're very common in real codebases, so it's important to recognise them.

```js
// Standard function expression
const square = function(n) {
  return n * n;
};

// Arrow function — same thing, shorter syntax
const square = (n) => {
  return n * n;
};

// Even shorter — if the body is a single return, you can drop the braces and `return`
const square = (n) => n * n;

console.log(square(6)); // 36
```

### Single Parameter Shorthand

If an arrow function has exactly one parameter, you can also drop the parentheses:

```js
const double = n => n * 2;
console.log(double(5)); // 10
```

### Comparison at a Glance

```js
// All three do the exact same thing:

function add(a, b) { return a + b; }          // Declaration
const add = function(a, b) { return a + b; };  // Expression
const add = (a, b) => a + b;                   // Arrow function
```

---

## Default Parameters

You can give a parameter a fallback value in case no argument is passed:

```js
function greet(name = "stranger") {
  return `Hello, ${name}!`;
}

console.log(greet("Alice")); // "Hello, Alice!"
console.log(greet());        // "Hello, stranger!"
```

---

## Quick Reference

| Concept | Example |
|---|---|
| Declaration | `function name() {}` |
| Expression | `const name = function() {}` |
| Arrow function | `const name = () => {}` |
| Parameters | Inputs defined in the function signature |
| Return value | `return someValue;` sends a value back |
| Default parameter | `function greet(name = "stranger") {}` |

---

## 🏆 Challenge

1. Write a function called `calculateArea` that takes a `width` and `height` and **returns** the area (`width * height`).
2. Write a function called `isEven` that takes a number and returns `true` if it's even, `false` if it's odd. (Hint: use `%` from lesson 02.)
3. Rewrite both functions as arrow functions.

```js
// Your code here
```

---

## ✅ Up Next

Now that you can package logic into functions, head to **05 — Arrays and Lists** to learn how to work with collections of data.