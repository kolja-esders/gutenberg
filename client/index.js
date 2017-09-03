import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './root';
import 'semantic-ui-less/semantic.less'

const root = document.createElement('div');
document.body.appendChild(root);

const render = (Component) => {
  ReactDOM.render(
    <AppContainer >
      <Component />
    </AppContainer>,
    root
  );
};

render(Root);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./root', () => {
    const NextRoot = require('./root').default; // eslint-disable-line global-require
    render(NextRoot);
  });
}
