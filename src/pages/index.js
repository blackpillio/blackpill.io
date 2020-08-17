/** @jsx jsx */
import { jsx, useThemeUI, Container, Input, Heading, IconButton, Flex, Box } from 'theme-ui';
import { useState } from 'react';
import { request, gql } from 'graphql-request';
import AutoSuggest from 'react-autosuggest';

import Head from 'next/head';
import { useRouter } from 'next/router';

import _ from 'lodash';
import { SearchIcon } from '@primer/octicons-react';
import { createApolloFetch } from 'apollo-fetch';

import lightReactAutoSuggestTheme from '../styles/react-autosuggest-light.module.css';
import darkReactAutoSuggestTheme from '../styles/react-autosuggest-dark.module.css';

import Layout from '../components/layout';
import { getSiteMetadata } from '../lib/site';

const SEARCH_QUERY = gql`
  query($search: String!) {
    posts(where: { search: $search }) {
      edges {
        node {
          id
          title
          uri
        }
      }
    }
  }
`;

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

function getSuggestionValue(suggestion) {
  return suggestion;
}

function renderSuggestion(suggestion) {
  return (
    <div>
      <a>{suggestion.title}</a>
    </div>
  );
}

const IndexRoute = ({ siteMetadata, placeholder }) => {
  const { WPGraphQL } = siteMetadata;

  const { colorMode } = useThemeUI();

  const router = useRouter();
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const [, setLoading] = useState(false);

  const loadSuggestions = val => {
    setLoading(true);
    request(WPGraphQL, SEARCH_QUERY, { search: val }).then(data => {
      setLoading(false);
      setSuggestions(data.posts.edges.map(({ node }) => node));
    });
  };
  const goToPost = uri => {
    router.push(_.kebabCase(uri));
  };

  const onSuggestionsFetchRequested = ({ value: val }) => {
    loadSuggestions(val);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setValue(suggestion.title);
    router.push(suggestion.uri);
  };

  const onSuggestionsClearRequested = () => setSuggestions([]);

  const shouldRenderSuggestions = val => val.length >= 3;

  const inputProps = {
    placeholder,
    value,
    onChange: (event, { newValue }) => {
      setValue(newValue);
    },
  };

  return (
    <Layout siteMetadata={siteMetadata}>
      <Head>
        <title>Blackpill.io</title>
        <meta name="description" content="Go now." key="description" />
      </Head>
      <Container>
        <Heading sx={{ margin: '1rem' }}>Search</Heading>
        <Flex sx={{ alignItems: 'center' }}>
          <div sx={{ flex: '1 1 auto' }}>
            <AutoSuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              onSuggestionSelected={onSuggestionSelected}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              shouldRenderSuggestions={shouldRenderSuggestions}
              renderInputComponent={props => <Input {...props} />}
              inputProps={inputProps}
              theme={
                colorMode === 'default' ? lightReactAutoSuggestTheme : darkReactAutoSuggestTheme
              }
              highlightFirstSuggestion
            />
          </div>
          <Box
            p={1}
            sx={{
              display: 'flex',
            }}
          >
            <IconButton
              aria-label="Toggle dark mode"
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                goToPost(value);
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

  const placeholder = _.shuffle(categories).join(', ');

  return {
    props: {
      data,
      siteMetadata,
      placeholder,
    },
  };
};

export default IndexRoute;
