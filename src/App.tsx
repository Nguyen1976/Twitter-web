import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { routes } from '~/routes'

function App() {
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
