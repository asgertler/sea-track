import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from "react-router-dom"
import { Dashboard } from "./components/Dashboard"
import 'semantic-ui-css/semantic.min.css'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Dashboard />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
