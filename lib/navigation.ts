export interface NavItem {
    title: string;
    slug: string;
}

export interface NavSection {
    title: string;
    items: NavItem[];
}

export const navigation: NavSection[] = [
    {
        title: "Go",
        items: [
            { title: "Getting Started", slug: "go/getting-started" },
            { title: "Variables & Constants", slug: "go/variables-and-constants" },
            { title: "Data Types & Pointers", slug: "go/data-types-and-pointers" },
            { title: "Arrays & Slices", slug: "go/arrays-and-slices" },
            { title: "Maps & Structs", slug: "go/maps-and-structs" },
            { title: "Loops & Conditionals", slug: "go/loops-and-conditionals" },
            { title: "Methods & Receivers", slug: "go/methods-and-receivers" },
            { title: "Interfaces", slug: "go/interfaces" },
            { title: "Type Switching", slug: "go/type-switching" },
            { title: "Packages & Scope", slug: "go/packages-and-scope" },
            { title: "Concurrency", slug: "go/concurrency" },
            { title: "Go Idioms", slug: "go/go-idioms" },
        ],
    },
    {
        title: "Rust",
        items: [
            { title: "Getting Started", slug: "rust/getting-started" },
            { title: "Variables & Mutability", slug: "rust/variables-and-mutability" },
            { title: "Data Types", slug: "rust/data-types" },
            { title: "Ownership", slug: "rust/ownership" },
            { title: "References & Borrowing", slug: "rust/references-and-borrowing" },
            { title: "Copy & Clone", slug: "rust/copy-and-clone" },
            { title: "Structs", slug: "rust/structs" },
            { title: "Enums & Pattern Matching", slug: "rust/enums-and-pattern-matching" },
            { title: "Option Type", slug: "rust/option-type" },
            { title: "Error Handling", slug: "rust/error-handling" },
            { title: "Collections", slug: "rust/collections" },
            { title: "Traits", slug: "rust/traits" },
            { title: "Generics", slug: "rust/generics" },
            { title: "Lifetimes", slug: "rust/lifetimes" },
            { title: "Macros", slug: "rust/macros" },
        ],
    },
    {
        title: "TypeScript",
        items: [
            { title: "Getting Started", slug: "typescript/getting-started" },
            { title: "Basic Types", slug: "typescript/basic-types" },
            { title: "Arrays & Tuples", slug: "typescript/arrays-and-tuples" },
            { title: "Enums", slug: "typescript/enums" },
            { title: "Functions & Modules", slug: "typescript/functions-and-modules" },
            { title: "Interfaces", slug: "typescript/interfaces" },
            { title: "Types vs Interfaces", slug: "typescript/types-vs-interfaces" },
            { title: "Union & Intersection Types", slug: "typescript/union-and-intersection-types" },
            { title: "Type Guards", slug: "typescript/type-guards" },
            { title: "Classes", slug: "typescript/classes" },
            { title: "Generics", slug: "typescript/generics" },
            { title: "Utility Types", slug: "typescript/utility-types" },
            { title: "Records & Maps", slug: "typescript/records-and-maps" },
            { title: "Zod & Validation", slug: "typescript/zod-and-validation" },
        ],
    },
];