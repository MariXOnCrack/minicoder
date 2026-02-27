# 02 — Basic Math and Operators

**Goal:** Do calculations and compare values.

---

## Arithmetic Operators

These work just like regular math, with a couple of extras.

| Operator | Name | Example | Result |
|---|---|---|---|
| `+` | Addition | `10 + 3` | `13` |
| `-` | Subtraction | `10 - 3` | `7` |
| `*` | Multiplication | `10 * 3` | `30` |
| `/` | Division | `10 / 3` | `3.333...` |
| `%` | Modulo | `10 % 3` | `1` |

```js
const total = 50 + 25;
console.log(total); // 75

const remainder = 10 % 3;
console.log(remainder); // 1
```

### What is Modulo `%`?

Modulo returns the **remainder** after division. It sounds niche but it's incredibly useful — for example, checking if a number is even or odd:

```js
console.log(10 % 2); // 0 → even (no remainder)
console.log(11 % 2); // 1 → odd
```

### The `+` Operator and Strings

Watch out — `+` also **concatenates** (joins) strings. This can cause surprises:

```js
console.log(5 + 5);     // 10   ← number addition
console.log("5" + 5);   // "55" ← string concatenation!
```

> If one side of `+` is a string, JavaScript will treat the whole thing as a string join. This is a common beginner bug.

---

## Shorthand Assignment Operators

Instead of writing `score = score + 10`, you can write it shorter:

| Shorthand | Equivalent to |
|---|---|
| `x += 5` | `x = x + 5` |
| `x -= 5` | `x = x - 5` |
| `x *= 2` | `x = x * 2` |
| `x /= 2` | `x = x / 2` |
| `x++` | `x = x + 1` |
| `x--` | `x = x - 1` |

```js
let score = 0;
score += 10;
console.log(score); // 10

score++;
console.log(score); // 11
```

---

## Comparison Operators

Comparison operators evaluate two values and return a **Boolean** (`true` or `false`).

| Operator | Meaning | Example | Result |
|---|---|---|---|
| `==` | Loose equality | `"5" == 5` | `true` |
| `===` | Strict equality | `"5" === 5` | `false` |
| `!=` | Loose not-equal | `"5" != 5` | `false` |
| `!==` | Strict not-equal | `"5" !== 5` | `true` |
| `>` | Greater than | `10 > 3` | `true` |
| `<` | Less than | `10 < 3` | `false` |
| `>=` | Greater than or equal | `5 >= 5` | `true` |
| `<=` | Less than or equal | `4 <= 3` | `false` |

### `==` vs `===` — Why Does It Matter?

`==` (loose equality) tries to convert both values to the same type before comparing. `===` (strict equality) does **no conversion** — both the value *and* the type must match.

```js
console.log(5 == "5");  // true  ← JS converts "5" to a number
console.log(5 === "5"); // false ← different types, no conversion
```

> **Always use `===`** unless you have a specific reason not to. Loose equality can produce hard-to-spot bugs.

---

## Logical Operators

Logical operators let you combine or invert Boolean conditions.

| Operator | Name | Description |
|---|---|---|
| `&&` | AND | `true` only if **both** sides are true |
| `\|\|` | OR | `true` if **at least one** side is true |
| `!` | NOT | Flips `true` to `false` and vice versa |

```js
const hasAccount = true;
const isVerified = false;

console.log(hasAccount && isVerified); // false — both must be true
console.log(hasAccount || isVerified); // true  — only one needs to be true
console.log(!hasAccount);              // false — flips the value
```

### A Practical Example

```js
const age = 20;
const hasID = true;

const canEnter = age >= 18 && hasID;
console.log(canEnter); // true
```

---

## Quick Reference

| Category | Operators |
|---|---|
| Arithmetic | `+` `-` `*` `/` `%` |
| Shorthand | `+=` `-=` `*=` `/=` `++` `--` |
| Comparison | `===` `!==` `>` `<` `>=` `<=` |
| Logical | `&&` `\|\|` `!` |

---

## 🏆 Challenge

1. Create two variables, `a = 15` and `b = 4`.
2. Log the result of every arithmetic operator applied to them.
3. Use `%` to check whether `a` is even or odd.
4. Write a condition using `&&` that checks if `a` is greater than 10 **and** `b` is less than 10.

```js
// Your code here
```

---

## ✅ Up Next

Now that you can calculate and compare values, head to **03 — Conditionals** to start making decisions with your code.