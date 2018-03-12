import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { Table, Rating } from 'semantic-ui-react';
import styles from './MyBookList.scss';
import updateRatingMutation from '../../modules/core/mutations/UpdateRating';

class MyBookList extends React.Component {
  state = {input: {rating: 0}, errors: []};

  handleRatingChange = (e, data) => {
    e.preventDefault();
    const input = this.state.input;
    const inputName = 'rating'
    input[inputName] = data.rating;
    this.setState({ ...this.state, input});

    //TODO: Create Mutation to change rating
    const variables = {
      bookshelfEntryId: data.id,
      rating: data.rating
    }
    console.log(variables)


  updateRatingMutation(this.props.relay.environment, variables, this.setErrors)

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
              <Table.HeaderCell className={styles.rating}>Rating</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>

            {bookshelfEntries.map(e => {if (e.node.state == this.props.state){ return(
              <Table.Row key={e.node.id}>
                <Table.Cell>{e.node.book.title}</Table.Cell>
                <Table.Cell>{e.node.book.author}</Table.Cell>
                <Table.Cell>
                  <Rating defaultRating={e.node.rating} maxRating={5}
                    onRate={this.handleRatingChange}
                    id ={e.node.id}/>
                </Table.Cell>
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
