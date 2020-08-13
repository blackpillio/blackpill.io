/** @jsx jsx */
import Head from 'next/head';
import _ from 'lodash';
import { jsx, Container, Input, Heading, IconButton, Flex, Box } from 'theme-ui';
import { SearchIcon } from '@primer/octicons-react';
import { createApolloFetch } from 'apollo-fetch';

import Layout from '../components/layout';
import { getSiteMetadata } from '../lib/site';

const categories = [
  '3-letter-agencies',
  '9-11',
  '13-bloodlines',
  'big-ag',
  'big-healthcare',
  'big-oil',
  'big-pharma',
  'big-science',
  'censorship',
  'bush',
  'jfk',
  'clinton',
  'china',
  'deep state',
  'nwo',
  'panama-papers',
  'elite',
  'rothchilds',
  '1984',
  'military-industrial-complex',
];

const IndexRoute = ({ siteMetadata }) => {
  return (
    <Layout siteMetadata={siteMetadata}>
      <Head>
        <title>Blackpill.io</title>
        <meta name="description" content="Go now." key="description" />
        <html lang="en" key="lang" />
      </Head>
      <Container>
        <Heading sx={{ margin: '1rem' }}>Search</Heading>
        <Flex>
          <Input placeholder={_.shuffle(categories).join(', ')} />
          <Box
            p={1}
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <IconButton
              aria-label="Toggle dark mode"
              sx={{ cursor: 'pointer' }}
              onClick={e => {
                console.log(e);
              }}
            >
              <SearchIcon size={24} />
            </IconButton>
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const siteMetadata = getSiteMetadata();
  const uri = siteMetadata.WPGraphQL;
  const query = `
  query IndexQuery {
    generalSettings {
      dateFormat
      description
      email
      language
      startOfWeek
      timeFormat
      timezone
      title
      url
    }
  }
  `;

  const fetch = createApolloFetch({ uri });
  const { data } = await fetch({ query });

  return {
    props: {
      data,
      siteMetadata,
    },
  };
};

export default IndexRoute;
