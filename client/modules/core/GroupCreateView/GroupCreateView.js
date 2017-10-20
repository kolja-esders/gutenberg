/* eslint-disable jsx-a11y/href-no-hash */
import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { withAuth } from 'modules/auth/utils';
import Page from 'components/Page/Page';
import { Button, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import styles from './GroupCreateView.scss';

const CreateGroupMutation = graphql`
  mutation GroupCreateViewMutation (
    $name: String!
    $nameUrl: String!
  ) {
    createGroup(name: $name, nameUrl: $nameUrl) {
      group {
        id
      }
    }
  }
`;

class GroupCreateView extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  }

  state = { url: '' }

  onChangeHandler = (ev, data) => {
    this.setState({ url: this.nameToUrl(data.value) });
  }

  onSubmitHandler = (ev, data) => {
    ev.preventDefault();
    console.log(ev, data);
  }

  nameToUrl = name => name.toLowerCase().replace(/ /g, '-')

  render() {
    return (
      <Page title='Gutenberg' viewer={this.props.viewer}>
        <section className={styles.container}>
          <form className={styles.createForm} onSubmit={this.onSubmitHandler}>
            <Input className={styles.groupNameInput} size='massive' onChange={this.onChangeHandler} />
            <p className={styles.preview}>gutenberg.de/group/<span>{ this.state.url }</span></p>

            <Button className={styles.submitButton} type='submit' size='massive' primary fluid>Create group</Button>
          </form>
        </section>
      </Page>
    );
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
