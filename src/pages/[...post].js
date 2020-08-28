/** @jsx jsx */
import { jsx, Container, Heading, Link } from 'theme-ui';
import Head from 'next/head';
import { gql, request } from 'graphql-request';

import { getPostByUri, getPostPaths } from '../lib/post';
import { getSiteMetadata } from '../lib/site';

import Layout from '../components/layout';

function Post({ data, siteMetadata, params }) {
  const { post } = data;

  if (!post) {
    return (
      <Layout siteMetadata={siteMetadata}>
        <Head>
          <title>Blackpill.io</title>
          <meta name="description" content="Go now." key="description" />
        </Head>
        <Container>
          <p>This page has gone missing...</p>
          <p>Developer Information: </p>
          <code>{JSON.stringify({ data, siteMetadata, params })}</code>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout siteMetadata={siteMetadata}>
      <Head>
        <title>Blackpill.io</title>
        <meta name="description" content="Go now." key="description" />
      </Head>
      <Container>
        <Heading as="h1" sx={{ marginTop: '1rem', fontSize: 48 }}>
          {post.title}
        </Heading>
        {post.sourceUrl && post.sourceUrl.sourceurl ? (
          <p
            sx={{
              marginTop: '1rem',
              fontSize: 48,
              overflowWrap: 'break-word',
              wordWrap: 'break-word',
            }}
          >
            Original Source: <Link href={post.sourceUrl.sourceurl}>{post.sourceUrl.sourceurl}</Link>
          </p>
        ) : null}
        <div
          sx={{ fontSize: 24, img: { width: '100%' } }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </Container>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const paths = await getPostPaths();
  return {
    paths: paths.map(path => {
      return { params: { post: path.split('/').filter(ele => ele) } };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const siteMetadata = getSiteMetadata();
  const uri = siteMetadata.WPGraphQL;
  const query = gql`
    query {
      generalSettings {
        title
        description
      }
    }
  `;

  const appData = await request(uri, query);
  const post = await getPostByUri(params.post);

  return {
    props: {
      data: { ...appData, post },
      siteMetadata,
      params,
    },
  };
};

export default Post;
