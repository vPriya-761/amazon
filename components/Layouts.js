import {
  createTheme,
  CssBaseline,
  Link,
  Switch,
  ThemeProvider,
} from '@material-ui/core';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import Head from 'next/head';
import React, { useContext } from 'react';
import useStyle from '../utils/styles';
import NextLink from 'next/link';
import { Store } from '../utils/Store';
import Cookies from "js-cookie"
export default function Layouts({ title, children, description }) {
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
  });
  const [state, dispatch] = useContext(Store);
  const darkMode  = state;
  const classes = useStyle();
  const darkmodeChangeHandler = () => {
    
dispatch({ type: darkMode ? 'DARKMODE_ON' : 'DARKMODE_OFF' });
const newDarkMode = !darkMode;
Cookies.set('darkMode', newDarkMode? 'No': 'OFF')
};

  return (
    <div>
      <Head>
        <title>{title ? `${title} + - Amazon` : 'Amazon'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography>Amazon</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <NextLink href="/cart" passHref>
                <Link>Cart</Link>
              </NextLink>
              <NextLink href="/login" passHref>
                <Link>Login</Link>
              </NextLink>
              <Switch
                checked={darkMode}
                onChange={darkmodeChangeHandler}
              ></Switch>
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>All Right Resolved.Amazon</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
