"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/theme-context";
import { cn } from "@/lib/utils";

interface Heading {
    id: string;
    text: string;
}

export function TableOfContents() {
    const pathname = usePathname();
    const { theme } = useTheme();
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const article = document.querySelector("article");
        if (!article) return;

        const h2Elements = article.querySelectorAll("h2[id]");
        const extractedHeadings: Heading[] = Array.from(h2Elements).map((el) => ({
            id: el.id,
            text: el.textContent || "",
        }));
        setHeadings(extractedHeadings);

        if (extractedHeadings.length > 0) {
            setActiveId(extractedHeadings[0].id);
        }
    }, [pathname]);

    useEffect(() => {
        if (headings.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-80px 0px -80% 0px", threshold: 0 }
        );

        headings.forEach((heading) => {
            const el = document.getElementById(heading.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [headings]);

    const handleClick = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    if (headings.length === 0) return null;

    return (
        <aside
            className={cn(
                "hidden xl:fixed xl:right-0 xl:top-0 xl:flex xl:h-screen xl:w-56 xl:flex-col border-l transition-colors duration-200",
                theme === "dark"
                    ? "border-zinc-800 bg-zinc-950"
                    : "border-zinc-200 bg-paper"
            )}
        >
            <div className="h-full overflow-y-auto overscroll-contain p-6 pt-20">
                <p
                    className={cn(
                        "mb-4 text-xs font-semibold uppercase tracking-widest",
                        theme === "dark" ? "text-zinc-500" : "text-zinc-500"
                    )}
                >
                    On This Page
                </p>
                <nav>
                    <ul className="space-y-2">
                        {headings.map((heading) => (
                            <li key={heading.id}>
                                <button
                                    onClick={() => handleClick(heading.id)}
                                    className={cn(
                                        "block w-full text-left text-sm transition-colors cursor-pointer",
                                        theme === "dark"
                                            ? activeId === heading.id
                                                ? "text-white"
                                                : "text-zinc-500 hover:text-zinc-300"
                                            : activeId === heading.id
                                                ? "text-(--paper-text) font-medium"
                                                : "text-(--paper-text)/60 hover:text-(--paper-text)"
                                    )}
                                >
                                    {heading.text}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
