import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import Page from 'components/Page/Page';
import { Table, Rating } from 'semantic-ui-react';
import styles from './MyBookList.scss';

class MyBookList extends React.Component {
  render() {
    const bookshelf = this.props.bookshelf;
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

            {bookshelf.map((e) =>
              <Table.Row key={e.id}>
                <Table.Cell>{e.book.title}</Table.Cell>
                <Table.Cell>{e.book.author}</Table.Cell>
                <Table.Cell>
                  <Rating defaultRating={e.rating} maxRating={5} />
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
    fragment MyBookList_bookshelf on BookshelfEntry @relay(plural: true) {
      id
      book {
        title
        author
      }
      rating
    }
  `
)
