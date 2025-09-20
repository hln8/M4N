import { useState } from 'react'
import './App.css'
import Home from './Pages/Home'
import Cards from './components/Cards/Cards'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/footer/footer'
import NotFound from './components/404 page/not found'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
