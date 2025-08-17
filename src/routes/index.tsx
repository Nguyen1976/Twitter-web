import { FC } from 'react'
import Main from '~/layouts/Main'
import Home from '~/pages/Home'

import { ReactNode } from 'react'
import Auth from '~/pages/Auth'
import Profile from '~/pages/Profile'
import MainSideBar from '~/layouts/Main/MainSideBar'

interface routesItem {
  path: string
  page: FC
  layout?: FC<{ children: ReactNode }>
  props?: (...args: any[]) => Record<string, any>
}

export const routes: routesItem[] = [
  {
    path: '/',
    page: Auth
  },
  {
    path: '/i/flow/signup',
    page: Auth,
    props: (showSignupPopup) => ({ showSignupPopup })
  },
  {
    path: '/i/flow/signin',
    page: Auth,
    props: (showSigninPopup) => ({ showSigninPopup })
  }
]

export const protectedRoutes: routesItem[] = [
  {
    path: '/home',
    page: Home,
    layout: MainSideBar
  },
  {
    path: '/profile/:userId',
    page: Profile,
    layout: MainSideBar
  },
  {
    path: '/settings/profile',
    page: Profile,
    layout: MainSideBar,
    props: (showEditPopup) => ({ showEditPopup })
  }
]
