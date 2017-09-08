import React from 'react'
import styles from './Header.scss'
import Link from 'react-router-dom/es/Link'
import { Button } from 'semantic-ui-react'
import { graphql, createFragmentContainer } from 'react-relay';
import { logoutViewer } from 'modules/auth/jwtUtils'

class Header extends React.Component {

  logOut() {
    logoutViewer()
  }

  render() {
    const isLoggedIn = this.props.viewer != null
    return (
      <header className={styles.root}>
          <h1 className={styles.brand_name}>
              <Link to="/" className={styles.brand_name_link}>Gutenberg</Link>
          </h1>
          <nav className={styles.nav}>
              { isLoggedIn ? (
                  <div>
                  <Button basic as={Link} to='/shared-books' className={styles.item}>All Books</Button>
                  <Button basic as={Link} to='/' className={styles.item}>My Books</Button>
                  <Button basic primary className={styles.item} onClick={() => {logoutViewer()}} >Log out</Button>
                </div>
              ) : (
                <div>
                  <Button basic as={Link} to='/login' className={styles.item}>Log in</Button>
                  <Button primary as={Link} to='/signup' className={styles.item}>Sign up</Button>
                </div>
              )}
          </nav>
      </header>
    )
  }
}

export default createFragmentContainer(
  Header,
  graphql`
    fragment Header_viewer on Viewer {
      id
      user {
        email
      }
    }
  `,
)
