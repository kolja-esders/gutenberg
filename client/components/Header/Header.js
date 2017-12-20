import React from 'react';
import { Link } from 'found';
import { Image, Button, Popup, Dropdown } from 'semantic-ui-react';
import { graphql, createFragmentContainer } from 'react-relay';
import { logoutViewer } from 'modules/auth/jwtUtils';
import { isAuthenticated } from 'modules/auth/utils';
import styles from './Header.scss';
import profileImage from '../../assets/raising_hand_emoji.png';

class Header extends React.Component {

  logOut() {
    logoutViewer();
  }

  urlFromGroup(group) {
    return `/group/${group.nameUrl}`;
  }

  render() {
    const loggedIn = this.props.isAuthenticated;
    const memberships = this.props.viewer.user.groups.edges;
    const user = this.props.viewer.user;
    const bookshelfText = 'My books';
    const dropdownText = this.props.activeGroup ? this.props.activeGroup : bookshelfText;

    return (
      <header className={styles.root}>
        <h1 className={styles.brand_name}>
          <Link to='/' className={styles.brand_name_link}>Gutenberg</Link>
        </h1>
        <nav className={styles.nav}>
          { loggedIn ? (
          <div>
              <Dropdown scrolling className='basic' pointing='top right' text={dropdownText} button floating>
                <Dropdown.Menu id={styles.dropdownMenu}>
                  <Dropdown.Item as={Link} to='/'>{ bookshelfText }</Dropdown.Item>
                  <Dropdown.Header content='Groups' />
                  <Dropdown.Divider />
                  { memberships.map(m =>
                    <Dropdown.Item as={Link} to={this.urlFromGroup(m.node.group)} key={m.node.group.id}>
                      { m.node.group.name }
                    </Dropdown.Item>
                    )}
                    <Dropdown.Item className={styles.createGroupLink}>
                      <Button basic as={Link} to='/create' fluid color='green'>
                        CREATE GROUP
                      </Button>
                    </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown scrolling floating pointing='top right' icon={null} trigger={
                <span>
                  <Image src={profileImage} className={styles.profileImage} avatar />
                </span>
                }>
                <Dropdown.Menu id={styles.dropdownMenu}>
                  <Dropdown.Item id={styles.nameItem}>{ `${user.firstName} ${user.lastName}` }</Dropdown.Item>
                  <Dropdown.Item as={Link} to='/profile'>Settings</Dropdown.Item>
                  <Dropdown.Item onClick={() => { logoutViewer(); }}>Log out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <div className={styles.loggedOutView}>
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
  isAuthenticated(Header),
  graphql`
    fragment Header_viewer on Viewer {
      id
      user {
        firstName
        lastName
        email
        groups {
          edges {
            node {
              group {
                id
                name
                nameUrl
              }
            }
          }
        }
      }
    }
  `,
);
