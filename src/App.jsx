import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { HomePage } from './pages/Home.jsx'
import { SearchPage } from './pages/Search.jsx'
import { NotFoundPage } from './pages/404.jsx'
import { JobDetail } from './pages/Detail.jsx'
function App() {
  return (
    <>
 <Header />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="*" element={<NotFoundPage />} />
       <Route path="/jobs/:jobId" element={<JobDetail />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App