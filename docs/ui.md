# UI Standards — shadcn/ui

All UI in this project is built exclusively with **shadcn/ui** components. Do not create custom components.

## Rules

- **Never** build a custom component when a shadcn/ui equivalent exists.
- **Always** install missing components via the CLI before implementing a feature:
  ```bash
  npx shadcn@latest add <component-name>
  ```
- **Always** import components from `@/components/ui/<component-name>`.
- **Always** use the `cn()` utility from `@/lib/utils` for conditional or merged class names.
- **Never** write raw Tailwind class combinations that replicate shadcn primitives (e.g. a manual `<button>` instead of `<Button>`).

## Available Components

Installed components live in `src/components/ui/`. Check that directory before adding a new one to avoid duplicates.

## Theming & Variants

- Use the `variant` and `size` props provided by each component instead of overriding styles directly.
- Global CSS variables (colors, radius, etc.) are defined in `src/app/globals.css`. Change tokens there — never hard-code hex values in components.

## Layout & Composition

- Compose pages using shadcn/ui primitives (`Card`, `Dialog`, `Sheet`, `Table`, etc.).
- For forms, use the `Form` component with `react-hook-form` as prescribed by shadcn/ui docs — do not manage form state manually.
