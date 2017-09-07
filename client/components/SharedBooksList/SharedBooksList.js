import React from 'react';
import { graphql, createFragmentContainer, QueryRenderer } from 'react-relay';
import Page from 'components/Page/Page';
import { authenticatedRoute } from 'modules/auth/utils'
import { Table, Dimmer, Loader, Rating } from 'semantic-ui-react';
import styles from './SharedBooksList.scss';
import { environment } from '../../utils/relay'

class SharedBookList extends React.Component {
  render() {
    const book_entries = this.props.book_entries;
    return (
      <div className={styles.root}>

            <QueryRenderer
              environment={environment}
              query={graphql`
                query SharedBooksList_AllUserBookJoinsQuery {
                  userBookJoins {
                    id
                    book {
                      title
                      author
                    }
                    user {
                      firstName
                    }
                    rating
                    state
                  }
                }
              `}
              render={({error, props}) => {
                if (error) {
                  return (
                    <Table singleLine className={styles.books}>
                      <Table.Body>
                        <Table.Cell width={16}>
                          <Loader active inline='centered'/>
                        </Table.Cell>
                      </Table.Body>
                    </Table>
                  )
                } else if (props) {
                  return (
                    <Table singleLine className={styles.books}>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Title</Table.HeaderCell>
                          <Table.HeaderCell>Author</Table.HeaderCell>
                          <Table.HeaderCell>User</Table.HeaderCell>
                          <Table.HeaderCell>Rating</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {props.userBookJoins.map((e) =>
                          <Table.Row key={e.id}>
                            <Table.Cell>{e.book.title}</Table.Cell>
                            <Table.Cell>{e.book.author}</Table.Cell>
                            <Table.Cell>{e.user.firstName}</Table.Cell>
                            <Table.Cell><Rating disabled rating={e.rating} maxRating={5} /></Table.Cell>
                          </Table.Row>
                        )}
                      </Table.Body>
                    </Table>
                  )
                }
                return (
                  <Table singleLine className={styles.books}>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell width={16}>
                          <Loader active inline='centered'/>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                );
              }}
            />

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
        title
        author
      }
      rating
    }
  `
)
