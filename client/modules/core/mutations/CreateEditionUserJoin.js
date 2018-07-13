import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation CreateEditionUserJoinMutation(
    $userIdInput: ID!, $editionIdInput: ID!, $stateInput: String!, $ratingInput: Int
  ) {
    createEditionUserJoin(userId: $userIdInput, editionId: $editionIdInput, state: $stateInput, rating: $ratingInput) {
      editionUserJoin{
        edition {
          id
        }
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
