import React from 'react';
import { Link } from 'found';
import { Button, Popup, Dropdown } from 'semantic-ui-react';
import { graphql, createFragmentContainer } from 'react-relay';
import { logoutViewer } from 'modules/auth/jwtUtils';
import styles from './Header.scss';

class Header extends React.Component {

  logOut() {
    logoutViewer();
  }

  render() {
    const loggedIn = this.props.isAuthenticated;
    return (
      <header className={styles.root}>
        <h1 className={styles.brand_name}>
          <Link to='/' className={styles.brand_name_link}>Gutenberg</Link>
        </h1>
        <nav className={styles.nav}>
          { loggedIn ? (
            <div>
              <Dropdown scrolling floating text={dropdownText} className='basic' button>
                <Dropdown.Menu id={styles.dropdownMenu}>
                  <Dropdown.Header content={user.firstName} />
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to='/'>{ bookshelfText }</Dropdown.Item>
                  <Dropdown.Header content='Groups' />
                  <Dropdown.Divider />
                  { memberships.map(m =>
                    <Dropdown.Item as={Link} to={this.urlFromGroup(m.group)} key={m.group.id}>
                      { m.group.name }
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
              <Popup
                trigger={<Button as={Link} to='/create' icon='add' color='green' basic />}
                content='Create group'
                inverted
              />
              <Popup
                trigger={<Button onClick={() => { logoutViewer(); }} icon='sign out' basic />}
                content='Log out'
                inverted
              />

            </div>
          ) : (
            <div>
              <Button basic as={Link} to='/login' className={styles.item}>Log in</Button>
              <Button color='green' as={Link} to='/signup' className={styles.item}>Sign up</Button>
            </div>
          )}
        </nav>
      </header>
    );
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
);
