import Landing from 'components/Landing/Landing'
import authRoutes from './auth'
import coreRoutes from './core'
import userRoutes from './users'

const routes = [
  {
    path: '/',
    component: Landing,
    //queries: 'queries'
  },
  ...authRoutes,
  ...coreRoutes,
  ...userRoutes
]

export default routes
