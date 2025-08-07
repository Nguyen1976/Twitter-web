import { FC } from 'react'
import Main from '~/layouts/Main'
import Home from '~/pages/Home'

import { ReactNode } from 'react'
import Auth from '~/pages/Auth'
import Profile from '~/pages/Profile'

interface routesItem {
  path: string
  page: FC
  layout?: FC<{ children: ReactNode }>
  props?: (...args: any[]) => Record<string, any>
}

export const routes: routesItem[] = [
  {
    path: '/home',
    page: Home,
    layout: Main
  },
  {
    path: '/',
    page: Auth
  },
  {
    path: '/i/flow/signup',
    page: Auth,
    props: showSignupPopup => ({ showSignupPopup })
  },
  {
    path: '/i/flow/signin',
    page: Auth,
    props: showSigninPopup => ({ showSigninPopup })
  },
  {
    path: '/:userId',
    page: Profile,
    layout: Main
  },
  {
    path: '/settings/profile',
    page: Home,
    layout: Main,
    props: userId => ({ userId })
  }
]
