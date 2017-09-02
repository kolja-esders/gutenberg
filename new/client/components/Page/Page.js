import React from 'react';
import styles from './Page.scss';

const Page = (props: {heading: String, children: Object}) =>
  <div>
    {props.children}
  </div>;

export default Page;
