import { useRouter } from 'next/router'
import Head from 'next/head';
import ErrorPage from 'next/error'
import PostType from '../../src/types/post'
import PostTitle from '../../src/components/PostTitle'
import PostHeader from '../../src/components/PostHeader'
import PostBody from '../../src/components/PostBody'
import { getPostBySlug, getAllPosts } from '../../src/lib/api'
import markdownToHtml from '../../src/lib/markdownToHtml'

type Props = {
    post: PostType
    morePosts: PostType[]
    preview?: boolean
}
const Post = ({ post, morePosts, preview }: Props) => {
    const router = useRouter()
    if (!router.isFallback && !post.slug) {
        return <ErrorPage statusCode={404} />
    }
    return (
        <>
            {router.isFallback ? (
                <PostTitle>Loading…</PostTitle>
            ) : (
                <>
                    <article className="mb-32">
                        <Head>
                            <title>
                                {post.title} | 기술 블로그
                            </title>
                            <meta property="og:image" content={post.ogImage.url} />
                        </Head>
                        <PostHeader
                            title={post.title}
                            coverImage={post.coverImage}
                            date={post.date}
                            author={post.author}
                        />
                        <PostBody content={post.content} />
                    </article>
                </>)}
        </>
    )
}

export default Post

type Params = {
    params: {
        slug: string
    }
}

export async function getStaticProps({ params }: Params) {
    const post = getPostBySlug(params.slug, [
        'title',
        'date',
        'slug',
        'author',
        'content',
        'ogImage',
        'coverImage'
    ])
    const content = await markdownToHtml(post.content || '')

    return {
        props: {
            post: {
                ...post,
                content,
            },
        },
    }
}

export async function getStaticPaths() {
    const posts = getAllPosts(['slug'])

    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            }
        }),
        fallback: false
    }
}