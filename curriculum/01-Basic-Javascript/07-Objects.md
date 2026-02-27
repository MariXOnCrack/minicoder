# 07 — Objects

**Goal:** Model real-world things by grouping related data and behaviour together.

---

## What is an Object?

Arrays store lists of items accessed by index. But what if you want to describe a single *thing* with multiple properties — like a user with a name, age, and email? An **object** lets you store related data together under meaningful, named keys.

```js
const user = {
  name: "Alice",
  age: 25,
  isOnline: true
};
```

Each entry is a **key-value pair**. The key is the label, the value is the data.

---

## Object Literals

The most common way to create an object is with curly braces `{}`. This is called an **object literal**.

```js
const car = {
  make: "Toyota",
  model: "Corolla",
  year: 2022,
  isElectric: false
};
```

Values can be any data type — strings, numbers, booleans, arrays, even other objects.

```js
const user = {
  name: "Alice",
  scores: [98, 87, 92],         // array as a value
  address: {                     // nested object
    city: "Paris",
    country: "France"
  }
};
```

---

## Accessing Properties

There are two ways to read a value from an object:

### Dot Notation

The most common and readable approach. Use it whenever you know the property name in advance.

```js
console.log(user.name);    // "Alice"
console.log(user.age);     // 25
```

### Bracket Notation

Access a property using a string inside square brackets. Use this when the property name is dynamic (stored in a variable) or contains special characters.

```js
console.log(user["name"]); // "Alice"

const key = "age";
console.log(user[key]);    // 25 — useful when the key is a variable
```

### Accessing Nested Values

Chain dot or bracket notation to reach nested properties:

```js
console.log(user.address.city);       // "Paris"
console.log(user.scores[0]);          // 98
```

---

## Adding and Updating Properties

You can add a new property or overwrite an existing one at any time using either notation:

```js
const user = { name: "Alice", age: 25 };

// Update an existing property
user.age = 26;

// Add a new property
user.email = "alice@example.com";

console.log(user);
// { name: "Alice", age: 26, email: "alice@example.com" }
```

> Just like arrays, you can modify an object declared with `const`. `const` only prevents you from reassigning the variable to a completely new object.

---

## Deleting Properties

Use the `delete` keyword to remove a property entirely:

```js
delete user.email;
console.log(user.email); // undefined
```

---

## Methods — Functions Inside Objects

When a function is stored as a property of an object, it's called a **method**. This is how objects can have behaviour, not just data.

```js
const user = {
  name: "Alice",
  greet: function() {
    console.log(`Hi, I'm ${user.name}!`);
  }
};

user.greet(); // "Hi, I'm Alice!"
```

You'll encounter methods constantly — `.push()`, `.pop()`, `.forEach()` from the previous lessons are all methods on the built-in `Array` object.

---

## Looping Through an Object

Use a `for...in` loop to iterate over an object's keys:

```js
const car = { make: "Toyota", model: "Corolla", year: 2022 };

for (const key in car) {
  console.log(`${key}: ${car[key]}`);
}
// Output:
// "make: Toyota"
// "model: Corolla"
// "year: 2022"
```

Notice how bracket notation is essential here — you can't use `car.key` because `key` is a variable, not a literal property name.

---

## Checking if a Property Exists

Use the `in` operator or optional chaining `?.` to safely check for properties:

```js
console.log("name" in user);    // true
console.log("email" in user);   // false

// Optional chaining — returns undefined instead of throwing an error
console.log(user.address?.city); // undefined (no crash)
```

---

## Arrays vs Objects — When to Use Each

| | Array | Object |
|---|---|---|
| Best for | Ordered lists of similar items | Describing a single thing with named properties |
| Access by | Index (`0`, `1`, `2`) | Key (`"name"`, `"age"`) |
| Example | `["red", "green", "blue"]` | `{ name: "Alice", age: 25 }` |

---

## Quick Reference

| Syntax | Purpose |
|---|---|
| `{ key: value }` | Create an object literal |
| `obj.key` | Dot notation — read/write a property |
| `obj["key"]` | Bracket notation — read/write a property |
| `obj.key = value` | Add or update a property |
| `delete obj.key` | Remove a property |
| `"key" in obj` | Check if a property exists |
| `for (const key in obj)` | Loop over all keys |

---

## 🏆 Challenge

1. Create an object called `book` with the properties `title`, `author`, `year`, and `isAvailable`.
2. Log the title using dot notation and the author using bracket notation.
3. Add a new property `genre` to the object after it's created.
4. Update `isAvailable` to `false`.
5. Write a `for...in` loop that logs every key and value in the object.
6. **Bonus:** Add a method called `getSummary` that returns a string like `"The Great Gatsby by F. Scott Fitzgerald (1925)"`.

```js
// Your code here
```

---

## ✅ Up Next

You've now covered the core building blocks of JavaScript. Head to **08 — The DOM Basics** to finally connect everything you've learned to a real webpage.