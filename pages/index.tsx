import Container from '../src/components/container'
import MoreStories from '../src/components/more-stories'
import HeroPost from '../src/components/hero-post'
import Intro from '../src/components/intro'
import Layout from '../src/components/layout'
import { getAllPosts } from '../src/lib/api'
import Head from 'next/head'
import Post from '../src/types/post'

type Props = {
  allPosts: Post[]
}

const Index = ({ allPosts }: Props) => {
  // const heroPost = allPosts[0]
  // const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout>
        <Head>
          <title>0's trace</title>
        </Head>
        <Container>
          <h1>0's trace</h1>
          <div>
          {allPosts?.map((post, index) => {
            return (<div key={index}>
                <h2>{post.title}</h2>
                <h3>{post.date}</h3>
                <span><b>{post.author.name}</b></span>
                <img src={post.author.picture} />
                <button>{post.slug}</button>
                <p>{post.excerpt}</p>
              </div>)
          })}
          </div>
          {/* <Intro /> */}
          {/* {heroPost && (
            <HeroPost
              title={heroPost.title}
              // coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
        </Container>
      </Layout>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
