/**
 * This file was generated by:
 *   relay-compiler
 *
 * @providesModule Landing_viewer.graphql
 * @generated SignedSource<<26bc78f64b2b086c33f0cdd3f5909f2d>>
 * @flow
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type Landing_viewer = {|
  +id: string;
  +user: ?{|
    +email: string;
    +username: string;
    +books: ?$ReadOnlyArray<?{| |}>;
  |};
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Landing_viewer",
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "id",
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "User",
      "name": "user",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "email",
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "args": null,
          "name": "username",
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "args": null,
          "concreteType": "UserBookJoin",
          "name": "books",
          "plural": true,
          "selections": [
            {
              "kind": "FragmentSpread",
              "name": "MyBookList_book_entries",
              "args": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer"
};

module.exports = fragment;