# Agent Instructions — Link Shortener

This file is the root instructions document for AI coding agents working in this repository.
Read the linked docs for detailed standards before making any changes.

## Project Overview

A URL link-shortener built with Next.js App Router, Clerk authentication, Drizzle ORM on SQLite, and a shadcn/ui component library. Users can create short slugs that redirect to long URLs; only authenticated users can manage their links.

## Instruction Documents

| Topic                  | File                                               |
| ---------------------- | -------------------------------------------------- |
| Authentication (Clerk) | [docs/auth.md](docs/auth.md)                       |
| UI Standards (shadcn)  | [docs/ui.md](docs/ui.md)                           |
| Coding Standards       | [docs/coding-standards.md](docs/coding-standards.md) |

## Quick Rules

- **Always** read the relevant doc section before touching a feature area.
- **Never** bypass TypeScript strict mode — no `any`, no `@ts-ignore`.
- **Never** import directly from `drizzle-orm` table helpers without going through `src/lib/db`.
- **Always** use the `cn()` utility from `@/lib/utils` for conditional class names.
- **Always** protect mutations behind Clerk's `auth()` — never trust client-supplied user IDs.
- Run `npm run lint` and confirm zero errors before considering a task complete.
