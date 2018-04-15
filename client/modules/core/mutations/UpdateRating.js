import { commitMutation, graphql } from 'react-relay';

const mutation = graphql`
  mutation UpdateRatingMutation(
    $editionUserJoinId: ID!, $rating: Int!
  ) {
    updateRating(editionUserJoinId: $editionUserJoinId, rating: $rating) {
      editionUserJoin {
        id
        rating
      }
    }
  }
`;



export default function updateRating(environment, variables, onCompleted = null, onError = null) {
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
