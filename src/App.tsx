import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { protectedRoutes, routes } from '~/routes'
import { selectUser } from './redux/user/userSlice'

const ProtectedRoute = ({ user }: { user: any }) => {
  if (!user.userId) {
    return <Navigate to='/' replace={true} />
  }
  return <Outlet /> //Là nó sẽ chạy vào nhưng route child được chứa bên trong nó
}

function App() {
  const user = useSelector(selectUser)


  return (
    <BrowserRouter basename='/'>
      <Routes>
        {routes.map((route) => {
          const Layout = route.layout || React.Fragment
          const Page = route.page
          const props = route.props ? route.props() : {}
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Layout>
                  <Page {...props} />
                </Layout>
              }
            />
          )
        })}
        <Route element={<ProtectedRoute user={user} />}>
          {protectedRoutes.map((route) => {
            const Layout = route.layout || React.Fragment
            const Page = route.page
            const props = route.props ? route.props() : {}
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout>
                    <Page {...props} />
                  </Layout>
                }
              />
            )
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
