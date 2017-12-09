import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { Table, Rating } from 'semantic-ui-react';
import styles from './MyBookList.scss';

class MyBookList extends React.Component {
  render() {
    const bookshelfEntries = this.props.books.edges;
    return (
      <div className={styles.root}>
        <Table singleLine className={styles.books}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Author</Table.HeaderCell>
              <Table.HeaderCell>Rating</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>

            {bookshelfEntries.map(e =>
              <Table.Row key={e.node.id}>
                <Table.Cell>{e.node.book.title}</Table.Cell>
                <Table.Cell>{e.node.book.author}</Table.Cell>
                <Table.Cell>
                  <Rating defaultRating={e.node.rating} maxRating={5} />
                </Table.Cell>
              </Table.Row>
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
      }
    }
  }`
);
