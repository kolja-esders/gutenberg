import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { Table, Rating, Button, Popup, Icon, Modal } from 'semantic-ui-react';
import styles from './MyBookList.scss';
import updateRatingMutation from '../../modules/core/mutations/UpdateRating';
import updateStateMutation from '../../modules/core/mutations/UpdateState';

class MyBookList extends React.Component {
  state = {input: {rating: 0}, errors: [], modalOpen: false};

  openModal = () => this.setState({open: true})
  closeModal = () => this.setState({open: false})

  handleRatingChange = (e, data) => {
    e.preventDefault();
    const input = this.state.input;
    const inputName = 'rating'
    input[inputName] = data.rating;
    this.setState({ ...this.state, input});


    const variables = {
      bookshelfEntryId: data.id,
      rating: data.rating
    }
    updateRatingMutation(this.props.relay.environment, variables, this.setErrors)
  }

  onCompletedReading = (data, state) => {
    this.closeModal()
    const variables = {
      bookshelfEntryId: data,
      state: state
    }
   updateStateMutation(this.props.relay.environment, variables, this.setErrors)
  }

  setErrors = (errors) => {
    this.setState({ ...this.state, errors });
  }

  render() {
    const bookshelfEntries = this.props.books.edges;
    return (
      <div className={styles.root}>
        <Table singleLine className={styles.books}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className={styles.title}>Title</Table.HeaderCell>
              <Table.HeaderCell className={styles.author}>Author</Table.HeaderCell>
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
            {bookshelfEntries.map(e => {if (e.node.state == this.props.state){ return(
              <Table.Row key={e.node.id}>
                <Table.Cell>{e.node.book.title}</Table.Cell>
                <Table.Cell>{e.node.book.author}</Table.Cell>

                {this.props.state == "to-read" &&
                  <Table.Cell>
                    <div>
                      <Popup
                        trigger={<Button icon floated="right" onClick={() => this.onCompletedReading(e.node.id, "reading")}>
                          <Icon name="book" size="large"/>
                        </Button>}
                        content="Mark as reading"
                      />
                    </div>
                  </Table.Cell>
            }

                {this.props.state =="reading" &&
                <Table.Cell>

                <Popup
                  trigger={

                      <Button icon floated="right" onClick={() => this.openModal()}>
                        <Icon name="check circle" size="large"/>
                      </Button>}
                  content="Mark as read"
                />
                <Modal size="mini" open={this.state.open} onClose={this.close}>
                  <Modal.Header>
                    How did you like {e.node.book.title}?
                  </Modal.Header>
                  <Modal.Content>
                    <div className={styles.ratingModal}>
                      <Rating
                        size="huge"
                        defaultRating={e.node.rating}
                        maxRating={5}
                        onRate={this.handleRatingChange}
                        id ={e.node.id}
                      />
                    </div>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button basic onClick={() => this.closeModal()}>
                      Close
                    </Button>
                    <Button positive icon='checkmark'
                      content='Done'
                      onClick = {() => this.onCompletedReading(e.node.id, "read")}
                    />
                  </Modal.Actions>
                </Modal>
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
  MyBookList,
  graphql`
  fragment MyBookList_books on BookshelfEntryConnection {
    edges {
      node {
        id
        book {
          title
          author
        }
        rating
        state
      }
    }
  }`
);
