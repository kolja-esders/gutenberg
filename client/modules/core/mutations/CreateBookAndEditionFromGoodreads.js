import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation CreateBookAndEditionFromGoodreadsMutation(
    $titleInput: String!, $authorIdInput: ID!, $goodreadsWorkUidInput: String!, $goodreadsBookUidInput: String!
  ) {
    createBookAndEditionFromGoodreads(title: $titleInput, authorId: $authorIdInput, goodreadsWorkUid: $goodreadsWorkUidInput, goodreadsBookUid: $goodreadsBookUidInput) {
      edition {
        id
        title
        book {
          author {
            name
          }
        }
      }
    }
  }
`;

export default function createBookAndEditionFromGoodreads(environment, variables, onCompleted = null, onError = null) {
  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted,
      onError
    },
  );
}
