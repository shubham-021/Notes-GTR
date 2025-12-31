import { notFound } from "next/navigation";
import { getDocBySlug, getAllDocs } from "@/lib/mdx";

interface DocPageProps {
    params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
    const docs = getAllDocs();
    return docs.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({ params }: DocPageProps) {
    const { slug } = await params;
    const doc = await getDocBySlug(slug);

    if (!doc) return { title: "Not Found" };

    return {
        title: `${doc.frontmatter.title} | DevNotes`,
        description: doc.frontmatter.description
    }
}

export default async function DocPage({ params }: DocPageProps) {
    const { slug } = await params;
    const doc = await getDocBySlug(slug);

    if (!doc) {
        notFound();
    }

    return (
        <article className="prose prose-invert max-w-none">
            <h1>{doc.frontmatter.title}</h1>
            <p className="lead text-zinc-400">{doc.frontmatter.description}</p>
            <hr className="my-8 border-zinc-800" />
            {doc.content}
        </article>
    )
}