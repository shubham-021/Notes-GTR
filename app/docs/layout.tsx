"use client";

import { Sidebar } from "@/components/sidebar";
import { TableOfContents } from "@/components/table-of-contents";
import { FontDropdown } from "@/components/font-dropdown";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "@/lib/theme-context";
import { SidebarProvider, useSidebar } from "@/lib/sidebar-context";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const SIDEBAR_WIDTH = 256;
const COLLAPSED_RAIL_WIDTH = 20;

function DocsLayoutInner({ children }: { children: React.ReactNode }) {
    const { theme } = useTheme();
    const { isCollapsed } = useSidebar();

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
            <motion.main
                initial={false}
                animate={{
                    marginLeft: isCollapsed ? COLLAPSED_RAIL_WIDTH : SIDEBAR_WIDTH,
                }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                }}
                className="flex-1 w-full min-w-0 px-5 py-16 sm:px-8 lg:px-16 lg:py-12 xl:mr-56 hidden lg:block"
            >
                <div className="max-w-3xl mx-auto">
                    {children}
                </div>
            </motion.main>
            {/* Mobile fallback — no animation, static margin */}
            <main className="flex-1 w-full min-w-0 px-5 py-16 sm:px-8 lg:hidden">
                <div className="max-w-3xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <DocsLayoutInner>{children}</DocsLayoutInner>
        </SidebarProvider>
    );
}