import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation CreateEditionMutation(
    $titleInput: String!, $authorInput: String!
  ) {
    createEdition(title: $titleInput, author: $authorInput) {
      book {
        title
        author
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
