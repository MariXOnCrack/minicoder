# 05 — Arrays and Lists

**Goal:** Store and manage collections of data.

---

## What is an Array?

So far, each variable has held a single value. An **array** lets you store multiple values in one place, in a specific order.

```js
const fruits = ["apple", "banana", "cherry"];
console.log(fruits); // ["apple", "banana", "cherry"]
```

Arrays can hold any data type — strings, numbers, booleans, even other arrays.

```js
const mixed = ["Alice", 30, true, null];
```

---

## Accessing Items by Index

Every item in an array has an **index** — its position number. JavaScript starts counting at `0`, not `1`. This trips up almost every beginner at least once.

```js
const fruits = ["apple", "banana", "cherry"];
//                  0         1         2

console.log(fruits[0]); // "apple"
console.log(fruits[1]); // "banana"
console.log(fruits[2]); // "cherry"
console.log(fruits[3]); // undefined — nothing at index 3
```

### Checking the Length

Use `.length` to find out how many items are in an array:

```js
console.log(fruits.length); // 3
```

The last item is always at index `array.length - 1`:

```js
console.log(fruits[fruits.length - 1]); // "cherry"
```

---

## Updating Items

You can overwrite an item by targeting its index directly:

```js
const fruits = ["apple", "banana", "cherry"];
fruits[1] = "mango";
console.log(fruits); // ["apple", "mango", "cherry"]
```

> Even though `fruits` is declared with `const`, you can still change its contents. `const` just means you can't reassign the variable itself to a completely new array.

---

## Adding and Removing Items

These four methods cover the most common ways to add or remove items:

### `.push()` — Add to the end

```js
const fruits = ["apple", "banana"];
fruits.push("cherry");
console.log(fruits); // ["apple", "banana", "cherry"]
```

### `.pop()` — Remove from the end

```js
const fruits = ["apple", "banana", "cherry"];
const removed = fruits.pop();
console.log(fruits);  // ["apple", "banana"]
console.log(removed); // "cherry" — pop() returns the removed item
```

### `.unshift()` — Add to the beginning

```js
const fruits = ["banana", "cherry"];
fruits.unshift("apple");
console.log(fruits); // ["apple", "banana", "cherry"]
```

### `.shift()` — Remove from the beginning

```js
const fruits = ["apple", "banana", "cherry"];
const removed = fruits.shift();
console.log(fruits);  // ["banana", "cherry"]
console.log(removed); // "apple"
```

### Quick Visual Reference

```
["apple", "banana", "cherry"]
   ↑                      ↑
unshift/shift           push/pop
(front)                  (back)
```

---

## Other Useful Methods

### `.includes()` — Check if a value exists

```js
const fruits = ["apple", "banana", "cherry"];
console.log(fruits.includes("banana")); // true
console.log(fruits.includes("mango"));  // false
```

### `.indexOf()` — Find the index of a value

```js
console.log(fruits.indexOf("cherry")); // 2
console.log(fruits.indexOf("mango"));  // -1 (not found)
```

### `.join()` — Convert an array to a string

```js
const fruits = ["apple", "banana", "cherry"];
console.log(fruits.join(", ")); // "apple, banana, cherry"
```

---

## Quick Reference

| Method | What it does | Affects array? |
|---|---|---|
| `.push(item)` | Adds item to the end | ✅ Yes |
| `.pop()` | Removes item from the end | ✅ Yes |
| `.unshift(item)` | Adds item to the beginning | ✅ Yes |
| `.shift()` | Removes item from the beginning | ✅ Yes |
| `.includes(item)` | Returns `true`/`false` | ❌ No |
| `.indexOf(item)` | Returns index or `-1` | ❌ No |
| `.join(separator)` | Returns a string | ❌ No |
| `.length` | Returns number of items | ❌ No |

---

## 🏆 Challenge

1. Create an array called `shoppingList` with three items of your choice.
2. Add a new item to the end using `.push()`.
3. Remove the first item using `.shift()`.
4. Log the second item by its index.
5. Log the total number of items using `.length`.
6. Check if a specific item is in the list using `.includes()`.


---

## ✅ Up Next

Now that you can store collections of data, head to **06 — Loops** to learn how to automate working through them.