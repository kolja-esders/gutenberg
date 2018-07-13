import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation CreateEditionUserJoinMutation(
    $userIdInput: ID!, $bookIdInput: ID!, $stateInput: String!, $ratingInput: Int!
  ) {
    createEditionUserJoin(userId: $userIdInput, bookId: $bookIdInput, state: $stateInput, rating: $ratingInput) {
      editionUserJoin{
        book {
          id
        }
        user {
          id
        }
        state
        rating
      }
    }
  }
`;

export default function createEditionUserJoin(environment, variables, onCompleted = null, onError = null) {
  commitMutation(
    environment,
    {
      mutation,
      variables,
      onCompleted,
      onError
    }
  );
}