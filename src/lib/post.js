import { gql, request } from 'graphql-request';

import { getSiteMetadata } from './site';
import { cachePostInfo } from '../utils/cache';

const POSTS_AFTER = gql`
  query GET_POSTS($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        id
        uri
      }
    }
  }
`;

const POSTS = gql`
  query GET_POSTS($first: Int) {
    posts(first: $first) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        id
        uri
        postId
        title
      }
    }
  }
`;

const POST_BY_URI = gql`
  query($uri: String!) {
    nodeByUri(uri: $uri) {
      uri
      id
      ... on Post {
        id
        slug
        title
        content
        tags {
          edges {
            node {
              name
            }
          }
        }
        categories {
          edges {
            node {
              name
            }
          }
        }
        originalUrl {
          fieldGroupName
          url
        }
        discordMeta {
          fieldGroupName
          authordescriminator
          authorid
          authorusername
          createdtimestamp
        }
      }
    }
  }
`;

const POPULAR_POSTS = gql`
  query {
    posts(where: { categoryName: "Popular" }) {
      edges {
        node {
          id
          title
          uri
          date
        }
      }
    }
  }
`;

export const getPostByUri = async uri => {
  const wpgraphql = getSiteMetadata().WPGraphQL;

  const searchUri = uri.join('/');
  const { nodeByUri } = await request(wpgraphql, POST_BY_URI, { uri: searchUri });
  return nodeByUri;
};

export const getPostPaths = async () => {
  const wpgraphql = getSiteMetadata().WPGraphQL;

  const firstData = await request(wpgraphql, POSTS, { first: 10 });

  const {
    posts: {
      nodes: firstNodes,
      pageInfo: { hasNextPage: firstHasNextPage, endCursor: firstEndCursor },
    },
  } = firstData;

  const allNodes = firstNodes;

  const fetchPosts = async endCursor => {
    const data = await request(wpgraphql, POSTS_AFTER, {
      first: 10,
      after: endCursor,
    });

    const {
      posts: {
        nodes,
        pageInfo: { hasNextPage, endCursor: nextEndCursor },
      },
    } = data;

    nodes.forEach(ele => allNodes.push(ele));

    if (hasNextPage) {
      return fetchPosts(nextEndCursor);
    }
    return allNodes;
  };

  let finalNodes = allNodes;
  if (firstHasNextPage) {
    finalNodes = await fetchPosts(firstEndCursor);
  }

  cachePostInfo(finalNodes);
  return finalNodes.map(node => node.uri);
};

export const getPopularPosts = async () => {
  const wpgraphql = getSiteMetadata().WPGraphQL;

  const { posts } = await request(wpgraphql, POPULAR_POSTS);

  return posts.edges.sort((a, b) => {
    return new Date(a.node.date) - new Date(b.node.date);
  });
};
