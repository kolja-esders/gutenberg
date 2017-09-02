import React from 'react'
import { createFragmentContainer } from 'react-relay'
import MenuAnchor from 'react-mdc-web/lib/Menu/MenuAnchor'
import Menu from 'react-mdc-web/lib/Menu/Menu'
import MenuItem from 'react-mdc-web/lib/Menu/MenuItem'
import MenuDivider from 'react-mdc-web/lib/Menu/MenuDivider'
import Button from 'react-mdc-web/lib/Button/Button'
import NavLink from 'react-router-dom/es/NavLink'
import styles from './Nav.scss'
import withRouter from 'react-router-dom/es/withRouter'

function onClick(e, props) {
  e.preventDefault()
  props.handleUserDropdown(true)
}

function pushRoute(e, props, route) {
  e.preventDefault()
  props.history.push(route)
}

let UserDropDown = (props) =>
  <NavLink to="" >
    <Button
      onClick={ e => onClick(e, props)}
      className='button_open-user-dropdown'
    >
      {props.user.username || props.user.email}
    </Button>

    <MenuAnchor className={styles.currentUserDropdown} >
      <Menu
        open={props.userDropdownIsOpen}
        onClose={() => props.handleUserDropdown(false)}
      >
        <MenuItem
          className='button_account-link'
          onClick={e => pushRoute(e, props, '/account')}
        >
          Account
        </MenuItem>
        <MenuDivider/>
        <MenuItem
          className='button_signout-link'
          onClick={() => props.signoutViewer()}
        >
          Sign out
        </MenuItem>
      </Menu>
    </MenuAnchor>
  </NavLink>

UserDropDown = withRouter(UserDropDown)

export default createFragmentContainer(UserDropDown, {
    user: graphql`
       fragment UserDropDown_user on UserNode {
           username
           email
    }`
  }
)

