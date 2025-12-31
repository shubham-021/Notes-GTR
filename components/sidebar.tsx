"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 shrink-0 border-r border-zinc-800">
            <div className="sticky top-0 h-screen overflow-y-auto overscroll-contain p-6">
                <Link href="/docs/go/getting-started" className="mb-8 mt-8 block">
                    <span className="text-xl font-bold text-white">DevNotes</span>
                </Link>

                <nav className="space-y-6">
                    {navigation.map((section) => (
                        <div key={section.title}>
                            <h3 className="mb-3 pl-3 border-l-2 border-emerald-500 text-xs uppercase tracking-widest text-zinc-500 font-medium">
                                {section.title}
                            </h3>
                            <ul className="space-y-1">
                                {section.items.map((item) => {
                                    const href = `/docs/${item.slug}`;
                                    const isActive = pathname === href;

                                    return (
                                        <li key={item.slug}>
                                            <Link
                                                href={href}
                                                className={cn(
                                                    "block rounded-md px-3 py-2 text-lg transition-colors font-display",
                                                    isActive
                                                        ? "bg-zinc-800 text-white"
                                                        : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
                                                )}
                                            >
                                                {item.title}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>
        </aside>
    );
}