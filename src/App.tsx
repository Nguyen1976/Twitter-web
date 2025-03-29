import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { routes } from '~/routes'

function App() {
  return (
    <BrowserRouter basename='/'>
      <Routes>
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
