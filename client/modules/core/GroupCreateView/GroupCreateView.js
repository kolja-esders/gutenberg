/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { withAuth } from 'modules/auth/utils'
import Page from 'components/Page/Page'
import { Button, Input, Header } from 'semantic-ui-react'
import { Link } from 'found'

import styles from './GroupCreateView.scss'

class GroupCreateView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {url: ''}
  }
  
  nameToUrl = (name) => {
    return name.toLowerCase().replace(/ /g,'-')
  }

  onChangeHandler = (ev, data) => {
    this.setState({url: this.nameToUrl(data.value)})
  }

  render() {
    const group = this.props.viewer.group
    return (
      <Page title='Gutenberg' viewer={this.props.viewer}>
        <section className = {styles.container}>
          <form className={styles.createForm}>
            <Input className={styles.groupNameInput} size='massive' onChange={this.onChangeHandler}/>
            <p className={styles.preview}>gutenberg.de/group/<span>{ this.state.url }</span></p>

            <Button className={styles.submitButton} type='submit' size='massive' primary fluid>Create group</Button>
          </form>
        </section>
      </Page>
    )
  }
}

export default createFragmentContainer(
  withAuth(GroupCreateView),
  graphql`
    fragment GroupCreateView_viewer on Viewer {
      ...Page_viewer
    }
  `
);
