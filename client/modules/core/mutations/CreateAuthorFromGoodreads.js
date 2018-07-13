import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation CreateAuthorFromGoodreadsMutation($nameInput: String!, $goodreadsUidInput: String!) {
    createAuthorFromGoodreads(name: $nameInput, goodreadsUid: $goodreadsUidInput) {
      author {
        id
      }
    }
  }
`;

export default function createAuthorFromGoodreads(environment, variables, onCompleted = null, onError = null) {
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
