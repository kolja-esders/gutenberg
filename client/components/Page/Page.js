import React from 'react';
import styles from './Page.scss';
import Header from 'components/Header/Header';

const Page = (props: {heading: String, children: Object}) =>
  <div className={styles.root}>
    <Header />
    <main className={styles.content}>
      {props.children}
    </main>
  </div>

export default Page;
