/* eslint-disable jsx-a11y/href-no-hash */
import Page from 'components/Page/Page';
import { withAuth } from 'modules/auth/utils';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import PropTypes from 'prop-types';
import { Button, Input, Grid } from 'semantic-ui-react';

import styles from './AcceptGroupInviteView.scss';

class AcceptGroupInviteView extends React.Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  }

  onSubmitHandler = (ev) => {
    ev.preventDefault();
  }

  handleFieldChange = (e) => {
    const input = this.state.input
    const inputName = e.target.id
    input[inputName] = e.target.value
    this.setState({ input })
  }

  render() {
    let input = { firstName: 'John', lastName: 'Doe', email: 'john.doe@gmail.com' }
    return (
      <Page viewer={this.props.viewer} title="Accept invite">
        <div className={styles.container}>
          <form
            id="accept_invite"
            onSubmit={this.submitForm}
            className={styles.form}
          >
            <Grid className={styles.nameFields}>
              <Grid.Row columns={2} className={styles.row}>
                <Grid.Column className={styles.column}>
                  <Input
                    id='firstName'
                    className={styles.nameField}
                    value={input.firstName}
                    type='text'
                    size='huge'
                    fluid
                    required
                    placeholder='First name' />
                </Grid.Column>
                <Grid.Column className={styles.column}>
                  <Input
                    id='lastName'
                    className={styles.nameField}
                    value={input.lastName}
                    type='text'
                    size='huge'
                    fluid
                    required
                    placeholder='Last name' />
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Input
              id='email'
              className={`${styles.textFields} email_input`}
              onChange={this.handleFieldChange}
              value={input.email}
              disabled
              type='email'
              size='huge'
              required
              placeholder='Email' />

            <br />


            <Input
              id='password'
              className={styles.textFields}
              onChange={this.handleFieldChange.bind(this)}
              value={input.password}
              placeholder='Password'
              type='password'
              size='huge'
              minLength={8}
              required
            />

            <Button
              color='green'
              fluid
              type='submit'
              size='huge'
              className='button_submit-signup-form'
            >
              Join
            </Button>
          </form>
        </div>
      </Page>
    )
  }
}

export default createFragmentContainer(AcceptGroupInviteView, graphql`
    fragment AcceptGroupInviteView_viewer on Viewer {
      ...Page_viewer
      groupInvite(verificationToken: $verificationToken) {
        email
      }
    }
  `);
