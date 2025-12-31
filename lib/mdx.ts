import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";

const contentDir = path.join(process.cwd(), "docs");

export interface Frontmatter {
    title: string;
    description: string;
}

export function getAllDocs(): { slug: string[]; frontmatter: Frontmatter }[] {
    const docs: { slug: string[]; frontmatter: Frontmatter }[] = [];

    function walkDir(dir: string, slugPrefix: string[] = []) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            if (entry.isDirectory()) {
                walkDir(path.join(dir, entry.name), [...slugPrefix, entry.name]);
            } else if (entry.name.endsWith(".mdx")) {
                const filePath = path.join(dir, entry.name);
                const fileContent = fs.readFileSync(filePath, "utf-8");
                const { data } = matter(fileContent);
                const slug = [...slugPrefix, entry.name.replace(".mdx", "")];
                docs.push({
                    slug,
                    frontmatter: data as Frontmatter,
                });
            }
        }
    }

    walkDir(contentDir);
    return docs;
}

export async function getDocBySlug(slug: string[]) {
    const filePath = path.join(contentDir, ...slug) + ".mdx";

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    const { content: mdxContent } = await compileMDX<Frontmatter>({
        source: content,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug, rehypeHighlight],
            },
        },
    });

    return {
        frontmatter: data as Frontmatter,
        content: mdxContent,
    };
}