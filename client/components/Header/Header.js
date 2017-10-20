import { Link } from 'found'
import { logoutViewer } from 'modules/auth/jwtUtils'
import { isAuthenticated } from 'modules/auth/utils'
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay';
import { Button, Dropdown, Popup } from 'semantic-ui-react'

import styles from './Header.scss'

class Header extends React.Component {

  urlFromGroup(group) {
    return '/group/' + group.nameUrl
  }

  render() {
    const loggedIn = this.props.isAuthenticated
    const memberships = this.props.viewer.user.memberships
    const user = this.props.viewer.user
    const bookshelfText = 'Bookshelf'
    const dropdownText = this.props.activeGroup ? this.props.activeGroup : bookshelfText

    return (
      <header className={styles.root}>
        <h1 className={styles.brand_name}>
          <Link to='/' className={styles.brand_name_link}>Gutenberg</Link>
        </h1>
        <nav className={styles.nav}>
          { loggedIn ? (
            <div>
              <Dropdown text={dropdownText} className='basic' button>
                <Dropdown.Menu>
                  <Dropdown.Header content={user.firstName} />
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to='/'>{ bookshelfText }</Dropdown.Item>
                  <Dropdown.Header content='Groups' />
                  <Dropdown.Divider />
                  { memberships.map((m) =>
                    <Dropdown.Item as={Link} to={this.urlFromGroup(m.group)} key={m.group.id}>
                      { m.group.name }
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
              <Popup
                  trigger={<Button as={Link} to='/create' icon='add' color='green' basic></Button>}
                  content='Create group'
                  inverted
              />
              <Popup
                  trigger={<Button onClick={() => {logoutViewer()}} icon='sign out' basic></Button>}
                  content='Log out'
                  inverted
              />
              
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
  isAuthenticated(Header),
  graphql`
    fragment Header_viewer on Viewer {
      id
      user {
        firstName
        email
        memberships {
          group {
            id
            name
            nameUrl
          }
        }
      }
    }
  `,
)
