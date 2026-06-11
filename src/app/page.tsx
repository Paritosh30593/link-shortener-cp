import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignInButton } from "@clerk/nextjs";
import { LinkIcon, ShieldCheckIcon, BarChart2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: LinkIcon,
    title: "Instant Short Links",
    description:
      "Turn any long URL into a clean, shareable short link in seconds. No technical knowledge required.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure & Private",
    description:
      "Your links are protected behind Clerk authentication. Only you can create, view, and delete your links.",
  },
  {
    icon: BarChart2Icon,
    title: "Manage Your Links",
    description:
      "View all your short links from a single dashboard. Easily copy, share, or remove links whenever you need.",
  },
];

export default async function Home(): Promise<React.JSX.Element> {
  const { userId } = await auth();
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col flex-1">
      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Shorten URLs. Share effortlessly.
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Shortener CP turns long, unwieldy links into short, memorable
          URLs — all secured behind your personal account.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <SignInButton>
            <Button size="lg">Get started — it&apos;s free</Button>
          </SignInButton>
          <Button variant="outline" size="lg" render={<a href="#features" />} nativeButton={false}>
            Learn more
          </Button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-muted/40 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-2xl font-semibold tracking-tight sm:text-3xl">
            Everything you need to manage your links
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <CardHeader>
                  <Icon className="mb-2 size-7 text-primary" aria-hidden="true" />
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col items-center gap-5 px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Ready to shorten your first link?
        </h2>
        <p className="max-w-md text-muted-foreground">
          Sign in to get your personal dashboard and start creating short links right away.
        </p>
        <SignInButton>
          <Button size="lg">Sign in to get started</Button>
        </SignInButton>
      </section>
    </div>
  );
}
