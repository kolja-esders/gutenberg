import React from 'react';
import styles from './Header.scss';
import Link from 'react-router-dom/es/Link'

const Header = () =>
    <header className={styles.root}>
        <h1 className={styles.brand_name}>
            <Link to="/" className={styles.brand_name_link}>Gutenberg</Link>
        </h1>
    </header>;

export default Header;
