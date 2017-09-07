import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import Page from 'components/Page/Page';
import { authenticatedRoute } from 'modules/auth/utils'
import { Table, Rating } from 'semantic-ui-react';
import styles from './MyBookList.scss';

class MyBookList extends React.Component {
  render() {
    const book_entries = this.props.book_entries;
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

            {book_entries.map((e) =>
              <Table.Row id={e.id}>
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
    fragment MyBookList_book_entries on BookshelfEntry @relay(plural: true) {
      id
      book {
        title
        author
      }
      rating
    }
  `
)
