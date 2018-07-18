import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { Table, Rating, Button, Popup, Icon, Modal, Input, Label, Form } from 'semantic-ui-react';

import styles from './PersonalEditionList.scss';
import FinishedReadingModal from 'components/FinishedReadingModal/FinishedReadingModal';
import updateRatingMutation from '../../modules/core/mutations/UpdateRating';
import updateStateMutation from '../../modules/core/mutations/UpdateState';


class PersonalEditionList extends React.Component {
  state = {input: {rating: 0}, errors: []};

  handleRatingChange = (e, data) => {
    e.preventDefault();
    const input = this.state.input;
    const inputName = 'rating'
    input[inputName] = data.rating;
    this.setState({ ...this.state, input});


    const variables = {
      editionUserJoinId: data.id,
      rating: data.rating
    }
    updateRatingMutation(this.props.relay.environment, variables, this.setErrors)
  }

  changeReadingState = (data, state) => {
    const variables = {
      editionUserJoinId: data,
      state: state
    }
    updateStateMutation(this.props.relay.environment, variables, this.setErrors)
  }

  setErrors = (errors) => {
    this.setState({ ...this.state, errors });
  }

  render() {
    const editionUserJoin = this.props.editions.edges;

    return (
      <div className={styles.root}>
        <Table className={styles.books} fixed singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className={styles.title} width={10}>Title</Table.HeaderCell>
              <Table.HeaderCell className={styles.author} width={4}>Author</Table.HeaderCell>
              {this.props.state == "reading" &&
                <Table.HeaderCell className={styles.finished}></Table.HeaderCell>
              }
              {this.props.state == "to-read" &&
                <Table.HeaderCell className={styles.rating}></Table.HeaderCell>
              }
              {this.props.state == "read" &&
                <Table.HeaderCell className={styles.rating}>Rating</Table.HeaderCell>
              }
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {editionUserJoin.map(e => {if (e.node.state == this.props.state){ return(

              <Table.Row key={e.node.id} className={styles.row}>
                <Table.Cell><span title={e.node.edition.title}>{e.node.edition.title}</span></Table.Cell>
                <Table.Cell><span title={e.node.book.author.name}>{e.node.book.author.name}</span></Table.Cell>

                {this.props.state == "to-read" &&
                  <Table.Cell>
                    <div>
                      <Popup
                        trigger={<Button icon floated="right" onClick={() => this.changeReadingState(e.node.id, "reading")}>
                          <Icon name="book" size="large"/>
                        </Button>}
                        content="Mark as reading"
                      />
                    </div>
                  </Table.Cell>
            }

                {this.props.state =="reading" &&
                <Table.Cell>
                  <FinishedReadingModal title={e.node.edition.title} author={e.node.book.author.name} rating={e.node.rating} id={e.node.id} userID={e.node.user.id} editions={this.props.editions}/>
                </Table.Cell>
              }

                {this.props.state == "read" &&
                  <Table.Cell>
                  <div className={styles.check}>
                   <Popup
                    trigger={<Rating defaultRating={e.node.rating} maxRating={5}
                      onRate={this.handleRatingChange}
                      id ={e.node.id}/>}
                    content="Change rating"
                    />
                  </div>
                  </Table.Cell>
                }
              </Table.Row>)}
            }
            )}

          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default createFragmentContainer(
  PersonalEditionList,
  graphql`
  fragment PersonalEditionList_editions on EditionUserJoinConnection {
    ... FinishedReadingModal_editions
    edges {
      node {
        id
        user{
          id
        }
        book {
          author {
            name
          }
        }
        edition {
          title
        }
        rating
        state
      }
    }
  }`
);
