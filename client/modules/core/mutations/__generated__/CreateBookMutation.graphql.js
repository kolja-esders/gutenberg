/**
 * @flow
 * @relayHash 1f29ee40c82eb2c20f86a7dfbb0b25ee
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type CreateBookMutationVariables = {|
  titleInput: string;
  authorInput: string;
|};

export type CreateBookMutationResponse = {|
  +createBook: ?{|
    +book: ?{|
      +title: string;
      +author: string;
    |};
  |};
|};
*/


/*
mutation CreateBookMutation(
  $titleInput: String!
  $authorInput: String!
) {
  createBook(title: $titleInput, author: $authorInput) {
    book {
      title
      author
      id
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "titleInput",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "authorInput",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateBookMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "author",
            "variableName": "authorInput",
            "type": "String!"
          },
          {
            "kind": "Variable",
            "name": "title",
            "variableName": "titleInput",
            "type": "String!"
          }
        ],
        "concreteType": "CreateBook",
        "name": "createBook",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Book",
            "name": "book",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "title",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "author",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "CreateBookMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "titleInput",
        "type": "String!",
        "defaultValue": null
      },
      {
        "kind": "LocalArgument",
        "name": "authorInput",
        "type": "String!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "CreateBookMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "author",
            "variableName": "authorInput",
            "type": "String!"
          },
          {
            "kind": "Variable",
            "name": "title",
            "variableName": "titleInput",
            "type": "String!"
          }
        ],
        "concreteType": "CreateBook",
        "name": "createBook",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Book",
            "name": "book",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "title",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "author",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "text": "mutation CreateBookMutation(\n  $titleInput: String!\n  $authorInput: String!\n) {\n  createBook(title: $titleInput, author: $authorInput) {\n    book {\n      title\n      author\n      id\n    }\n  }\n}\n"
};

module.exports = batch;
