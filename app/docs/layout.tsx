import { Sidebar } from "@/components/sidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-zinc-950 text-white">
            <Sidebar />
            <main className="flex-1 w-full min-w-0 px-5 py-16 sm:px-8 lg:ml-64 lg:px-16 lg:py-12">
                <div className="max-w-3xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}