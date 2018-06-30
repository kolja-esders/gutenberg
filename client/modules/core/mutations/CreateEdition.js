import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation CreateEditionMutation(
    $titleInput: String!, $bookIdInput: String!
  ) {
    createEdition(title: $titleInput, bookId: $bookIdInput) {
      edition {
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

export default function createEdition(environment, variables, onCompleted = null, onError = null) {
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
