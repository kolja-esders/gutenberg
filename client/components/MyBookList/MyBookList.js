import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import Page from 'components/Page/Page';
import { authenticatedRoute } from 'modules/auth/utils'

class MyBookList extends React.Component {
  render() {
    const books = this.props.books;
    return (
      <div>
        {books.map((book) =>
          <li key={book.id}>
            {book.name}
          </li>
        )}
      </div>
    );
  }

}

//export default MyBookList;

export default createFragmentContainer(
  MyBookList,
  graphql`
    fragment MyBookList_books on Book @relay(plural: true) {
      id
      name
      author
    }
  `,
)
