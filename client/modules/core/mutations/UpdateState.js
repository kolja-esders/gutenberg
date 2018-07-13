import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation UpdateStateMutation(
    $editionUserJoinId: ID!, $state: String!
  ) {
    updateState(editionUserJoinId: $editionUserJoinId, state: $state) {
      editionUserJoin {
        id
        state
      }
    }
  }
`;



export default function updateState(environment, variables, onCompleted = null, onError = null) {
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
