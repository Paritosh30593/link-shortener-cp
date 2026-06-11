# Coding Standards

Standards for all TypeScript/React code in this project.

## TypeScript

- **Strict mode is on** — no `any`, no `@ts-ignore`, no type assertions that bypass safety.
- Use explicit return types on exported functions and Server Actions.
- Prefer `type` over `interface` for object shapes unless extension is needed.
- Use the `@/*` path alias (maps to `src/`) for all internal imports — no relative `../../` chains.

## File & Folder Conventions

| What                 | Where                                         |
| -------------------- | --------------------------------------------- |
| Pages                | `src/app/<route>/page.tsx`                    |
| Shared components    | `src/components/<domain>/<name>.tsx`          |
| shadcn/ui primitives | `src/components/ui/<name>.tsx`                |
| DB client & schema   | `src/lib/db/index.ts`, `src/lib/db/schema.ts` |
| Utility helpers      | `src/lib/utils.ts`                            |
| Middleware           | `src/proxy.ts`                                |
| Custom Hooks         | `src/hooks/<name>.tsx`                        |

- One component per file; filename matches the exported component name in kebab-case.
- Page files export a single default function named `Page` (or a descriptive name for the route).

## Components

- **Always** use shadcn/ui primitives — see [docs/ui.md](ui.md).
- **Always** use `cn()` from `@/lib/utils` for conditional or merged Tailwind classes.
- **Never** hard-code hex colors; use CSS variables defined in `src/app/globals.css`.
- **Always** `src/app/globals.css` CSS variables must be updated for both light and dark theme
- **Always** use color tone that matches the theme CSS variables
- Keep components small and focused; extract sub-components when a file exceeds ~150 lines.

## Server vs. Client Components

- Default to **Server Components** (no `"use client"` directive).
- Add `"use client"` only when the component needs browser APIs, state, or event handlers.
- **Never** call `auth()` or database queries inside Client Components — move that logic to a Server Component or Server Action.

## Data Access (Drizzle ORM)

- **Always** import `db` from `@/lib/db` — never instantiate a new database connection.
- **Never** import table helpers directly from `drizzle-orm`; go through `src/lib/db/schema.ts`.
- Schema changes require a migration:
  ```bash
  npm run db:generate   # generate migration SQL
  npm run db:migrate    # apply migration
  ```

## Server Actions & Mutations

- Place Server Actions in the relevant `page.tsx` or a co-located `actions.ts` file.
- Every mutation **must** begin with an `auth()` call and verify `userId` before touching data.
- Return structured results (e.g. `{ error: string } | { data: T }`) instead of throwing for expected failures.

## Naming

| Entity           | Convention          | Example           |
| ---------------- | ------------------- | ----------------- |
| React components | PascalCase          | `LinkCard`        |
| Functions/vars   | camelCase           | `createShortLink` |
| DB columns       | PascalCase (in SQL) | `CreatedAt`       |
| CSS variables    | kebab-case          | `--background`    |

## Control Flow

- **Always** wrap conditional and loop bodies in braces `{}`, even for single-line bodies.
- In nested `if-else` chains, place each `else if` / `else` on its own line:

  ```ts
  // ✅ correct
  if (a) {
    doA();
  }
  else if (b) {
    doB();
  }
  else {
    doC();
  }

  // ❌ wrong
  if (a) { doA(); } else if (b) { doB(); }
  ```

## Linting

- Run `npm run lint` before committing. **Zero errors required.**
- Do not disable ESLint rules inline without a comment explaining why.
