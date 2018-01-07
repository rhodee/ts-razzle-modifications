# Contributing to ts-razzle-modifications

Thanks for your interest in ts-razzle-modifications. This guide will help you get started contributing.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Developing locally](#developing-locally)
  - [Commands](#commands)
  - [Updating your fork](#updating-your-fork)
- [Why wasn't my PR merged](#why-wasnt-my-pr-merged)
- [Getting help](#getting-help)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Developing locally

First, fork the repo to your GitHub account. Then clone your fork to your local
machine and make a new branch for your feature/bug/patch etc. It's a good idea to not develop directly on master so you can get updates.

```bash
git clone https://github.com/<YOUR_GITHUB_USERNAME>/ts-razzle-modifications.git
cd ts-razzle-modifications
git checkout -B <my-branch>
yarn
```

This will install all `node_modules` in all the packages and all the examples and symlink
inter-dependencies. Thus when you make local changes in any of the packages you can try them
immediately in all the examples.

### Commands

```bash
npm run info
```

### Updating your fork

When you want to pull down changes to your fork enter the following into your terminal:

```bash
git checkout master
git pull origin master
```

## Why wasn't my PR merged

All meaningful contributions to move this project forward deserve will be reviewed, but not all will make into the project. That said, here are some reasons why a PR does not make the cut:

- You did not read this document
- Your code breaks an internal application (I will be transparent about this)
- Your code conflicts with some future plans (I will be transparent about this too)
- You've said something inappropriate or have broken the Code of Conduct

## Getting help

Email [@rhodee](info@rhodee.us)
