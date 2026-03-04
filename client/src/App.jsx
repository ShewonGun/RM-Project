import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import SmvSelectPage from './Pages/SmvSelectPage'
import SmvPage from './Pages/SmvPage'
import CreatedSmvPage from './Pages/CreatedSmvPage'
import ObdPage from './Pages/ObdPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/smv/select" element={<SmvSelectPage />} />
      <Route path="/smv" element={<SmvPage />} />
      <Route path="/smv/list" element={<CreatedSmvPage />} />
      <Route path="/obd" element={<ObdPage />} />
    </Routes>
  )
}

export default App