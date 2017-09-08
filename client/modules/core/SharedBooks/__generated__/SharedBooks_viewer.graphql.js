/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type SharedBooks_viewer = {| |};
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
      "kind": "FragmentSpread",
      "name": "SharedBooksList_viewer",
      "args": null
    }
  ],
  "type": "Viewer"
};

module.exports = fragment;
