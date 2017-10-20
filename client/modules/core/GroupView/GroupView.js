/* eslint-disable jsx-a11y/href-no-hash */
import Page from 'components/Page/Page'
import SharedBooksList from 'components/SharedBooksList/SharedBooksList'
import { withAuth } from 'modules/auth/utils'
import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

import styles from './GroupView.scss'

class GroupView extends React.Component {
  render() {
    const group = this.props.viewer.group
    return (
      <Page title='Gutenberg' viewer={this.props.viewer} activeGroup={group.name}>
        <section className = {styles.container}>
          You're a member of group { group.name }.
        </section>
      </Page>
    )
  }
}

export default createFragmentContainer(withAuth(GroupView), graphql`
    fragment GroupView_viewer on Viewer {
      ...Page_viewer
      group(nameUrl: $nameUrl) {
        name
      }
    }
  `);
