import {Post, posts} from '#/site/content';
import { MDXContent } from '@/components/card-mdx';
import {notFound} from 'next/navigation'

import '@/styles/mdx.css'
import { siteConfig } from '@/config/site';
import { Metadata } from 'next';

interface BlogPageProps {
    params: {
        slug: string[];
    }
}

async function getPostFromParams(params: BlogPageProps['params']) {
    const slug = params?.slug?.join('/');
    const post = posts.find((post) => post.slugAsParams === slug);

    return post
}

// export async function generateMetadata({params}: BlogPageProps): Promise<Metadata> {
//     const post = await getPostFromParams(params);
//     if (!post) {
//         return {}
//     }
//     return {
//         title: post.title,
//         description: post.description,
//         authors: siteConfig.author,
//         type: "article",
//         url: post.slug
//     }   
// }

export async function generateStaticParams(): Promise<BlogPageProps['params'][]> {
    return posts.map((post) => ({
        slug: post.slugAsParams.split('/'),
    }))
}

export default async function BlogPage({ params }: BlogPageProps) {
    const post = await getPostFromParams(params);
    if (!post || !post.published) {
        notFound();
    }
    
    return (
        <article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
            <h1 className="mb-2">{post.title}</h1>
            {post.description? 
            (
                <p className="text-xl mt-0 text-muted-foreground">{post.description}</p>
            ) : null}
            <hr className='my-4' />
            <MDXContent code={post.body} />
        </article>
    )
}