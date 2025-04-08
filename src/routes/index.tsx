import { FC } from 'react'
import Main from '~/layouts/Main'
import Home from '~/pages/Home'

import { ReactNode } from 'react'

interface routesItem {
  path: string
  page: FC
  layout: FC<{ children: ReactNode }>
}

export const routes: routesItem[] = [
  {
    path: '/home',
    page: Home,
    layout: Main
  }
]
