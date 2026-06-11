# Authentication (Clerk)

## Sole Auth Provider

**Clerk is the only permitted authentication method.** Do not introduce any other auth library, custom session handling, JWT logic, or credential-based auth. All sign-in, sign-up, session management, and user identity flows are delegated entirely to Clerk.

## Setup

- Package: `@clerk/nextjs` (v7)
- `<ClerkProvider>` must wrap the entire app in `src/app/layout.tsx`.
- Environment variables required:
  ```
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
  CLERK_SECRET_KEY=...
  ```

## Protected Routes

- `/dashboard` **must** require the user to be signed in.
- Use Clerk's `clerkMiddleware` with `createRouteMatcher` in `src/proxy.ts` to enforce protection:

```ts
const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Always run for Clerk-specific frontend API routes
    "/__clerk/(.*)",
  ],
};
```

## Homepage Redirect for Authenticated Users

If a signed-in user visits the homepage (`/`), redirect them to `/dashboard`. Handle this in the page or middleware:

```ts
// src/app/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  // render marketing / sign-in landing page
}
```

## Server-Side Identity

Always use `auth()` from `@clerk/nextjs/server` to get the current user in Server Components, Server Actions, and Route Handlers. **Never trust a user ID supplied by the client.**

```ts
import { auth } from "@clerk/nextjs/server";

const { userId } = await auth();
if (!userId) throw new Error("Unauthorized");
```

## Conditional UI Rendering

Use Clerk's `<Show>`, `<SignInButton>` and `<SignOutButton>` components to conditionally render UI:

```tsx
import { Show, SignInButton, SignOutButton } from "@clerk/nextjs";

<Show when="signed-in">
    <Link href="/user-profile">
        Profile
    </Link>
    <SignOutButton />
</Show>
<Show when="signed-out">
    <SignInButton />
</Show>
```

## Rules

- **Never** implement a custom sign-in form or session cookie — use Clerk's hosted UI or `<SignIn>` / `<SignUp>` components.
- **Never** read user identity from request headers or client-sent payloads.
- **Always** call `auth()` at the top of every Server Action and verify `userId` before any data mutation.
- **Never** expose `CLERK_SECRET_KEY` to the client; it must remain server-only.
