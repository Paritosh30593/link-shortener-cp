import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/navigation/navbar";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Shortener CP — URL Shortener",
    description: "Turn long URLs into short, shareable links in seconds. Secure, fast, and easy to manage.",
};

export default function RootLayout({ children, }: Readonly<{
    children: React.ReactNode;
}>): React.JSX.Element {
    return (
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
            <body className="min-h-full flex flex-col">
                <ThemeProvider>
                    <ClerkProvider>
                        <Navbar />
                        {children}
                    </ClerkProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
