"use client";

import { Sidebar } from "@/components/sidebar";
import { TableOfContents } from "@/components/table-of-contents";
import { FontDropdown } from "@/components/font-dropdown";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "@/lib/theme-context";
import { cn } from "@/lib/utils";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();

    return (
        <div className={cn(
            "flex min-h-screen transition-colors duration-200",
            theme === "dark" ? "bg-zinc-950 text-white" : "bg-paper"
        )}>
            <Sidebar />
            <TableOfContents />
            <div className="fixed top-4 right-4 z-40 flex items-center gap-2 xl:right-60">
                <ThemeToggle />
                <FontDropdown />
            </div>
            <main className="flex-1 w-full min-w-0 px-5 py-16 sm:px-8 lg:ml-64 lg:px-16 lg:py-12 xl:mr-56">
                <div className="max-w-3xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}