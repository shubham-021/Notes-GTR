import { Sidebar } from "@/components/sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex min-h-screen bg-zinc-950 text-white">
            <Sidebar />
            <main className="flex-1 px-12 py-16 max-w-3xl mx-auto">{children}</main>
        </div>
    );
}