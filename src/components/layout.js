/** @jsx jsx */
import { jsx, useColorMode, IconButton, Flex, Box, NavLink } from 'theme-ui';
import Link from 'next/link';

function Layout(props) {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        variant: 'layout.root',
      }}
    >
      <header
        sx={{
          width: '100%',
          justifyContent: 'space-between',
          variant: 'layout.header',
        }}
      >
        <Flex as="nav" sx={{ flexWrap: 'wrap', alignItems: 'center' }}>
          <Link href="/" passHref>
            <NavLink p={3} sx={{ flex: '0 1 auto', cursor: 'pointer' }}>
              Blackpill.io
            </NavLink>
          </Link>
          {/* <Link href="/about" passHref>
            <NavLink>About Us</NavLink>
          </Link> */}
          <NavLink href={props.siteMetadata.discordLink}>Discord</NavLink>
          <div sx={{ display: 'flex', justifyContent: 'flex-end', flex: '3 1 auto', p: 3 }}>
            <IconButton
              sx={{ cursor: 'pointer' }}
              aria-label="Toggle dark mode"
              onClick={() => {
                setColorMode(colorMode === 'default' ? 'dark' : 'default');
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="currentcolor"
              >
                <circle r={11} cx={12} cy={12} fill="none" stroke="currentcolor" strokeWidth={2} />
              </svg>
            </IconButton>
          </div>
        </Flex>
      </header>
      <main
        sx={{
          width: '100%',
          flex: '1 1 auto',
          variant: 'layout.main',
        }}
      >
        <div
          sx={{
            maxWidth: 768,
            mx: 'auto',
            px: 3,
            variant: 'layout.container',
          }}
        >
          {props.children}
          <div className="corner-ribbon bottom-right sticky green shadow">Beta</div>
        </div>
      </main>
      <footer sx={{}}>
        <Box mt={5}>
          This site is currently under development. Things may not work as expected. Things will
          change.
        </Box>
      </footer>
    </div>
  );
}

export default Layout;
