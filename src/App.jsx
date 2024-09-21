import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Search from './pages/Search'
import PackageDetail from './pages/PackageDetail'

export default function App (){
  return(
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

const AppContent = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (navigate) => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  return (
    <div className="min-h-screen font-Poppins overflow-hidden">
      <hr className='h-4 -mt-1 bg-gradient-to-r from-[#FB8115] via-[#C72622] to-[#DA28D7]' />
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/package/:packageName" element={<PackageDetail />} />
      </Routes>
      <Footer />
      <hr className='h-3 bg-gradient-to-r from-[#FB8115] via-[#C72622] to-[#DA28D7]' />
    </div>
  )
}