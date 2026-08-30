# AeroVista SOT Template Guide

This guide explains the AeroVista-flavored root `SOT.json` template.

## What this is
`SOT.json` is the Source of Truth manifest for an AeroVista project.

It defines:
- what the project is
- where canonical files are allowed to live
- what files are the true masters
- what systems it connects to
- what deployment/runtime details matter
- what the scanner should validate

Drop one copy of `SOT.json` at the root of each AeroVista project you want to track.

## Recommended layout
```text
project-root/
├─ SOT.json
├─ README.md
├─ docs/
│  ├─ README.md
│  └─ ...
├─ archive/
└─ ...
```

EchoStory is a static HTML mini-shop. Its filled-in manifest is [`../../SOT.json`](../../SOT.json).

## Minimal setup
1. Copy `SOT.json` into the project root.
2. Update `project` metadata, URLs, and stack.
3. List true masters in `canon_files`.
4. Add must-have paths to `checks.required_paths_exist`.
5. Update the manifest whenever canon or deployment truth changes.
