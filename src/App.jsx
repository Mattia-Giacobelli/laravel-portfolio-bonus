
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProjectPage from './pages/ProjectPage'
import DefaultLayout from './layouts/DefaultLayout'
import { ProductsProvider } from './contexts/ProductsContext'
import ScrollToTop from './components/ScrollToTop'

function App() {


  return (
    <>

      <ProductsProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path='/' element={<HomePage />} />
              <Route path='/projects/:id' element={<ProjectPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProductsProvider>

    </>
  )
}

export default App
