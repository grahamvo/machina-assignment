// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from "axios";
import './index.css'
import App from './App.tsx'

axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");

createRoot(document.getElementById('root')!).render(
    <App />,
)
