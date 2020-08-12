import React from 'react';
import Head from 'next/head';
import parse from 'html-react-parser';
import { Container } from 'theme-ui';

import { createApolloFetch } from 'apollo-fetch';

import Layout from '../components/layout';
import { getSiteMetadata } from '../lib/site';

const quotes = [
  `“The sun was shining on the sea,
Shining with all his might:
He did his very best to make
The billows smooth and bright
-- And this was odd, because it was
The middle of the night.
    `,
  `The moon was shining sulkily,
Because she thought the sun
Had got no business to be there
After the day was done
-- "It's very rude of him," she said,
"To come and spoil the fun!"
    `,
  `The sea was wet as wet could be,
The sands were dry as dry.
You could not see a cloud, because
No cloud was in the sky:
No birds were flying overhead
-- There were no birds to fly.
    `,
  `In a Wonderland they lie
Dreaming as the days go by,
Dreaming as the summer die.”
    `,
];

const IndexRoute = ({ data }) => {
  const { generalSettings } = data;
  const { title, description } = generalSettings;

  return (
    <Layout>
      <Head>
        <title>Blackpill.io</title>
        <meta name="description" content="Go now." key="description" />
        <html lang="en" key="lang" />
      </Head>
      <Container>
        {quotes.map(quote => (
          <p>{quote}</p>
        ))}
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
