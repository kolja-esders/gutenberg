/**
 * This file was generated by:
 *   relay-compiler
 *
 * @providesModule SharedBooks_viewer.graphql
 * @generated SignedSource<<b932dfebfc758b078a4d554a43e3d261>>
 * @flow
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type SharedBooks_viewer = {|
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
  "name": "SharedBooks_viewer",
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "Page_viewer",
      "args": null
    },
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
              "name": "SharedBooksList_book_entries",
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