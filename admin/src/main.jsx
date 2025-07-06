import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AdminContextProvider  from './Context/AdminContext.jsx'
import DoctorContextProvider from './Context/DoctorContext.jsx'
import AppContextProvider from './Context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
 <AdminContextProvider>
<DoctorContextProvider>
  <AppContextProvider>
  <App />
  </AppContextProvider>
</DoctorContextProvider>
 </AdminContextProvider>
    </BrowserRouter>
 
)
