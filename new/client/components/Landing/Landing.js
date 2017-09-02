import React from 'react';
import Page from 'components/Page/Page';
import Link from 'react-router-dom/es/Link';

const Landing = () =>
  <Page heading='Landing' >
    <p>This is the landing page</p>
    <Link to='/polls'>Polls</Link>
  </Page>;

export default Landing;
