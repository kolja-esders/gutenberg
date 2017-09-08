import React from 'react';
import BrowserRouter from 'react-router-dom/es/BrowserRouter';
import { graphql } from 'react-relay';
import App from 'components/App/App'
import routes from './routes';
import RenderRoutes from './utils/RouteUtil';
import { RelayComponent } from './utils/relay';

const rootQuery = graphql`
  query rootViewerQuery {
    viewer {
      ...SharedBooks_viewer
      ...Page_viewer
      ...Landing_viewer
      ...GroupView_viewer
      }
  }
`;

const AppWrapper = App(RenderRoutes)

const Root = () =>
  <BrowserRouter>
    <RelayComponent
      ChildComponent={AppWrapper}
      routes={routes}
      query={rootQuery}
    />
  </BrowserRouter>;

export default Root;
