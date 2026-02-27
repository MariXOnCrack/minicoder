# Git and GitHub — A Complete Practical Guide

**Goal:** Save your work, track every change, collaborate with others, and never lose code again.

---

## What is Git and Why Should You Care?

Picture this: you've spent three hours building a feature. You make one final change, refresh the browser, and everything breaks. You start undoing things but can't remember what you changed. Eventually you give up and start again from scratch.

**Git prevents this entirely.**

Git is a **version control system** — a tool that takes snapshots of your project over time. Every time you tell Git to save, it records the exact state of every file. You can go back to any snapshot at any moment, compare what changed between two points in time, work on experimental features without touching your working code, and collaborate with other developers without overwriting each other's work.

**GitHub** is a website that stores your Git projects in the cloud. Think of Git as the tool running on your computer, and GitHub as the online hard drive that backs it all up and makes it shareable.

- **Git** — the version control tool that runs locally on your machine.
- **GitHub** — the cloud platform that hosts your Git repositories online.

You can use Git without GitHub (just local version control), but in practice you'll almost always use both together.

---

## Installation and Setup

### 1. Install Git

Download Git from [https://git-scm.com](https://git-scm.com) and follow the installer for your operating system.

To confirm it installed correctly, open your terminal and run:

```bash
git --version
# git version 2.44.0
```

If you see a version number, you're good to go.

### 2. Tell Git Who You Are

Every snapshot Git saves is stamped with a name and email. Set these once globally on your machine:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

### 3. Set Up Your Default Editor (Optional but Recommended)

Git sometimes opens a text editor for you to write longer messages. Set VS Code as the default so you don't get stuck in Vim:

```bash
git config --global core.editor "code --wait"
```

### 4. Create a GitHub Account

Sign up for free at [https://github.com](https://github.com). Your GitHub profile will become your public portfolio — every project you push there is visible to potential employers and collaborators.

---

## Core Concepts — The Mental Model

Before touching any commands, you need to understand where your code lives at any given moment. Git thinks about your project in three distinct places:

```
┌─────────────────────┐     git add     ┌──────────────┐    git commit    ┌─────────────────┐
│  Working Directory  │ ─────────────►  │ Staging Area │ ───────────────► │   Repository    │
│                     │                 │              │                  │  (Git History)  │
│  Your actual files  │ ◄───────────────│  "Ready to   │                  │  All snapshots  │
│  as you edit them   │  git restore    │  snapshot"   │                  │  ever saved     │
└─────────────────────┘                 └──────────────┘                  └─────────────────┘
```

- **Working Directory** — the actual files on your computer as you edit them. Git watches these but doesn't automatically save them.
- **Staging Area** — a preparation zone where you consciously choose what goes into your next snapshot. You can stage some files but not others.
- **Repository** — the full history of every snapshot you've ever committed. This lives in the hidden `.git` folder inside your project.

The staging area is what confuses most beginners. It exists so you can make ten different changes and save them as separate, focused snapshots instead of one messy one.

---

## Your First Repository

### Starting from scratch

Navigate into your project folder in the terminal, then run:

```bash
cd my-project
git init
```

Git creates a hidden `.git` folder — this is where all the history and configuration is stored. You'll never need to touch it directly. Your folder is now a **repository** (or "repo" for short).

### Cloning an existing project from GitHub

If the project already exists on GitHub and you want a copy on your machine:

```bash
git clone https://github.com/username/repository-name.git
```

This downloads the entire project and its full history. It also automatically sets up the connection back to GitHub for you.

---

## The Daily Workflow

These are the four commands you'll use every single day. Once they become muscle memory, everything else builds on top of them.

### Step 1 — Check what's changed

```bash
git status
```

This is your most important command. It shows you which files have been modified since your last commit, which files are staged and ready to commit, and which files Git doesn't know about yet (untracked files). Run it constantly — it's your compass.

```
On branch main
Changes not staged for commit:
  modified:   script.js

Untracked files:
  style.css
```

### Step 2 — Stage your changes

```bash
git add filename.js        # stage one specific file
git add .                  # stage everything that changed
git add src/               # stage an entire folder
```

Staging means: *"I want these specific changes included in my next snapshot."* You don't have to stage everything — you can commit some files now and others later. This is the whole point of the staging area.

### Step 3 — Save a snapshot (commit)

```bash
git commit -m "Add input validation to the login form"
```

A **commit** is a permanent snapshot of everything you staged. The message after `-m` should describe **what you changed and why**, not how. This message is what you'll read six months later when trying to understand your own project history.

If you want to write a longer, more detailed message, just run `git commit` without the `-m` flag — Git will open your editor.

### Step 4 — Push to GitHub

```bash
git push
```

This uploads your local commits to GitHub. Until you push, your snapshots only exist on your machine. Make it a habit to push at the end of every working session.

---

## Viewing History

### See all commits

```bash
git log
```

Shows every commit ever made: the unique ID (hash), author, date, and message. Press `q` to exit.

### Compact view — one line per commit

```bash
git log --oneline
```

```
a3f92c1 Add delete button to contact cards
7b21d4e Connect contact list to localStorage
3c9e8a0 Fix counter not updating after delete
e1b2f53 Initial commit
```

### See what actually changed in a specific commit

```bash
git show a3f92c1
```

### See the difference between your current files and the last commit

```bash
git diff
```

Lines starting with `+` were added, lines starting with `-` were removed.

### See the difference between two commits

```bash
git diff e1b2f53 a3f92c1
```

---

## Working with GitHub

### Linking a local project to GitHub for the first time

1. Go to [github.com](https://github.com), click the `+` icon, and choose **New repository**.
2. Give it a name. Don't tick "Add a README" — you already have local files.
3. Copy the repository URL (it'll look like `https://github.com/username/repo-name.git`).
4. Back in your terminal, run:

```bash
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
```

`origin` is just the conventional nickname for your GitHub remote. The `-u` flag sets `origin main` as the default, so all future pushes just need `git push`.

### Checking your remotes

```bash
git remote -v
# origin  https://github.com/username/repo-name.git (fetch)
# origin  https://github.com/username/repo-name.git (push)
```

### Pulling changes from GitHub

If changes were made on GitHub directly (or by a collaborator), pull them down to your machine:

```bash
git pull
```

This fetches the remote commits and merges them into your local branch automatically.

### Fetch without merging

If you want to see what's on GitHub without applying it yet:

```bash
git fetch
git diff main origin/main    # compare your local branch vs the remote
```

---

## Branches

A **branch** is an independent line of development. The default branch is called `main`. When you want to build a new feature or fix a bug, you create a new branch — a copy of the current state that you can work on freely without affecting `main`.

```
main ────●────●────────────────────────────────●────►
              │                                │
              │    (create branch here)         │ (merge back when done)
              │                                │
feature        ●────●────●────●────●────●────●──
```

This means `main` always contains working, stable code. Your experiments live safely on their own branch.

### Create and switch to a new branch

```bash
git switch -c feature-contact-list
```

The `-c` flag creates the branch and switches to it in one step. Any commits you make here won't affect `main`.

### Check which branch you're on

```bash
git branch
```

The current branch has a `*` next to it:

```
* feature-contact-list
  main
```

### Switch between branches

```bash
git switch main
git switch feature-contact-list
```

Your files will actually change on disk when you switch — Git swaps in the correct version of every file for that branch.

### Push a new branch to GitHub

The first time you push a branch that only exists locally:

```bash
git push -u origin feature-contact-list
```

After that, `git push` is enough.

### Merge a branch back into main

When your feature is complete and tested:

```bash
git switch main
git merge feature-contact-list
```

### Delete a branch after merging

```bash
git branch -d feature-contact-list             # delete locally
git push origin --delete feature-contact-list  # delete on GitHub
```

---

## Merge Conflicts

A **merge conflict** happens when two branches changed the same part of the same file in different ways and Git doesn't know which version to keep. This is not a disaster — it just means Git needs your help deciding what the final version should look like.

When a conflict occurs, Git will tell you:

```
CONFLICT (content): Merge conflict in script.js
Automatic merge failed; fix conflicts and then commit the result.
```

Opening the conflicted file, you'll see Git has marked the problem:

```
<<<<<<< HEAD
const greeting = "Hello!";
=======
const greeting = "Hi there!";
>>>>>>> feature-branch
```

- Everything between `<<<<<<< HEAD` and `=======` is what your current branch has.
- Everything between `=======` and `>>>>>>>` is what the branch being merged has.

To resolve it, edit the file to contain exactly what you want — delete the conflict markers and keep the right code:

```js
const greeting = "Hi there!"; // decided to keep the feature branch version
```

Then stage the resolved file and commit:

```bash
git add script.js
git commit -m "Resolve merge conflict in greeting message"
```

Most code editors (including VS Code) have a visual merge conflict resolver that makes this easier — buttons let you choose "Accept Current", "Accept Incoming", or "Accept Both".

---

## Undoing Things

Git's ability to undo changes is one of its most powerful features. The right approach depends on what exactly you want to undo.

### Unstage a file (undo `git add` before committing)

```bash
git restore --staged script.js
```

The file goes back to being modified but unstaged. No changes to the actual file are lost.

### Discard all changes to a file (revert to last commit)

```bash
git restore script.js
```

> ⚠️ This permanently throws away any changes you've made to that file since the last commit. There is no undo.

### Undo the last commit — keep the changes staged

```bash
git reset --soft HEAD~1
```

The commit is undone but your changes remain staged. Useful if you committed too early or wrote the wrong message.

### Undo the last commit — keep the changes but unstage them

```bash
git reset --mixed HEAD~1
```

The commit is undone and the changes go back to being modified but unstaged. This is the default behaviour of `git reset`.

### Undo the last commit — discard everything

```bash
git reset --hard HEAD~1
```

> ⚠️ This permanently removes both the commit and all changes in it. Use with caution.

### Undo a commit that's already been pushed to GitHub

If you've already pushed the commit, **don't use reset** — it rewrites history and causes problems for anyone else using the repo. Use `revert` instead. It creates a new commit that undoes the effect of the old one, without erasing history:

```bash
git revert a3f92c1
git push
```

### Temporarily shelve uncommitted changes

If you need to switch branches but aren't ready to commit yet, `stash` saves your work-in-progress to a temporary shelf:

```bash
git stash              # shelve your changes
git switch main        # do something else
git switch feature     # come back
git stash pop          # re-apply your shelved changes
```

---

## The `.gitignore` File

Some files should **never** be committed: API keys, environment variables, large generated folders, editor settings, and OS clutter. A `.gitignore` file tells Git to completely ignore specific files or patterns.

Create a file named `.gitignore` in your project root and add patterns — one per line:

```
# Dependencies — always ignore this. It's huge and can always be reinstalled with npm install
node_modules/

# Environment variables — NEVER commit these. They contain secrets and API keys.
.env
.env.local
.env.production

# Build output — generated automatically, doesn't need to be tracked
dist/
build/

# Operating system files
.DS_Store        # macOS metadata
Thumbs.db        # Windows thumbnail cache

# Editor config
.vscode/
.idea/

# Log files
*.log
npm-debug.log*
```

Git will treat anything matching these patterns as if it doesn't exist. It won't appear in `git status` and can never be accidentally staged or committed.

> **Important:** If you accidentally committed a file before adding it to `.gitignore`, adding it to `.gitignore` alone isn't enough — Git still tracks it. You need to remove it from tracking:
> ```bash
> git rm --cached .env
> git commit -m "Remove .env from tracking"
> ```

---

## Tags — Marking Important Points in History

A **tag** is a label you attach to a specific commit, typically used to mark release versions. Unlike branch names, tags don't move — they always point to the same commit.

```bash
git tag v1.0.0                         # create a lightweight tag at the current commit
git tag -a v1.0.0 -m "First release"  # create an annotated tag with a message
git tag                                # list all tags
git push origin v1.0.0                # push one tag to GitHub
git push origin --tags                # push all tags to GitHub
```

---

## Writing Good Commit Messages

This is one of the most underrated skills in development. Your commit history is a log of your project's story — written well, it's invaluable. Written poorly, it's useless.

### The format

Keep the summary line under 72 characters. Start with a verb in the imperative mood — write it as if you're giving an instruction:

```
✅ Add contact deletion feature
✅ Fix counter not updating after delete
✅ Refactor form validation into its own function
✅ Connect contact list to localStorage
✅ Remove console.log statements before deploy

❌ stuff
❌ fix
❌ asdfghj
❌ working now
❌ changed some things
❌ updates
```

### Writing a longer message

For complex changes, add a body after a blank line:

```
Fix counter not updating after delete

The counter was only being updated when a contact was added,
not when one was deleted. The renderContacts() function now
always recalculates and updates the counter when called.
```

### Commit size matters

Each commit should do **one thing**. A good rule of thumb: if your commit message needs the word "and", it should probably be two commits.

```
❌ Add login form and fix navbar and update button styles
✅ Add login form
✅ Fix navbar collapsing on mobile
✅ Update button styles to match design system
```

### When to commit

Commit every time your code reaches a point where it works and does something new. Don't wait until the end of the day with hundreds of mixed changes in one commit — and don't commit broken code to `main`.

---

## A Complete Feature Workflow

Here's what a realistic end-to-end feature workflow looks like:

```bash
# 1. Start from an up-to-date main branch
git switch main
git pull

# 2. Create a dedicated branch for your feature
git switch -c feature-task-filters

# 3. Build your feature, committing as you go
git add .
git commit -m "Add filter buttons to task list UI"

# ... more coding ...

git add .
git commit -m "Implement filter logic for active and completed tasks"

git add .
git commit -m "Persist active filter selection to localStorage"

# 4. Push your branch to GitHub (backup + share)
git push -u origin feature-task-filters

# 5. Once the feature is done and tested, merge into main
git switch main
git pull                              # make sure main is still up to date
git merge feature-task-filters

# 6. Push the updated main to GitHub
git push

# 7. Clean up the branch — it's merged and no longer needed
git branch -d feature-task-filters
git push origin --delete feature-task-filters
```

---

## Quick Reference

| Command | What it does |
|---|---|
| `git init` | Start a new repository in the current folder |
| `git clone <url>` | Copy a remote repository to your machine |
| `git status` | See what has changed since the last commit |
| `git add .` | Stage all changes |
| `git add <file>` | Stage a specific file |
| `git commit -m "msg"` | Save a snapshot with a message |
| `git log --oneline` | View commit history compactly |
| `git diff` | See unstaged changes line by line |
| `git show <hash>` | See what changed in a specific commit |
| `git push` | Upload commits to GitHub |
| `git pull` | Download and merge remote changes |
| `git fetch` | Download remote changes without merging |
| `git remote -v` | List connected remotes |
| `git switch -c <n>` | Create and switch to a new branch |
| `git switch <n>` | Switch to an existing branch |
| `git branch` | List all local branches |
| `git merge <branch>` | Merge a branch into the current one |
| `git branch -d <n>` | Delete a merged branch |
| `git restore <file>` | Discard unstaged changes to a file |
| `git restore --staged <file>` | Unstage a file |
| `git reset --soft HEAD~1` | Undo last commit, keep changes staged |
| `git reset --hard HEAD~1` | Undo last commit and discard all changes |
| `git revert <hash>` | Create a new commit that undoes another |
| `git stash` | Temporarily shelve uncommitted changes |
| `git stash pop` | Re-apply shelved changes |
| `git tag v1.0.0` | Tag the current commit with a version label |

---

## What to Do Right Now

1. Create a GitHub account at [github.com](https://github.com) if you don't have one.
2. Open any project from the JS Basics series in your terminal.
3. Run `git init`.
4. Create a `.gitignore` file and add `node_modules/` and `.env` to it.
5. Run `git add .` then `git commit -m "Initial commit"`.
6. Create a new repository on GitHub and follow the instructions to push.

Your code is now saved, versioned, and live on your GitHub profile. That's the first step toward a public developer portfolio that shows what you can actually build.