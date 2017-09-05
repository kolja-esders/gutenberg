import React from 'react';
import { graphql, createFragmentContainer, QueryRenderer } from 'react-relay';
import Page from 'components/Page/Page';
import { authenticatedRoute } from 'modules/auth/utils'
import { Table } from 'semantic-ui-react';
import styles from './SharedBooksList.scss';

class SharedBookList extends React.Component {
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
                <Table.Cell>{e.book.name}</Table.Cell>
                <Table.Cell>{e.book.author}</Table.Cell>
                <Table.Cell>{e.rating}</Table.Cell>
              </Table.Row>
            )}

          </Table.Body>
        </Table>
      </div>
    );
  }

}

export default createFragmentContainer(
  SharedBookList,
  graphql`
    fragment SharedBooksList_book_entries on UserBookJoin @relay(plural: true) {
      id
      book {
        author
        name
      }
      rating
    }
  `
)
