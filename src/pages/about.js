/** @jsx jsx */
import { jsx } from 'theme-ui';
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

function about({ siteMetadata }) {
  return (
    <Layout siteMetadata={siteMetadata}>
      {quotes.map(quote => (
        <p>{quote}</p>
      ))}
    </Layout>
  );
}

export const getStaticProps = async () => {
  const siteMetadata = getSiteMetadata();
  return {
    props: {
      siteMetadata,
    },
  };
};
export default about;
