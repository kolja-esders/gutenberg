import React from 'react'
import BrowserRouter from 'react-router-dom/es/BrowserRouter'
import { graphql } from 'react-relay'
//import App from 'components/App/App'
import routes from './routes'

import BrowserProtocol from 'farce/lib/BrowserProtocol'
import queryMiddleware from 'farce/lib/queryMiddleware'
import createFarceRouter from 'found/lib/createFarceRouter'
import createRender from 'found/lib/createRender'
import { Resolver } from 'found-relay'

import { isAuthenticated } from 'modules/auth/utils'
import { environment } from './utils/relay'

//const AppWrapper = App(RenderRoutes)

const Router = createFarceRouter({
  historyProtocol: new BrowserProtocol(),
  historyMiddlewares: [queryMiddleware],
  routeConfig: routes,

  render: createRender({}),
});

const Root = () =>
  <Router resolver={new Resolver(environment)} />

export default isAuthenticated(Root)
