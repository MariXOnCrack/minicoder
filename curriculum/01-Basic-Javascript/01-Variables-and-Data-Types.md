# 01 — Variables and Data Types

**Goal:** Understand how the computer "remembers" things.

---

## What is a Variable?

A variable is a named container that holds a value. Think of it like a labelled box — you put something inside, and you can refer to it later by its label.

```js
let username = "Alice";
console.log(username); // Alice
```

---

## `let` vs `const`

JavaScript gives you two main ways to declare a variable:

| Keyword | Can be reassigned? | When to use it |
|---|---|---|
| `let` | ✅ Yes | When the value will change over time |
| `const` | ❌ No | When the value should stay fixed |

```js
let score = 0;
score = 10; // ✅ This is fine — let allows reassignment

const maxScore = 100;
maxScore = 200; // ❌ Error! You cannot reassign a const
```

> **Rule of thumb:** Default to `const`. Only switch to `let` when you know the value needs to change.

---

## Primitive Data Types

A **primitive** is the simplest form of data. JavaScript has five primitives you'll use constantly:

### String
Text wrapped in quotes. You can use single `'`, double `"`, or backtick `` ` `` quotes.

```js
const firstName = "Alice";
const greeting = `Hello, ${firstName}!`; // Template literal
console.log(greeting); // Hello, Alice!
```

### Number
Any numeric value — whole numbers or decimals. No need for separate types.

```js
const age = 25;
const price = 9.99;
```

### Boolean
Only two possible values: `true` or `false`. Used for logic and conditions.

```js
const isLoggedIn = true;
const hasPermission = false;
```

### Null
Represents the **intentional absence** of a value. You set this on purpose.

```js
const selectedItem = null; // Nothing is selected yet
```

### Undefined
A variable that has been **declared but not assigned** a value yet. JavaScript sets this automatically.

```js
let nickname;
console.log(nickname); // undefined
```

> **`null` vs `undefined`:** `null` means "empty on purpose." `undefined` means "not set yet."

---

## Checking a Variable's Type

Use the `typeof` operator to see what type a value is:

```js
console.log(typeof "hello");   // "string"
console.log(typeof 42);        // "number"
console.log(typeof true);      // "boolean"
console.log(typeof null);      // "object" ← a known JS quirk, not a mistake on your part
console.log(typeof undefined); // "undefined"
```

---

## Quick Reference

| Type | Example | Notes |
|---|---|---|
| `String` | `"Hello"` | Text in quotes |
| `Number` | `42`, `3.14` | Integers and decimals |
| `Boolean` | `true`, `false` | Logic values only |
| `Null` | `null` | Intentionally empty |
| `Undefined` | `undefined` | Not yet assigned |

---

## 🏆 Challenge: Build a User Profile

Using what you've learned, create variables to represent a user profile. Think carefully about which keyword (`let` or `const`) fits each one.

```js
// Your code here
const name    = "Alice";
const age     = 25;
let   isOnline = true;

console.log(name);     // Alice
console.log(age);      // 25
console.log(isOnline); // true

// Later, the user goes offline:
isOnline = false;
console.log(isOnline); // false
```

**Ask yourself:**
- Why is `name` a `const` but `isOnline` a `let`?
- What type is each variable? Use `typeof` to verify your answers.

---

## ✅ Up Next

Now that you know how to store data, head to **02 — Basic Math and Operators** to learn how to work with it.