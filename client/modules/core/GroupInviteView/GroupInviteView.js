/* eslint-disable jsx-a11y/href-no-hash */
import Page from 'components/Page/Page';
import { withAuth } from 'modules/auth/utils';
import React from 'react';
import { createFragmentContainer, graphql, commitMutation } from 'react-relay';
import PropTypes from 'prop-types';
import { Grid, Header, Segment, Button, Input, Icon } from 'semantic-ui-react';

import styles from './GroupInviteView.scss';

const CreateInviteMutation = graphql`
  mutation GroupInviteView_CreateInvite_Mutation (
    $groupId: ID!
    $hostId: ID!
    $inviteeEmail: String!
    $inviteeFirstName: String!
    $inviteeLastName: String!
  ) {
    createGroupInvite(groupId: $groupId, hostId: $hostId, inviteeEmail: $inviteeEmail, inviteeFirstName: $inviteeFirstName, inviteeLastName: $inviteeLastName) {
      groupInvite {
        id
      }
    }
  }
`;

class GroupInviteView extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
    relay: PropTypes.object.isRequired
  }

  state = { input: {} }

  onChangeHandler = (e) => {
    const input = this.state.input;
    const inputName = e.target.id;
    input[inputName] = e.target.value;
    this.setState({ input });
    console.log(this.state.input);
  }

  onSubmitHandler = (ev) => {
    ev.preventDefault();
    const { input } = this.state;

    const variables = {
      groupId: this.props.viewer.group.id,
      hostId: this.props.viewer.user.id,
      inviteeFirstName: input.firstName,
      inviteeLastName: input.lastName,
      inviteeEmail: input.email
    };

    commitMutation(this.props.relay.environment, {
      mutation: CreateInviteMutation,
      variables,
      onCompleted: (groupResponse) => {
        console.log(groupResponse);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  }

  render() {
    const group = this.props.viewer.group;
    const { input } = this.state;

    return (
      <Page title='Gutenberg' viewer={this.props.viewer} activeGroup={group.name}>
        <section className={styles.container}>
          <Segment padded='very'>
            <Header as='h1'>New invite</Header>
            <form className={styles.createForm} onSubmit={this.onSubmitHandler}>
              <Grid className={styles.nameFields}>
                <Grid.Row columns={2} className={styles.row}>
                  <Grid.Column className={styles.column}>
                    <Input
                      id='firstName'
                      className={styles.nameField}
                      onChange={this.onChangeHandler}
                      value={input.firstName}
                      type='test'
                      size='huge'
                      fluid
                      required
                      placeholder='First name'
                    />
                  </Grid.Column>
                  <Grid.Column className={styles.column}>
                    <Input
                      id='lastName'
                      className={styles.nameField}
                      onChange={this.onChangeHandler}
                      value={input.lastName}
                      type='text'
                      size='huge'
                      fluid
                      required
                      placeholder='Last name'
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Input
                fluid
                className={styles.friendEmailInput}
                placeholder='Email address'
                id='email'
                size='huge'
                onChange={this.onChangeHandler}
              />

              <Button className={styles.submitButton} type='submit' size='huge' primary fluid><Icon name='send' />Send invite</Button>
            </form>
          </Segment>
        </section>
      </Page>
    );
  }
}

export default createFragmentContainer(withAuth(GroupInviteView), graphql`
    fragment GroupInviteView_viewer on Viewer {
      ...Page_viewer
      user {
        id
      }
      group(nameUrl: $nameUrl) {
        id
        name
      }
    }
  `);
