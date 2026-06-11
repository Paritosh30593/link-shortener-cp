import { Show, SignInButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export const Navbar = (): React.JSX.Element => {
    return (
        <nav className="bg-background border-b border-foreground/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-semibold text-foreground">
                            <Link href="/" className="hover:text-foreground/80">
                                Shortener CP
                            </Link>
                        </h1>
                        <ul>
                            <li>
                                <Link href="/dashboard" className="text-foreground/70 hover:text-foreground">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <Show when="signed-in">
                            <Button variant="ghost" render={<Link href="/user-profile" />} nativeButton={false}>
                                Profile
                            </Button>
                            <SignOutButton>
                                <Button>Sign out</Button>
                            </SignOutButton>
                        </Show>
                        <Show when="signed-out">
                            <SignInButton>
                                <Button>Sign in</Button>
                            </SignInButton>
                        </Show>
                    </div>
                </div>
            </div>
        </nav>
    );
};