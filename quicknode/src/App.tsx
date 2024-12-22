import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './components/Layout'
import Overview from './pages/Overview'

function App() {
  return (
    <Router>
      <Layout>
        <Overview />
      </Layout>
    </Router>
  )
}

export default App