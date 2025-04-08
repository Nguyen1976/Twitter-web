import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { routes } from '~/routes'

function App() {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace={true} />} />
        {routes.map((route) => {
          const Layout = route.layout
          const Page = route.page
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Layout>
                  <Page />
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
